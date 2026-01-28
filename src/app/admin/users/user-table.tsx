"use client";

import { UserService } from "@/src/services/user.service";
import { Table, Button, Space, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UserTableProps {
  data: User[];
  loading?: boolean;
  onRefresh?: () => void;
}

export default function UserTable({ data, loading = false }: UserTableProps) {
    
  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (_: unknown, __: unknown, index: number) => (
        <span>{index + 1}</span>
      )
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === "Active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link">Edit</Button>

          <Popconfirm
            title="Delete user?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = async (id: number) => {
    await UserService.delete<void>(id);
    window.location.reload();
  };

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      bordered
      loading={loading}
    />
  );
}
