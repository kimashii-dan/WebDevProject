import { AppComponent } from "./app.component";


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

export type AppComment = {
  id: number;
  task: number;
  content: string;
  created_at: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  comments: Comment[];
}



export type { LoginResponse, RegisterResponse, UserData, Task};
