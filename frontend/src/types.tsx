export type AuthCredential = {
  login: string;
  password: string;
};

export type Tokens = {
  access: string;
  refresh: string;
};

type BookOwner = {
  id: number;
  login: string;
};

export type UserBook = {
  id: number;
  title: string;
  authors: string[];
  owner: BookOwner;
  google_volume_id: string;
  published_at: string;
  created_at: string;
};
