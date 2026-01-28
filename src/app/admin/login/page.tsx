"use client";

import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { http } from "@/src/lib/http";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    access_token: string;
    user?: {
      id: string;
      email: string;
      name: string;
    };
  }
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      // Login API call
      const userData = await http.post<LoginResponse>("/auth/login", values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("token", userData.data.access_token ?? "");

      message.success("Login successful!");

      // Redirect to admin dashboard
      router.push("/admin");
    } catch {
      message.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-50 to-sky-100 dark:from-zinc-900 dark:to-zinc-800 px-4">
      <div className="max-w-md w-full">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-600 rounded-full mb-4">
            <LockOutlined className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Admin Login
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8">
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-zinc-400" />}
                placeholder="admin@example.com"
                className="dark:bg-zinc-700 dark:text-white"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-zinc-400" />}
                placeholder="••••••••"
                className="dark:bg-zinc-700 dark:text-white"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-sky-600 hover:bg-sky-700 border-sky-600"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          {/* Footer */}
          <div className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6">
            <p>Forgot your password? Contact your administrator.</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-8">
          <p>&copy; 2025 Admin Panel. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
