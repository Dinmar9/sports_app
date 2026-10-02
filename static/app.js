const state = {
  teams: [],
  selectedTeam: null,
};

const elements = {
  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('#search-input'),
  searchResults: document.querySelector('#search-results'),
  teamHeader: document.querySelector('#team-header'),
  recentResults: document.querySelector('#recent-results'),
  teamStats: document.querySelector('#team-stats'),
  halfStats: document.querySelector('#half-stats'),
  homeAway: document.querySelector('#home-away'),
  playerStats: document.querySelector('#player-stats'),
  upcomingMatches: document.querySelector('#upcoming-matches'),
};

elements.searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = elements.searchInput.value.trim();
  await fetchTeams(query || 'FC Barcelona');
});

async function init() {
  elements.searchInput.value = 'FC Barcelona';
  await fetchTeams('FC Barcelona');
}

async function fetchTeams(query) {
  const response = await fetch(`/api/teams?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  state.teams = Array.isArray(data) ? data : [];

  if (!state.teams.length) {
    elements.searchResults.innerHTML = '<p class="empty-state">No teams match your search.</p>';
    return;
  }

  renderSearchResults(state.teams);
  const selected = state.teams.find((team) => team.slug === state.selectedTeam?.slug) || state.teams[0];
  await selectTeam(selected.slug);
}

function renderSearchResults(teams) {
  elements.searchResults.innerHTML = teams
    .map(
      (team) => `
        <button class="result-item" data-slug="${team.slug}">
          <strong>${team.name}</strong>
          <span>${team.league} • ${team.country}</span>
        </button>
      `,
    )
    .join('');

  elements.searchResults.querySelectorAll('.result-item').forEach((button) => {
    button.addEventListener('click', async () => {
      await selectTeam(button.dataset.slug);
    });
  });
}

async function selectTeam(slug) {
  const response = await fetch(`/api/teams/${slug}`);
  const team = await response.json();

  if (response.ok) {
    state.selectedTeam = team;
    renderTeam(team);
  }
}

function renderTeam(team) {
  const initials = team.name
    .split(' ')
    .map((part) => part.slice(0, 2).toUpperCase())
    .join('');

  elements.teamHeader.classList.remove('hidden');
  const nextFixture = team.upcoming_matches?.[0];

  elements.teamHeader.innerHTML = `
    <div class="team-name-wrap">
      <div class="team-badge">${initials}</div>
      <div>
        <h2>${team.name}</h2>
        <p class="team-meta">${team.league} • ${team.country} • ${team.stadium}</p>
      </div>
    </div>
    <div class="team-header-meta">
      <div class="pill">Form: ${team.form} • ${team.points} pts</div>
      ${nextFixture ? `<div class="pill accent">Next: ${nextFixture.opponent} • Win ${nextFixture.odds.win}</div>` : ''}
    </div>
  `;

  elements.recentResults.innerHTML = team.recent_results
    .map(
      (match) => `
        <div class="result-row">
          <div class="result-date">${formatDate(match.date)}</div>
          <div class="result-opponent">vs ${match.opponent}</div>
          <div class="result-badge ${resultStyle(match.result)}">${match.result}</div>
        </div>
      `,
    )
    .join('');

  elements.teamStats.innerHTML = [
    ['Goals scored', `${team.stats.goals_scored.toFixed(1)} / match`],
    ['Shots on target', `${team.stats.shots_on_target.toFixed(1)}`],
    ['Goals conceded', `${team.stats.goals_conceded.toFixed(1)} / match`],
    ['Possession', `${team.stats.possession}%`],
    ['Pass accuracy', `${team.stats.pass_accuracy}%`],
    ['xG', `${team.stats.xg.toFixed(1)}`],
    ['Big chances', `${team.stats.big_chances_created}`],
    ['Season record', `${team.season_record}`],
  ]
    .map(
      ([label, value]) => `
        <div class="stat-card">
          <span class="label">${label}</span>
          <span class="value">${value}</span>
        </div>
      `,
    )
    .join('');

  elements.halfStats.innerHTML = [
    ['1H goals', team.half_time_stats.first_half_goals.toFixed(1)],
    ['2H goals', team.half_time_stats.second_half_goals.toFixed(1)],
    ['1H shots', team.half_time_stats.first_half_shots.toFixed(1)],
    ['2H shots', team.half_time_stats.second_half_shots.toFixed(1)],
  ]
    .map(
      ([label, value]) => `
        <div class="stat-card compact">
          <span class="label">${label}</span>
          <span class="value">${value}</span>
        </div>
      `,
    )
    .join('');

  elements.homeAway.innerHTML = [
    ['Home form', team.home_away.home_form],
    ['Away form', team.home_away.away_form],
    ['Home GF', team.home_away.home_goals_for.toFixed(1)],
    ['Away GF', team.home_away.away_goals_for.toFixed(1)],
    ['Home GA', team.home_away.home_goals_against.toFixed(1)],
    ['Away GA', team.home_away.away_goals_against.toFixed(1)],
  ]
    .map(
      ([label, value]) => `
        <div class="stat-card compact">
          <span class="label">${label}</span>
          <span class="value">${value}</span>
        </div>
      `,
    )
    .join('');

  elements.playerStats.innerHTML = team.player_stats
    .map(
      (player) => `
        <div class="player-card">
          <div class="player-name">
            <strong>${player.name}</strong>
            <span class="pill">${player.rating}</span>
          </div>
          <div class="player-role">${player.position}</div>
          <div class="player-metrics">
            <div><span>Goals</span><br><strong>${player.goals}</strong></div>
            <div><span>Assists</span><br><strong>${player.assists}</strong></div>
            <div><span>SOT</span><br><strong>${player.shots_on_target}</strong></div>
            <div><span>Rating</span><br><strong>${player.rating}</strong></div>
          </div>
        </div>
      `,
    )
    .join('');

  const bestValueMatch = getBestValueBet(team, state.teams);

  elements.upcomingMatches.innerHTML = team.upcoming_matches
    .map((match) => {
      const prediction = getMatchPrediction(team, match, state.teams);
      const isBestValue = bestValueMatch && bestValueMatch.opponent === match.opponent && bestValueMatch.date === match.date;
      const valueScore = calculateValueScore(prediction.winPct / 100, match.odds.win);

      return `
        <div class="match-item ${isBestValue ? 'best-value' : ''}">
          <div>
            <strong>${match.opponent}</strong>
            <div class="match-meta">${match.competition} • ${formatDate(match.date)}</div>
            <div class="match-prediction">
              Prediction: W ${prediction.winPct.toFixed(1)}% • D ${prediction.drawPct.toFixed(1)}% • L ${prediction.lossPct.toFixed(1)}%
            </div>
            ${isBestValue ? '<div class="bet-tag">Best value bet</div>' : ''}
          </div>
          <div class="odds" aria-label="Winning odds for ${team.name} vs ${match.opponent}">
            <span>Model W ${prediction.fairWinOdds.toFixed(2)}</span>
            <span>Book W ${match.odds.win}</span>
            <span>D ${match.odds.draw}</span>
            <span>L ${match.odds.lose}</span>
            <span class="value-score">EV ${valueScore.toFixed(2)}</span>
          </div>
        </div>
      `;
    })
    .join('');
}

function getBestValueBet(team, allTeams = []) {
  if (!team.upcoming_matches || !team.upcoming_matches.length) return null;

  return team.upcoming_matches.reduce((best, match) => {
    const prediction = getMatchPrediction(team, match, allTeams);
    const score = calculateValueScore(prediction.winPct / 100, match.odds.win);
    if (!best || score > best.score) {
      return { ...match, score };
    }
    return best;
  }, null);
}

function calculateValueScore(probability, odds) {
  return probability * odds - 1;
}

function getMatchPrediction(team, match, allTeams = []) {
  const opponent = allTeams.find((candidate) => candidate.name.toLowerCase() === match.opponent.toLowerCase()) || null;
  const teamStrength = computeTeamStrength(team);
  const opponentStrength = opponent ? computeTeamStrength(opponent) : teamStrength - 5;
  const diff = teamStrength - opponentStrength;

  let winPct = clamp(0.5 + diff / 180, 0.18, 0.82);
  let drawPct = clamp(0.18 - Math.abs(diff) / 700, 0.08, 0.28);
  let lossPct = 1 - winPct - drawPct;

  if (lossPct < 0.06) {
    const adjustment = 0.06 - lossPct;
    lossPct = 0.06;
    winPct -= adjustment / 2;
    drawPct -= adjustment / 2;
  }

  const total = winPct + drawPct + lossPct;
  winPct = (winPct / total) * 100;
  drawPct = (drawPct / total) * 100;
  lossPct = (lossPct / total) * 100;

  return {
    winPct,
    drawPct,
    lossPct,
    fairWinOdds: 1 / (winPct / 100),
    fairDrawOdds: 1 / (drawPct / 100),
  };
}

function computeTeamStrength(team) {
  const form = team.form || 'W-W-D-L-W';
  const formScore = form
    .split('-')
    .reduce((total, result) => total + (result === 'W' ? 1 : result === 'D' ? 0 : -1), 0);

  const recentPoints = (team.recent_results || []).reduce((total, result) => {
    if (result.result.startsWith('W')) return total + 3;
    if (result.result.startsWith('D')) return total + 1;
    return total;
  }, 0);

  const stats = team.stats || {};
  const attack = (stats.goals_scored || 0) * 18 + (stats.xg || 0) * 24 + (stats.shots_on_target || 0) * 1.4;
  const defense = 100 - (stats.goals_conceded || 0) * 18 - (stats.possession || 0) * 0.2;
  const teamValue = attack + defense + team.points * 2 + formScore * 8 + recentPoints * 1.5;

  return teamValue;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function resultStyle(resultText) {
  if (resultText.startsWith('W')) return 'badge-win';
  if (resultText.startsWith('D')) return 'badge-draw';
  return 'badge-loss';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

init();
