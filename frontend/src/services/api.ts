// Base URL for the Aether backend. Configure via VITE_API_URL in a .env file
// (defaults to the local FastAPI dev server).
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('aether_token');

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    let detail = response.statusText;
    try {
      const data = await response.json();
      detail = data.detail ?? JSON.stringify(data);
    } catch {
      // ignore body parse errors
    }
    throw new ApiError(detail, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export interface UserOut {
  id: number;
  name: string;
  email: string;
  company_id: number | null;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export function registerUser(data: {
  name: string;
  email: string;
  password: string;
  company_id?: number | null;
}) {
  return request<UserOut>('/users/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function loginUser(data: { email: string; password: string }) {
  return request<AuthResponse>('/users/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getCurrentToken() {
  return localStorage.getItem('aether_token');
}

export function setToken(token: string) {
  localStorage.setItem('aether_token', token);
}

export function clearToken() {
  localStorage.removeItem('aether_token');
}

// ---------------------------------------------------------------------------
// Companies & employees
// ---------------------------------------------------------------------------

export interface CompanyOut {
  id: number;
  name: string;
  cnpj: string;
}

export function createCompany(data: { name: string; cnpj: string }) {
  return request<CompanyOut>('/companies/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function listCompanies() {
  return request<CompanyOut[]>('/companies/');
}

export function getCompany(companyId: number) {
  return request<CompanyOut>(`/companies/${companyId}`);
}

export function listEmployees(companyId: number) {
  return request<UserOut[]>(`/users/?company_id=${companyId}`);
}

export function createEmployee(
  companyId: number,
  data: { name: string; email: string; password: string },
) {
  return registerUser({ ...data, company_id: companyId });
}

// ---------------------------------------------------------------------------
// AI Chat
// ---------------------------------------------------------------------------

export interface MessageOut {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatOut {
  id: number;
  project_id: number | null;
}

export interface ChatWithMessages extends ChatOut {
  messages: MessageOut[];
}

export function createChat(projectId?: number | null) {
  return request<ChatOut>('/chat/', {
    method: 'POST',
    body: JSON.stringify({ project_id: projectId ?? null }),
  });
}

export function getChat(chatId: number) {
  return request<ChatWithMessages>(`/chat/${chatId}`);
}

export function sendMessage(chatId: number, content: string) {
  return request<MessageOut>('/chat/send', {
    method: 'POST',
    body: JSON.stringify({ chat_id: chatId, content }),
  });
}

export { request };
