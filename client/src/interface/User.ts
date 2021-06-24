export interface User {
  id: string;
  email: string;
  profilePicture: string;
  board: {
    columns: { id: number; title: string; cards: { id: number; title: string; description: string }[] }[];
  };
  boards?: string[];
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}

export interface UpdateUserApiData {
  success?: User;
  error?: { message: string };
}
