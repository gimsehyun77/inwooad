"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      console.error(error);
  alert(error.message);
      return;
    }

    router.push("/admin/orders");
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white text-black rounded-3xl p-8"
      >
        <h1 className="text-3xl font-black">관리자 로그인</h1>
        <p className="mt-3 text-neutral-500">
          INWOOAD 주문 관리 페이지에 접속합니다.
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="관리자 이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-yellow-400 text-black py-4 rounded-xl font-black disabled:opacity-50"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </main>
  );
}