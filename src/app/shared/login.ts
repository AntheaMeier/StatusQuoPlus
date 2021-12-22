export interface Login {
  id: string;
  username: string;
  password: string;
  firstname: string;
  surname: string;
  email: string;
  role: string;
  team: Team[];
}

export interface Team {
  userid: string;
  firstname: string;
  surname: string;
}


