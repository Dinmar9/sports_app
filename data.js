const TEAM_DATA = [
  {
    slug: 'fc-barcelona',
    name: 'FC Barcelona',
    country: 'Spain',
    league: 'La Liga',
    stadium: 'Camp Nou',
    manager: 'Hansi Flick',
    form: 'W-W-D-L-W',
    points: 31,
    season_record: '9-2-2',
    stats: {
      shots_on_target: 18.4,
      goals_scored: 2.7,
      goals_conceded: 0.9,
      possession: 61,
      pass_accuracy: 87,
      xg: 2.1,
      big_chances_created: 15
    },
    half_time_stats: {
      first_half_goals: 1.3,
      second_half_goals: 1.4,
      first_half_shots: 7.8,
      second_half_shots: 8.6
    },
    home_away: {
      home_form: 'W-W-D-W-W',
      away_form: 'W-D-L-W-W',
      home_goals_for: 2.9,
      home_goals_against: 0.7,
      away_goals_for: 2.4,
      away_goals_against: 1.1
    },
    recent_results: [
      { date: '2026-09-19', opponent: 'Sevilla', result: 'W 3-1' },
      { date: '2026-09-16', opponent: 'Racing Santander', result: 'W 7-2' },
      { date: '2026-09-13', opponent: 'Levante', result: 'W 4-2' },
      { date: '2026-09-06', opponent: 'Valencia', result: 'W 5-0' },
      { date: '2026-08-31', opponent: 'Rayo Vallecano', result: 'W 5-2' }
    ],
    player_stats: [
      { name: 'Robert Lewandowski', position: 'ST', goals: 19, assists: 7, shots_on_target: 78, rating: 8.7 },
      { name: 'Pedri', position: 'CM', goals: 6, assists: 11, shots_on_target: 24, rating: 8.4 },
      { name: 'Lamine Yamal', position: 'RW', goals: 9, assists: 13, shots_on_target: 53, rating: 8.9 },
      { name: 'Raphinha', position: 'RW', goals: 12, assists: 9, shots_on_target: 47, rating: 8.4 }
    ],
    upcoming_matches: [
      { opponent: 'Getafe', competition: 'La Liga', date: '2026-10-10', odds: { win: 1.40, draw: 4.80, lose: 7.50 } },
      { opponent: 'Real Sociedad', competition: 'La Liga', date: '2026-10-17', odds: { win: 1.58, draw: 4.20, lose: 5.50 } },
      { opponent: 'Bayern Munich', competition: 'Champions League', date: '2026-10-21', odds: { win: 2.30, draw: 3.40, lose: 3.00 } }
    ]
  },
  {
    slug: 'real-madrid',
    name: 'Real Madrid',
    country: 'Spain',
    league: 'La Liga',
    stadium: 'Santiago Bernabéu',
    manager: 'Carlo Ancelotti',
    form: 'W-L-W-W-D',
    points: 27,
    season_record: '8-3-3',
    stats: {
      shots_on_target: 17.6,
      goals_scored: 2.5,
      goals_conceded: 1.1,
      possession: 59,
      pass_accuracy: 85,
      xg: 2.0,
      big_chances_created: 14
    },
    half_time_stats: {
      first_half_goals: 1.2,
      second_half_goals: 1.3,
      first_half_shots: 7.2,
      second_half_shots: 8.9
    },
    home_away: {
      home_form: 'W-W-D-W-L',
      away_form: 'W-L-W-W-D',
      home_goals_for: 2.8,
      home_goals_against: 0.8,
      away_goals_for: 2.2,
      away_goals_against: 1.2
    },
    recent_results: [
      { date: '2026-09-28', opponent: 'FC Barcelona', result: 'L 1-3' },
      { date: '2026-09-22', opponent: 'Athletic Bilbao', result: 'W 2-0' },
      { date: '2026-09-15', opponent: 'Borussia Dortmund', result: 'W 3-2' },
      { date: '2026-09-08', opponent: 'Celta Vigo', result: 'W 2-0' },
      { date: '2026-08-31', opponent: 'Osasuna', result: 'D 1-1' }
    ],
    player_stats: [
      { name: 'Kylian Mbappé', position: 'ST', goals: 21, assists: 8, shots_on_target: 83, rating: 8.8 },
      { name: 'Vinícius Júnior', position: 'LW', goals: 16, assists: 12, shots_on_target: 62, rating: 8.6 },
      { name: 'Jude Bellingham', position: 'CAM', goals: 12, assists: 10, shots_on_target: 40, rating: 8.3 },
      { name: 'Aurélien Tchouaméni', position: 'CM', goals: 5, assists: 7, shots_on_target: 16, rating: 7.9 }
    ],
    upcoming_matches: [
      { opponent: 'Valencia', competition: 'La Liga', date: '2026-10-04', odds: { win: 1.25, draw: 6.50, lose: 11.00 } },
      { opponent: 'Inter Milan', competition: 'Champions League', date: '2026-10-08', odds: { win: 2.10, draw: 3.60, lose: 3.30 } },
      { opponent: 'Getafe', competition: 'La Liga', date: '2026-10-19', odds: { win: 1.42, draw: 4.80, lose: 7.50 } }
    ]
  },
  {
    slug: 'manchester-city',
    name: 'Manchester City',
    country: 'England',
    league: 'Premier League',
    stadium: 'Etihad Stadium',
    manager: 'Pep Guardiola',
    form: 'W-D-W-L-W',
    points: 25,
    season_record: '8-1-3',
    stats: {
      shots_on_target: 18.1,
      goals_scored: 2.6,
      goals_conceded: 1.0,
      possession: 65,
      pass_accuracy: 88,
      xg: 2.3,
      big_chances_created: 16
    },
    half_time_stats: {
      first_half_goals: 1.4,
      second_half_goals: 1.2,
      first_half_shots: 8.1,
      second_half_shots: 8.0
    },
    home_away: {
      home_form: 'W-D-W-W-W',
      away_form: 'W-L-W-L-W',
      home_goals_for: 3.1,
      home_goals_against: 0.9,
      away_goals_for: 2.2,
      away_goals_against: 1.1
    },
    recent_results: [
      { date: '2026-09-28', opponent: 'Liverpool', result: 'D 1-1' },
      { date: '2026-09-22', opponent: 'Tottenham', result: 'W 3-1' },
      { date: '2026-09-15', opponent: 'Bayern Munich', result: 'W 2-0' },
      { date: '2026-09-08', opponent: 'Brighton', result: 'L 1-2' },
      { date: '2026-08-31', opponent: 'Chelsea', result: 'W 2-0' }
    ],
    player_stats: [
      { name: 'Erling Haaland', position: 'ST', goals: 22, assists: 5, shots_on_target: 86, rating: 8.8 },
      { name: 'Kevin De Bruyne', position: 'AM', goals: 8, assists: 14, shots_on_target: 29, rating: 8.5 },
      { name: 'Phil Foden', position: 'LW', goals: 13, assists: 11, shots_on_target: 49, rating: 8.2 },
      { name: 'Rúben Dias', position: 'CB', goals: 3, assists: 2, shots_on_target: 9, rating: 7.8 }
    ],
    upcoming_matches: [
      { opponent: 'Arsenal', competition: 'Premier League', date: '2026-10-03', odds: { win: 2.20, draw: 3.50, lose: 3.00 } },
      { opponent: 'Juventus', competition: 'Champions League', date: '2026-10-07', odds: { win: 1.55, draw: 4.50, lose: 6.00 } },
      { opponent: 'Leicester City', competition: 'Premier League', date: '2026-10-17', odds: { win: 1.18, draw: 8.50, lose: 17.00 } }
    ]
  },
  {
    slug: 'bayern-munich',
    name: 'Bayern Munich',
    country: 'Germany',
    league: 'Bundesliga',
    stadium: 'Allianz Arena',
    manager: 'Vincent Kompany',
    form: 'W-W-D-W-L',
    points: 26,
    season_record: '8-2-2',
    stats: {
      shots_on_target: 17.9,
      goals_scored: 2.8,
      goals_conceded: 1.0,
      possession: 60,
      pass_accuracy: 86,
      xg: 2.2,
      big_chances_created: 13
    },
    half_time_stats: {
      first_half_goals: 1.5,
      second_half_goals: 1.3,
      first_half_shots: 7.6,
      second_half_shots: 8.3
    },
    home_away: {
      home_form: 'W-W-W-L-W',
      away_form: 'D-W-D-W-L',
      home_goals_for: 3.0,
      home_goals_against: 0.8,
      away_goals_for: 2.4,
      away_goals_against: 1.2
    },
    recent_results: [
      { date: '2026-09-28', opponent: 'RB Leipzig', result: 'W 2-1' },
      { date: '2026-09-20', opponent: 'Manchester City', result: 'L 0-2' },
      { date: '2026-09-16', opponent: 'Leverkusen', result: 'D 2-2' },
      { date: '2026-09-09', opponent: 'Holstein Kiel', result: 'W 3-0' },
      { date: '2026-08-30', opponent: 'Wolfsburg', result: 'W 2-1' }
    ],
    player_stats: [
      { name: 'Harry Kane', position: 'ST', goals: 24, assists: 10, shots_on_target: 90, rating: 9.0 },
      { name: 'Jamal Musiala', position: 'AM', goals: 11, assists: 9, shots_on_target: 45, rating: 8.6 },
      { name: 'Kingsley Coman', position: 'LW', goals: 9, assists: 8, shots_on_target: 31, rating: 8.1 },
      { name: 'Joshua Kimmich', position: 'CM', goals: 4, assists: 12, shots_on_target: 18, rating: 8.3 }
    ],
    upcoming_matches: [
      { opponent: 'Borussia Dortmund', competition: 'Bundesliga', date: '2026-10-04', odds: { win: 1.72, draw: 4.00, lose: 4.60 } },
      { opponent: 'Barcelona', competition: 'Champions League', date: '2026-10-09', odds: { win: 2.90, draw: 3.40, lose: 2.40 } },
      { opponent: 'Mainz', competition: 'Bundesliga', date: '2026-10-18', odds: { win: 1.28, draw: 6.00, lose: 9.00 } }
    ]
  },
  {
    slug: 'liverpool',
    name: 'Liverpool',
    country: 'England',
    league: 'Premier League',
    stadium: 'Anfield',
    manager: 'Arne Slot',
    form: 'W-W-D-W-L',
    points: 25,
    season_record: '8-1-2',
    stats: {
      shots_on_target: 17.5,
      goals_scored: 2.4,
      goals_conceded: 1.0,
      possession: 58,
      pass_accuracy: 84,
      xg: 2.1,
      big_chances_created: 13
    },
    half_time_stats: {
      first_half_goals: 1.2,
      second_half_goals: 1.3,
      first_half_shots: 7.2,
      second_half_shots: 8.4
    },
    home_away: {
      home_form: 'W-W-W-L-W',
      away_form: 'W-D-W-L-L',
      home_goals_for: 2.8,
      home_goals_against: 0.7,
      away_goals_for: 2.1,
      away_goals_against: 1.1
    },
    recent_results: [
      { date: '2026-09-29', opponent: 'Brighton', result: 'W 2-0' },
      { date: '2026-09-23', opponent: 'Chelsea', result: 'W 3-1' },
      { date: '2026-09-16', opponent: 'Inter Milan', result: 'D 2-2' },
      { date: '2026-09-12', opponent: 'Tottenham', result: 'W 2-1' },
      { date: '2026-09-06', opponent: 'Newcastle', result: 'L 0-1' }
    ],
    player_stats: [
      { name: 'Mohamed Salah', position: 'RW', goals: 18, assists: 13, shots_on_target: 64, rating: 8.9 },
      { name: 'Luis Díaz', position: 'LW', goals: 13, assists: 8, shots_on_target: 38, rating: 8.2 },
      { name: 'Alexis Mac Allister', position: 'CM', goals: 6, assists: 10, shots_on_target: 17, rating: 7.9 },
      { name: 'Virgil van Dijk', position: 'CB', goals: 4, assists: 2, shots_on_target: 9, rating: 8.1 }
    ],
    upcoming_matches: [
      { opponent: 'Aston Villa', competition: 'Premier League', date: '2026-10-04', odds: { win: 1.72, draw: 3.90, lose: 4.50 } },
      { opponent: 'Leverkusen', competition: 'Champions League', date: '2026-10-08', odds: { win: 1.80, draw: 3.80, lose: 4.20 } },
      { opponent: 'West Ham', competition: 'Premier League', date: '2026-10-18', odds: { win: 1.38, draw: 5.20, lose: 7.60 } }
    ]
  },
  {
    slug: 'arsenal',
    name: 'Arsenal',
    country: 'England',
    league: 'Premier League',
    stadium: 'Emirates Stadium',
    manager: 'Mikel Arteta',
    form: 'W-W-D-W-W',
    points: 26,
    season_record: '8-2-1',
    stats: {
      shots_on_target: 17.1,
      goals_scored: 2.3,
      goals_conceded: 0.8,
      possession: 57,
      pass_accuracy: 83,
      xg: 2.0,
      big_chances_created: 12
    },
    half_time_stats: {
      first_half_goals: 1.1,
      second_half_goals: 1.2,
      first_half_shots: 7.3,
      second_half_shots: 7.9
    },
    home_away: {
      home_form: 'W-W-W-W-D',
      away_form: 'W-D-L-W-W',
      home_goals_for: 2.6,
      home_goals_against: 0.6,
      away_goals_for: 2.1,
      away_goals_against: 0.9
    },
    recent_results: [
      { date: '2026-09-29', opponent: 'Crystal Palace', result: 'W 2-0' },
      { date: '2026-09-22', opponent: 'Manchester United', result: 'W 3-2' },
      { date: '2026-09-18', opponent: 'PSG', result: 'D 1-1' },
      { date: '2026-09-13', opponent: 'Southampton', result: 'W 2-0' },
      { date: '2026-09-06', opponent: 'Fulham', result: 'W 1-0' }
    ],
    player_stats: [
      { name: 'Bukayo Saka', position: 'RW', goals: 15, assists: 10, shots_on_target: 52, rating: 8.7 },
      { name: 'Kai Havertz', position: 'ST', goals: 14, assists: 7, shots_on_target: 48, rating: 8.3 },
      { name: 'Martin Ødegaard', position: 'AM', goals: 8, assists: 12, shots_on_target: 27, rating: 8.5 },
      { name: 'William Saliba', position: 'CB', goals: 3, assists: 3, shots_on_target: 8, rating: 8.1 }
    ],
    upcoming_matches: [
      { opponent: 'Manchester City', competition: 'Premier League', date: '2026-10-03', odds: { win: 2.40, draw: 3.60, lose: 2.90 } },
      { opponent: 'Atletico Madrid', competition: 'Champions League', date: '2026-10-07', odds: { win: 2.10, draw: 3.50, lose: 3.20 } },
      { opponent: 'Everton', competition: 'Premier League', date: '2026-10-17', odds: { win: 1.52, draw: 4.40, lose: 6.20 } }
    ]
  },
  {
    slug: 'inter-milan',
    name: 'Inter Milan',
    country: 'Italy',
    league: 'Serie A',
    stadium: 'San Siro',
    manager: 'Simone Inzaghi',
    form: 'W-W-D-W-W',
    points: 26,
    season_record: '8-2-1',
    stats: {
      shots_on_target: 17.8,
      goals_scored: 2.5,
      goals_conceded: 0.8,
      possession: 60,
      pass_accuracy: 84,
      xg: 2.2,
      big_chances_created: 14
    },
    half_time_stats: {
      first_half_goals: 1.3,
      second_half_goals: 1.2,
      first_half_shots: 7.5,
      second_half_shots: 8.0
    },
    home_away: {
      home_form: 'W-W-W-D-W',
      away_form: 'W-D-W-L-W',
      home_goals_for: 2.7,
      home_goals_against: 0.7,
      away_goals_for: 2.2,
      away_goals_against: 1.0
    },
    recent_results: [
      { date: '2026-09-28', opponent: 'Napoli', result: 'W 2-1' },
      { date: '2026-09-22', opponent: 'Juventus', result: 'D 1-1' },
      { date: '2026-09-16', opponent: 'Liverpool', result: 'D 2-2' },
      { date: '2026-09-11', opponent: 'Lazio', result: 'W 2-0' },
      { date: '2026-09-04', opponent: 'AC Milan', result: 'W 1-0' }
    ],
    player_stats: [
      { name: 'Lautaro Martínez', position: 'ST', goals: 20, assists: 7, shots_on_target: 72, rating: 8.8 },
      { name: 'Marcus Thuram', position: 'ST', goals: 15, assists: 9, shots_on_target: 46, rating: 8.4 },
      { name: 'Nicolò Barella', position: 'CM', goals: 6, assists: 11, shots_on_target: 18, rating: 8.2 },
      { name: 'Alessandro Bastoni', position: 'CB', goals: 3, assists: 3, shots_on_target: 8, rating: 8.0 }
    ],
    upcoming_matches: [
      { opponent: 'Roma', competition: 'Serie A', date: '2026-10-04', odds: { win: 1.62, draw: 4.10, lose: 5.00 } },
      { opponent: 'Real Madrid', competition: 'Champions League', date: '2026-10-08', odds: { win: 2.90, draw: 3.30, lose: 2.40 } },
      { opponent: 'Monza', competition: 'Serie A', date: '2026-10-19', odds: { win: 1.30, draw: 5.50, lose: 9.00 } }
    ]
  },
  {
    slug: 'psg',
    name: 'Paris Saint-Germain',
    country: 'France',
    league: 'Ligue 1',
    stadium: 'Parc des Princes',
    manager: 'Luis Enrique',
    form: 'W-W-L-W-W',
    points: 23,
    season_record: '7-2-2',
    stats: {
      shots_on_target: 17.0,
      goals_scored: 2.4,
      goals_conceded: 1.0,
      possession: 62,
      pass_accuracy: 85,
      xg: 2.1,
      big_chances_created: 12
    },
    half_time_stats: {
      first_half_goals: 1.2,
      second_half_goals: 1.3,
      first_half_shots: 7.1,
      second_half_shots: 8.3
    },
    home_away: {
      home_form: 'W-W-W-L-W',
      away_form: 'W-L-W-W-D',
      home_goals_for: 2.8,
      home_goals_against: 0.9,
      away_goals_for: 2.1,
      away_goals_against: 1.2
    },
    recent_results: [
      { date: '2026-09-29', opponent: 'Marseille', result: 'W 2-1' },
      { date: '2026-09-23', opponent: 'Monaco', result: 'W 3-0' },
      { date: '2026-09-18', opponent: 'Arsenal', result: 'D 1-1' },
      { date: '2026-09-12', opponent: 'Lille', result: 'W 2-0' },
      { date: '2026-09-05', opponent: 'Brest', result: 'L 1-2' }
    ],
    player_stats: [
      { name: 'Ousmane Dembélé', position: 'RW', goals: 17, assists: 10, shots_on_target: 62, rating: 8.7 },
      { name: 'Gonçalo Ramos', position: 'ST', goals: 16, assists: 6, shots_on_target: 58, rating: 8.2 },
      { name: 'Vitinha', position: 'CM', goals: 7, assists: 12, shots_on_target: 24, rating: 8.1 },
      { name: 'Achraf Hakimi', position: 'RB', goals: 5, assists: 8, shots_on_target: 18, rating: 8.3 }
    ],
    upcoming_matches: [
      { opponent: 'Nice', competition: 'Ligue 1', date: '2026-10-04', odds: { win: 1.45, draw: 4.70, lose: 6.50 } },
      { opponent: 'Bayer Leverkusen', competition: 'Champions League', date: '2026-10-08', odds: { win: 1.82, draw: 3.80, lose: 4.20 } },
      { opponent: 'Lorient', competition: 'Ligue 1', date: '2026-10-19', odds: { win: 1.25, draw: 6.40, lose: 10.50 } }
    ]
  },
  {
    slug: 'atletico-madrid',
    name: 'Atletico Madrid',
    country: 'Spain',
    league: 'La Liga',
    stadium: 'Wanda Metropolitano',
    manager: 'Diego Simeone',
    form: 'W-D-W-L-W',
    points: 24,
    season_record: '7-3-2',
    stats: {
      shots_on_target: 15.9,
      goals_scored: 2.1,
      goals_conceded: 0.9,
      possession: 52,
      pass_accuracy: 81,
      xg: 1.8,
      big_chances_created: 10
    },
    half_time_stats: {
      first_half_goals: 1.0,
      second_half_goals: 1.1,
      first_half_shots: 6.8,
      second_half_shots: 7.4
    },
    home_away: {
      home_form: 'W-D-W-W-W',
      away_form: 'W-L-W-D-L',
      home_goals_for: 2.3,
      home_goals_against: 0.6,
      away_goals_for: 1.9,
      away_goals_against: 1.1
    },
    recent_results: [
      { date: '2026-09-29', opponent: 'Valencia', result: 'W 2-0' },
      { date: '2026-09-22', opponent: 'Betis', result: 'D 1-1' },
      { date: '2026-09-16', opponent: 'Bayer Leverkusen', result: 'L 1-2' },
      { date: '2026-09-12', opponent: 'Real Sociedad', result: 'W 1-0' },
      { date: '2026-09-06', opponent: 'Athletic Bilbao', result: 'W 2-1' }
    ],
    player_stats: [
      { name: 'Antoine Griezmann', position: 'AM', goals: 16, assists: 8, shots_on_target: 50, rating: 8.5 },
      { name: 'Álvaro Morata', position: 'ST', goals: 13, assists: 4, shots_on_target: 41, rating: 8.0 },
      { name: 'Rodrigo De Paul', position: 'CM', goals: 5, assists: 9, shots_on_target: 14, rating: 7.9 },
      { name: 'Joaquín Correa', position: 'LW', goals: 7, assists: 6, shots_on_target: 19, rating: 7.8 }
    ],
    upcoming_matches: [
      { opponent: 'Sevilla', competition: 'La Liga', date: '2026-10-05', odds: { win: 1.55, draw: 4.20, lose: 5.80 } },
      { opponent: 'Arsenal', competition: 'Champions League', date: '2026-10-07', odds: { win: 2.70, draw: 3.50, lose: 2.60 } },
      { opponent: 'Mallorca', competition: 'La Liga', date: '2026-10-18', odds: { win: 1.42, draw: 4.80, lose: 7.00 } }
    ]
  },
  {
    slug: 'juventus',
    name: 'Juventus',
    country: 'Italy',
    league: 'Serie A',
    stadium: 'Allianz Stadium',
    manager: 'Thiago Motta',
    form: 'W-D-L-W-W',
    points: 24,
    season_record: '7-3-3',
    stats: {
      shots_on_target: 16.6,
      goals_scored: 2.2,
      goals_conceded: 1.0,
      possession: 55,
      pass_accuracy: 82,
      xg: 1.9,
      big_chances_created: 11
    },
    half_time_stats: {
      first_half_goals: 1.1,
      second_half_goals: 1.1,
      first_half_shots: 6.9,
      second_half_shots: 7.6
    },
    home_away: {
      home_form: 'W-D-W-W-W',
      away_form: 'W-L-L-W-D',
      home_goals_for: 2.4,
      home_goals_against: 0.8,
      away_goals_for: 2.0,
      away_goals_against: 1.1
    },
    recent_results: [
      { date: '2026-09-29', opponent: 'AC Milan', result: 'W 1-0' },
      { date: '2026-09-24', opponent: 'Inter Milan', result: 'D 1-1' },
      { date: '2026-09-18', opponent: 'Lazio', result: 'W 2-1' },
      { date: '2026-09-12', opponent: 'Bologna', result: 'L 0-1' },
      { date: '2026-09-05', opponent: 'Napoli', result: 'W 2-1' }
    ],
    player_stats: [
      { name: 'Dusan Vlahović', position: 'ST', goals: 17, assists: 4, shots_on_target: 56, rating: 8.3 },
      { name: 'Federico Chiesa', position: 'LW', goals: 9, assists: 8, shots_on_target: 30, rating: 7.9 },
      { name: 'Adrien Rabiot', position: 'CM', goals: 6, assists: 9, shots_on_target: 16, rating: 8.0 },
      { name: 'Gleison Bremer', position: 'CB', goals: 2, assists: 2, shots_on_target: 6, rating: 7.7 }
    ],
    upcoming_matches: [
      { opponent: 'Torino', competition: 'Serie A', date: '2026-10-04', odds: { win: 1.55, draw: 4.20, lose: 5.80 } },
      { opponent: 'Manchester City', competition: 'Champions League', date: '2026-10-07', odds: { win: 3.20, draw: 3.40, lose: 2.20 } },
      { opponent: 'Udinese', competition: 'Serie A', date: '2026-10-19', odds: { win: 1.40, draw: 4.90, lose: 7.40 } }
    ]
  }
];
