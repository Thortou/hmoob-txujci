import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                1,234
              </p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
          <Link
            href="/admin/users"
            className="text-sky-600 hover:text-sky-700 text-sm mt-4 inline-block"
          >
            View all →
          </Link>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Products</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                567
              </p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
          <Link
            href="/admin/products"
            className="text-sky-600 hover:text-sky-700 text-sm mt-4 inline-block"
          >
            View all →
          </Link>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Active Users</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                892
              </p>
            </div>
            <div className="text-4xl">🟢</div>
          </div>
          <p className="text-green-600 text-sm mt-4">+12% from last month</p>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Revenue</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                $12,345
              </p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
          <p className="text-green-600 text-sm mt-4">+8% from last month</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b dark:border-zinc-700">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👤</span>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  New user registered
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  john@example.com
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              2 minutes ago
            </span>
          </div>

          <div className="flex items-center justify-between py-3 border-b dark:border-zinc-700">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📦</span>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  New product added
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Product #567
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              15 minutes ago
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  New order received
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Order #1234
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              1 hour ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
