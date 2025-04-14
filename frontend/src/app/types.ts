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

interface Task {
  title: string;
  description: string;
  status: boolean;
  priority: string;
}

export type { LoginResponse, RegisterResponse, UserData, Task };
