export type Note = [position: number, length: number, pitchStart: number, pitchDelta: number, pitchEnd: number];

export interface Lyric {
  bar: number;
  text: string;
}

export interface Chart {
  author: string;
  name: string;
  description: string;
  shortName: string;
  trackRef: string;
  genre: string;
  year: string;
  difficulty: number;
  savednotespacing: number;
  tempo: number;
  timesig: number;
  endpoint: number;
  UNK1: number;
  notes: Note[];
  lyrics: Lyric[];
}
