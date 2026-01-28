import { http } from "../lib/http";

export const UserService = {
  getAll: <T = unknown>() => http.get<T>("/users"),
  getById: <T = unknown>(id: number) => http.get<T>(`/users/${id}`),
  create: <T = unknown>(data?: unknown) => http.post<T>("/users", data),
  update: <T = unknown>(id: number, data: unknown) => http.update<T>(`/users/${id}`, data),
  delete: <T = unknown>(id: number) => http.delete<T>(`/users/${id}`),
};
