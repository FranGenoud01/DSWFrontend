export interface TokenResponse {
  accessToken: string;
  patient: {
    DNI: string;
    name: string;
    surname: string;
  };
}
