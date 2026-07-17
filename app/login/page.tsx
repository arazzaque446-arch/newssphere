import { login } from "./actions";

interface LoginPageProps {
  searchParams?: Promise<{
    error?: string;
  }>;
}

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700">
      <form
        action={login}
        className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl"
      >
        <h1 className="mb-2 text-center text-5xl font-bold">
          NewsSphere
        </h1>

        <p className="mb-8 text-center text-slate-500">
          Administrator Login
        </p>

        {params?.error && (
          <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-center text-red-600">
            Invalid email or password.
          </div>
        )}

        <label className="mb-2 block font-semibold">
          Email
        </label>

        <input
          name="email"
          type="email"
          required
          className="mb-6 w-full rounded-xl border p-4"
          placeholder="admin@example.com"
        />

        <label className="mb-2 block font-semibold">
          Password
        </label>

        <input
          name="password"
          type="password"
          required
          className="mb-8 w-full rounded-xl border p-4"
          placeholder="Password"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-4 text-lg font-bold text-white transition hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </main>
  );
}