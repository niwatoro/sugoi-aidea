export type User = {
  id: string;
  name: string;
  username: string;
  photoUrl: string;
  email: string;
  createdAt: number;
  bio?: string;
  organization?: string;
  github?: string;
};
