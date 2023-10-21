export interface dataResponse<Type> {
  status: number;
  data?: Type | null;
  message: string;
}

export interface dataListResponse<Type> {
  status: number;
  data?: Type[] | null;
  message: string;
}

export interface updateResponse {
  status: number;
  message: string;
}
