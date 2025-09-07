export interface ApiLeagueItem {
  league: {
    id: number;
    name: string;
    logo: string;
  };
  country: {
    name: string;
    code?: string;
    flag?: string;
  };
  season: number;
}

export interface LeagueData {
  id: number;
  apiId: number;
  name: string;
  country?: string;
  season?: number;
  logo?: string;
}

export interface ApiMatchItem {
  fixture: {
    id: number;
    date: string; 
    status: {
      short: string;
      long?: string;
    };
  };
  league: {
    id: number;
    name: string;
    logo: string;
    country?: {
      name: string;
      code?: string;
    };
    season: number;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  score: {
    fulltime: {
      home?: number;
      away?: number;
    };
  };
}

export interface MatchData {
  id: number;           
  date: string;         
  homeTeamName: string;
  awayTeamName: string;
  leagueName: string;
  leagueId: number;
  status?: string;
  scoreHome?: number;
  scoreAway?: number;
}