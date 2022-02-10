export interface LoginResponse {
  access_token: string;
  user_info: LoginData;
}

export interface LoginData {
  id: string;
  username: string;
  password: string;
  firstname: string;
  surname: string;
  email: string;
  role: Role;
  team: Team[];
}

export interface Team {
  userid: string;
  firstname: string;
  surname: string;
}

export enum Role {
  Employee = 'Mitarbeiter_in',
  Superior = 'Vorgesetzte_r',
}

export interface LoginPayload {
  username: string;
  passwort: string;
}
