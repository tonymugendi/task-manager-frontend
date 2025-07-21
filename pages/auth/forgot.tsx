import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // TODO: Call API for password reset
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-8 w-full max-w-sm flex flex-col gap-4 border border-gray-200"
      >
        <h1 className="text-2xl font-bold mb-2 text-center">Forgot Password</h1>
        {sent ? (
          <div className="text-green-600 text-center">
            If this email exists, a reset link has been sent.
          </div>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
            <div className="text-center text-sm mt-2">
              <a href="/auth/login" className="text-blue-600 hover:underline">Back to Login</a>
            </div>
          </>
        )}
      </form>
    </main>
  );
}
