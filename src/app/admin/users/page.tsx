"use client";

import { useState, useEffect, useCallback } from "react";
import { Select } from "antd";
import { UserService } from "@/src/services/user.service";
import UserTable from "./user-table";
import { useRouter } from "next/navigation";

interface Role {
  id: number;
  name: string;
  display_name: string;
}

interface ApiUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  deleted_at: string | null;
  roles: Role[];
}

interface ApiResponse {
  message: string;
  statusCode: number;
  data: {
    data: ApiUser[];
  };
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const router = useRouter();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await UserService.getAll<ApiResponse>();

      // Map API data to our User interface
      const mappedUsers: User[] = response.data.data.map((apiUser) => ({
        id: apiUser.id,
        name: `${apiUser.name} ${apiUser.surname}`,
        email: apiUser.email,
        role: apiUser.roles[0]?.name || "User",
        status: apiUser.deleted_at ? "Inactive" : "Active",
      }));

      setUsers(mappedUsers);
    } catch {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetchUsers();
  }, [router, fetchUsers]);

  const filteredUsers = (users || []).filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All Roles" || user.role === roleFilter;
    const matchesStatus = statusFilter === "All Status" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Users
        </h2>
        <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">
          + Add User
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
          />
          <Select
            value={roleFilter}
            onChange={(value) => setRoleFilter(value)}
            className="w-40"
            options={[
              { value: "All Roles", label: "All Roles" },
              { value: "admin", label: "Admin" },
              { value: "user", label: "User" },
            ]}
          />
          <Select
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            className="w-40"
            options={[
              { value: "All Status", label: "All Status" },
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" },
            ]}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden">
        <UserTable
          data={filteredUsers}
          loading={loading}
          onRefresh={fetchUsers}
        />

        {/* Pagination */}
        <div className="bg-gray-50 dark:bg-zinc-700 px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredUsers.length} users
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-zinc-600 rounded hover:bg-gray-100 dark:hover:bg-zinc-600 dark:text-white disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-zinc-600 rounded hover:bg-gray-100 dark:hover:bg-zinc-600 dark:text-white disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
