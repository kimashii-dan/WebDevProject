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

interface Comment {
  id?: number;
  task: number;
  content: string;
  created_at?: string;
}

interface TaskDetails extends Task {
  comments: Comment[];
}

export type {
  LoginResponse,
  RegisterResponse,
  UserData,
  Task,
  TaskDetails,
  Comment,
};
