import axiosInstance from "@/src/lib/axios";

export const http = {
  async get<T = unknown>(url: string, params?: unknown) {
    const res = await axiosInstance.get<T>(url, { params });
    return res.data;
  },

  async post<T = unknown>(url: string, data?: unknown) {
    const res = await axiosInstance.post<T>(url, data);
    return res.data;
  },

  async update<T = unknown>(url: string, data?: unknown) {
    const res = await axiosInstance.put<T>(url, data);
    return res.data;
  },

  async delete<T = unknown>(url: string) {
    const res = await axiosInstance.delete<T>(url);
    return res.data;
  },
};
