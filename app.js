const state = {
  teams: TEAM_DATA,
  selectedTeam: TEAM_DATA[0],
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

function init() {
  renderSearchResults(state.teams);
  renderTeam(state.selectedTeam);
  elements.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = elements.searchInput.value.trim().toLowerCase();
    const matches = TEAM_DATA.filter((team) => {
      const haystack = `${team.name} ${team.country} ${team.league}`.toLowerCase();
      return haystack.includes(query);
    });

    if (!matches.length) {
      elements.searchResults.innerHTML = '<p class="empty-state">No matches found.</p>';
      return;
    }

    state.teams = matches;
    renderSearchResults(state.teams);
    state.selectedTeam = matches[0];
    renderTeam(state.selectedTeam);
  });
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
    button.addEventListener('click', () => {
      const team = TEAM_DATA.find((entry) => entry.slug === button.dataset.slug);
      if (team) {
        state.selectedTeam = team;
        renderTeam(team);
      }
    });
  });
}

function renderTeam(team) {
  const initials = team.name
    .split(' ')
    .map((part) => part.slice(0, 2).toUpperCase())
    .join('');

  elements.teamHeader.innerHTML = `
    <div class="team-name-wrap">
      <div class="team-badge">${initials}</div>
      <div>
        <h2>${team.name}</h2>
        <p class="team-meta">${team.league} • ${team.country} • ${team.stadium}</p>
      </div>
    </div>
    <div class="pill">Form: ${team.form} • ${team.points} pts</div>
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

  elements.upcomingMatches.innerHTML = team.upcoming_matches
    .map(
      (match) => `
        <div class="match-item">
          <div>
            <strong>${match.opponent}</strong>
            <div class="match-meta">${match.competition} • ${formatDate(match.date)}</div>
          </div>
          <div class="odds">
            <span>W ${match.odds.win}</span>
            <span>D ${match.odds.draw}</span>
            <span>L ${match.odds.lose}</span>
          </div>
        </div>
      `,
    )
    .join('');
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
