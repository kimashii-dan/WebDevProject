interface LoginResponse {
  access: string;
  refresh: string;
}

interface RegisterResponse {
  id: number;
  username: string;
}

interface UserData {
  id: number;
  username: string;
}

export type { LoginResponse, RegisterResponse, UserData };
