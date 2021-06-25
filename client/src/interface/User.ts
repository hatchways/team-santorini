export interface User {
  id: string;
  email: string;
  profilePicture: string;
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
