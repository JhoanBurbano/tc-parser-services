export interface FormattedQuestion {
  pregunta_id: number;
  pregunta: string;
}

export interface ApiFormattedResponse {
  titulo: string;
  dia: string;
  info: FormattedQuestion[];
  api_version: number;
}
