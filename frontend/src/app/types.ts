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
  id?: number;
  title: string;
  description: string;
  status: boolean;
  priority: string;
  createdAt?: string;
}

export type { LoginResponse, RegisterResponse, UserData, Task };
