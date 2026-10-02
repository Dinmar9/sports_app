from __future__ import annotations

import json
import urllib.parse
import urllib.request
from pathlib import Path

from flask import Flask, jsonify, render_template, request

BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR / "data" / "teams.json"

TEAM_MAP = {
    "fc-barcelona": {"name": "FC Barcelona", "team_id": "83", "league_key": "esp.1", "league_name": "La Liga"},
    "real-madrid": {"name": "Real Madrid", "team_id": "86", "league_key": "esp.1", "league_name": "La Liga"},
    "manchester-city": {"name": "Manchester City", "team_id": "382", "league_key": "eng.1", "league_name": "Premier League"},
    "bayern-munich": {"name": "Bayern Munich", "team_id": "132", "league_key": "ger.1", "league_name": "Bundesliga"},
    "liverpool": {"name": "Liverpool", "team_id": "364", "league_key": "eng.1", "league_name": "Premier League"},
    "arsenal": {"name": "Arsenal", "team_id": "359", "league_key": "eng.1", "league_name": "Premier League"},
    "inter-milan": {"name": "Inter Milan", "team_id": "110", "league_key": "ita.1", "league_name": "Serie A"},
    "psg": {"name": "Paris Saint-Germain", "team_id": "160", "league_key": "fra.1", "league_name": "Ligue 1"},
    "atletico-madrid": {"name": "Atletico Madrid", "team_id": "1068", "league_key": "esp.1", "league_name": "La Liga"},
    "juventus": {"name": "Juventus", "team_id": "111", "league_key": "ita.1", "league_name": "Serie A"},
}

app = Flask(__name__)


def fetch_json(url: str):
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (compatible; sportsbetting-app/1.0; +https://example.local)"},
    )
    with urllib.request.urlopen(request, timeout=20) as response:
        return json.loads(response.read().decode("utf-8"))


def parse_recent_score(team_name: str, event):
    competitions = event.get("competitions") or []
    if not competitions:
        return None

    competitors = (competitions[0].get("competitors") or [])
    home = next((item for item in competitors if item.get("homeAway") == "home"), {})
    away = next((item for item in competitors if item.get("homeAway") == "away"), {})

    if not home or not away:
        return None

    home_team = (home.get("team") or {}).get("displayName")
    away_team = (away.get("team") or {}).get("displayName")
    home_score = home.get("score")
    away_score = away.get("score")

    if home_score is None or away_score is None:
        return None

    team_is_home = (home_team or "").lower() == team_name.lower()
    team_score = int(home_score) if team_is_home else int(away_score)
    opponent_score = int(away_score) if team_is_home else int(home_score)
    opponent_name = away_team if team_is_home else home_team

    if team_score > opponent_score:
        outcome = "W"
    elif team_score < opponent_score:
        outcome = "L"
    else:
        outcome = "D"

    return {
        "date": (event.get("date") or "")[:10],
        "opponent": opponent_name,
        "result": f"{outcome} {team_score}-{opponent_score}",
    }


def parse_upcoming_match(team_name: str, event, league_name: str):
    competitions = event.get("competitions") or []
    if not competitions:
        return None

    competitors = (competitions[0].get("competitors") or [])
    home = next((item for item in competitors if item.get("homeAway") == "home"), {})
    away = next((item for item in competitors if item.get("homeAway") == "away"), {})
    home_team = (home.get("team") or {}).get("displayName")
    away_team = (away.get("team") or {}).get("displayName")

    if not home_team or not away_team:
        return None

    team_is_home = (home_team or "").lower() == team_name.lower()
    opponent_name = away_team if team_is_home else home_team
    date = (event.get("date") or "")[:10]

    return {
        "opponent": opponent_name,
        "competition": league_name,
        "date": date,
        "odds": {"win": 1.85, "draw": 3.70, "lose": 4.20},
    }


def parse_athletes(base_players, athlete_list):
    existing = {player.get("name", "").lower(): player for player in (base_players or [])}
    parsed = []

    for athlete in athlete_list[:8]:
        full_name = athlete.get("fullName") or " ".join(
            item for item in [athlete.get("firstName"), athlete.get("lastName")] if item
        ).strip()
        if not full_name:
            continue

        base_player = existing.get(full_name.lower())
        position = "Player"
        if isinstance(athlete.get("position"), dict):
            position = athlete["position"].get("abbreviation") or athlete["position"].get("displayName") or "Player"

        parsed.append(
            {
                "name": full_name,
                "position": position,
                "goals": int(base_player.get("goals", 0)) if base_player else 0,
                "assists": int(base_player.get("assists", 0)) if base_player else 0,
                "shots_on_target": int(base_player.get("shots_on_target", 0)) if base_player else 0,
                "rating": float(base_player.get("rating", 7.5)) if base_player else 7.5,
            }
        )

    return parsed or (base_players or [])


def build_live_team_record(base_team, config):
    schedule_url = (
        f"https://site.api.espn.com/apis/site/v2/sports/soccer/{config['league_key']}/teams/{config['team_id']}/schedule"
    )
    roster_url = (
        f"https://site.api.espn.com/apis/site/v2/sports/soccer/{config['league_key']}/teams/{config['team_id']}/roster"
    )

    schedule_payload = fetch_json(schedule_url)
    roster_payload = fetch_json(roster_url)

    all_events = schedule_payload.get("events") or []
    recent = []
    upcoming = []

    for event in all_events[:12]:
        record = parse_recent_score(config["name"], event)
        if record is not None:
            recent.append(record)
            continue
        parsed_upcoming = parse_upcoming_match(config["name"], event, config["league_name"])
        if parsed_upcoming is not None:
            upcoming.append(parsed_upcoming)

    if not recent:
        recent = base_team.get("recent_results", [])
    if not upcoming:
        upcoming = base_team.get("upcoming_matches", [])

    normalized = dict(base_team)
    normalized["name"] = config["name"]
    normalized["country"] = base_team.get("country", "")
    normalized["league"] = config["league_name"]
    normalized["recent_results"] = recent[:5]
    normalized["upcoming_matches"] = upcoming[:3]
    normalized["player_stats"] = parse_athletes(base_team.get("player_stats", []), roster_payload.get("athletes") or [])
    normalized["manager"] = base_team.get("manager", normalized.get("manager", "Coach"))

    return normalized


def sync_live_data():
    if not DATA_PATH.exists():
        return

    with DATA_PATH.open("r", encoding="utf-8") as handle:
        existing_data = json.load(handle)

    current_teams = existing_data.get("teams", [])
    refreshed = []

    for team in current_teams:
        config = TEAM_MAP.get(team["slug"])
        if config is None:
            refreshed.append(team)
            continue

        try:
            refreshed.append(build_live_team_record(team, config))
        except Exception:
            refreshed.append(team)

    with DATA_PATH.open("w", encoding="utf-8") as handle:
        json.dump({"teams": refreshed}, handle, indent=2, ensure_ascii=False)
        handle.write("\n")

    return refreshed


with DATA_PATH.open("r", encoding="utf-8") as handle:
    teams = json.load(handle)["teams"]

try:
    teams = sync_live_data()
except Exception:
    pass


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/refresh")
def refresh_api():
    refreshed = sync_live_data()
    return jsonify({"status": "ok", "count": len(refreshed)})


@app.route("/api/teams")
def api_teams():
    query = (request.args.get("q") or "").strip().lower()
    if not query:
        return jsonify(teams)

    matches = [
        team
        for team in teams
        if query in team["name"].lower()
        or query in team["country"].lower()
        or query in team["league"].lower()
    ]
    return jsonify(matches)


@app.route("/api/teams/<slug>")
def api_team(slug: str):
    team = next((item for item in teams if item["slug"] == slug), None)
    if team is None:
        return jsonify({"error": "Team not found"}), 404
    return jsonify(team)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
