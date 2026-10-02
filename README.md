# Sports Betting Insight App

A lightweight football betting dashboard inspired by the structure and data categories exposed by Flashscore: team form, statistics, players, upcoming matches, and odds.

## Features

- Search by team, country, or league
- Recent match results
- Team performance metrics
- First-half and second-half comparisons
- Home/away form breakdown
- Player stats
- Upcoming match odds
- Expanded database with more clubs across Europe

## Data source notes

This is a local seeded database, not a live sportsbook feed. It mirrors the kind of data model used by public live-score websites: club records, expected goals, possession, player ratings, and betting odds for upcoming fixtures.

## Run locally

```bash
cd C:/Users/User/Desktop/sportsbetting-app
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Then open http://localhost:5000

## Files

- `data/teams.json` – local database of teams and statistics
- `data.js` – static fallback dataset used by the standalone demo page
- `app.py` – Flask API and web app
- `templates/index.html` – App UI
