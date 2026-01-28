import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-zinc-900">
      {/* Sidebar */}
      <aside className="w-64 bg-sky-700 dark:bg-sky-900 text-white fixed h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <Link
            href="/admin"
            className="flex items-center px-6 py-3 hover:bg-sky-600 dark:hover:bg-sky-800 transition"
          >
            <span className="mr-3">📊</span>
            Dashboard
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center px-6 py-3 hover:bg-sky-600 dark:hover:bg-sky-800 transition"
          >
            <span className="mr-3">👥</span>
            Users
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center px-6 py-3 hover:bg-sky-600 dark:hover:bg-sky-800 transition"
          >
            <span className="mr-3">📦</span>
            Products
          </Link>
          <Link
            href="/"
            className="flex items-center px-6 py-3 hover:bg-sky-600 dark:hover:bg-sky-800 transition mt-4"
          >
            <span className="mr-3">🏠</span>
            Back to Site
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
