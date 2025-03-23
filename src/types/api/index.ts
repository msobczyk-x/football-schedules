export type Competitor = {
  id: string;
  name: string;
  country: string;
  country_code: string;
  abbreviation: string;
  qualifier: string;
  gender: string;
  age_group: string;
};

export type Group = {
  id: string;
  name: string;
  group_name: string;
};

export type PeriodScore = {
  home_score: number;
  away_score: number;
  type: string;
  number: number;
};

export enum ESportEventStatus {
  NOT_STARTED = "not_started",
  STARTED = "started",
  LIVE = "live",
  POSTPONED = "postponed",
  SUSPENDED = "suspended",
  DELAYED = "delayed",
  INTERRUPTED = "interrupted",
  CANCELLED = "cancelled",
  ENDED = "ended",
  CLOSED = "closed",
  ABANDONED = "abandoned",
}

export type SportEventStatus =
  | ESportEventStatus.ABANDONED
  | ESportEventStatus.CANCELLED
  | ESportEventStatus.CLOSED
  | ESportEventStatus.DELAYED
  | ESportEventStatus.ENDED
  | ESportEventStatus.INTERRUPTED
  | ESportEventStatus.LIVE
  | ESportEventStatus.NOT_STARTED
  | ESportEventStatus.POSTPONED
  | ESportEventStatus.STARTED
  | ESportEventStatus.SUSPENDED;

export type Schedule = {
  sport_event: {
    id: string;
    start_time: string;
    start_time_confirmed: boolean;
    sport_event_context: SportEventContext;
    coverage: {
      type: string;
      sport_event_properties: Omit<
        SportEventProperties,
        | "lineups_availability"
        | "ballspotting"
        | "commentary"
        | "fun_facts"
        | "goal_scorers"
        | "goal_scorers_live"
        | "scores"
        | "game_clock"
        | "deeper_play_by_play"
        | "deeper_player_stats"
        | "deeper_team_stats"
      >;
    };
    competitors: Competitor[];
    sport_event_conditions: {
      ground: Ground;
    };
  };
  sport_event_status: Omit<
    SportEventStatusDetail,
    "ball_locations" | "match_situation"
  >;
};

export type ScheduleResponse = {
  generated_at: string;
  schedules: Schedule[];
};

export type ApiErrorResponse = {
  error: string;
};

export type SportEventData = {
  generated_at: string;
  sport_event: SportEvent;
  sport_event_status: SportEventStatusDetail;
  statistics: Statistics;
};

export type SportEvent = {
  id: string;
  start_time: string;
  start_time_confirmed: boolean;
  sport_event_context: SportEventContext;
  coverage: Coverage;
  competitors: Competitor[];
  venue: Venue;
  channels: Channel[];
  sport_event_conditions: SportEventConditions;
};

export type SportEventContext = {
  sport: Sport;
  category: Category;
  competition: Competition;
  season: Season;
  stage: Stage;
  round: Round;
  groups: Group[];
};

export type Sport = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
  country_code: string;
};

export type Competition = {
  id: string;
  name: string;
  gender: string;
};

export type Season = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  year: string;
  competition_id: string;
};

export type Stage = {
  order: number;
  type: string;
  phase: string;
  start_date: string;
  end_date: string;
  year: string;
};

export type Round = {
  number: number;
};

export type Coverage = {
  type: string;
  sport_event_properties: SportEventProperties;
};

export type SportEventProperties = {
  lineups: boolean;
  formations: boolean;
  venue: boolean;
  extended_player_stats: boolean;
  extended_team_stats: boolean;
  lineups_availability: string;
  ballspotting: boolean;
  commentary: boolean;
  fun_facts: boolean;
  goal_scorers: boolean;
  goal_scorers_live: boolean;
  scores: string;
  game_clock: boolean;
  deeper_play_by_play: boolean;
  deeper_player_stats: boolean;
  deeper_team_stats: boolean;
  basic_play_by_play: boolean;
  basic_player_stats: boolean;
  basic_team_stats: boolean;
};

export type Venue = {
  id: string;
  name: string;
  capacity: number;
  city_name: string;
  country_name: string;
  map_coordinates: string;
  country_code: string;
  timezone: string;
};

export type Channel = {
  name: string;
  url?: string;
  country: string;
  country_code: string;
};

export type SportEventConditions = {
  referees: Referee[];
  attendance: Attendance;
  weather: Weather;
  ground: Ground;
  lineups: Lineups;
};

export type Referee = {
  id: string;
  name: string;
  nationality: string;
  country_code: string;
  type: string;
};

export type Attendance = {
  count: number;
};

export type Weather = {
  pitch_conditions: string;
  overall_conditions: string;
};

export type Ground = {
  neutral: boolean;
};

export type Lineups = {
  confirmed: boolean;
};

export type SportEventStatusDetail = {
  status: SportEventStatus;
  match_status: string;
  home_score: number;
  away_score: number;
  winner_id: string;
  period_scores: PeriodScore[];
  ball_locations: BallLocation[];
  match_situation: MatchSituation;
};

export type BallLocation = {
  order: number;
  x: number;
  y: number;
  qualifier: string;
};

export type MatchSituation = {
  status: string;
  qualifier: string;
  updated_at: string;
};

export type Statistics = {
  totals: {
    competitors: CompetitorStatistics[];
  };
};

export type CompetitorStatistics = {
  id: string;
  name: string;
  abbreviation: string;
  qualifier: string;
  statistics: TeamStatistics;
  players: PlayerStatistics[];
};

export type TeamStatistics = {
  ball_possession: number;
  cards_given: number;
  corner_kicks: number;
  fouls: number;
  free_kicks: number;
  goal_kicks: number;
  injuries: number;
  offsides: number;
  red_cards: number;
  shots_blocked: number;
  shots_off_target: number;
  shots_on_target: number;
  shots_saved: number;
  shots_total: number;
  substitutions: number;
  throw_ins: number;
  yellow_cards: number;
  yellow_red_cards: number;
};

export type PlayerStatistics = {
  id: string;
  name: string;
  starter: boolean;
  statistics: PlayerStats;
};

export type PlayerStats = {
  assists: number;
  corner_kicks: number;
  goals_scored: number;
  offsides: number;
  own_goals: number;
  red_cards: number;
  shots_blocked: number;
  shots_off_target: number;
  shots_on_target: number;
  substituted_in: number;
  substituted_out: number;
  yellow_cards: number;
  yellow_red_cards: number;
};

export type SportEventResponse = {
  generated_at: string;
  sport_event: SportEventData;
};

export interface SoccerStandingsResponse {
  generated_at: string;
  standings: Standing[];
}

export interface Standing {
  tie_break_rule: string;
  type: StandingType;
  groups: StandingGroup[];
  points_win: number;
  points_draw: number;
  points_loss: number;
  round: number;
}

export type StandingType =
  | "total"
  | "home"
  | "away"
  | "first_half_total"
  | "first_half_home"
  | "first_half_away"
  | "second_half_total"
  | "second_half_home"
  | "second_half_away";

export interface StandingGroup {
  stage: Stage;
  id: string;
  name: string;
  live: boolean;
  standings: TeamStanding[];
}

export interface TeamStanding {
  rank: number;
  played: number;
  win: number;
  loss: number;
  draw: number;
  goals_for: number;
  goals_against: number;
  goals_diff: number;
  competitor: StandingsCompetitor;
  points: number;
  current_outcome?: string;
  change: number;
  points_per_game: number;
}

export interface StandingsCompetitor extends Competitor {
  form: string;
}
