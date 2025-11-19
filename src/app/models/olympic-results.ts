/**
 * Represents a single Olympic Games participation for a country
 */
export interface Participation {
  id: number;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}

/**
 * Represents a country with its Olympic Games participations
 */
export interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}

/**
 * Type alias for an array of Olympic results
 */
export type OlympicResults = Olympic[];
