import { useState } from "react";
import { z } from "zod"
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import api from "@/lib/axios";

const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
})


export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", values);
      console.log(res.data);
      const token = res.data.token;
      const user = res.data.user;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/tasks");
      } else {
        setError("No token returned from server");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-black items-center justify-center">
        {/* <img
          src="https://bundui-images.netlify.app/extra/image4.jpg"
          alt="Login visual"
          className="object-cover h-full w-full"
        /> */}
      </div>
      <div className="flex flex-1 items-center justify-center bg-white">
        <Card className="w-full max-w-md p-8 rounded-xl shadow-xl border border-gray-100 flex flex-col gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <h1 className="text-2xl font-bold text-center mb-1">Welcome back</h1>
                <p className="text-sm text-gray-500 text-center">Please sign in to your account</p>
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end text-xs">
                    <a href="/auth/forgot" className="text-blue-600 hover:underline">Forgot your password?</a>
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
                <div className="flex items-center gap-2 my-2">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">or continue with</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="flex gap-2">
                  <Button type="button"  className="w-1/2 flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21.805 10.023h-9.765v3.997h5.619c-.242 1.312-1.459 3.85-5.619 3.85-3.378 0-6.131-2.797-6.131-6.25s2.753-6.25 6.131-6.25c1.924 0 3.217.769 3.959 1.436l2.705-2.624c-1.74-1.588-3.98-2.561-6.664-2.561-5.523 0-10 4.477-10 10s4.477 10 10 10c5.762 0 9.582-4.045 9.582-9.75 0-.654-.07-1.154-.156-1.648z" fill="#4285F4"></path><path d="M12.04 22c2.7 0 4.958-.89 6.609-2.422l-3.145-2.56c-.877.588-2.017.998-3.464.998-2.661 0-4.923-1.797-5.729-4.215h-3.37v2.641c1.657 3.271 5.079 5.558 9.099 5.558z" fill="#34A853"></path><path d="M6.311 13.801c-.2-.588-.314-1.215-.314-1.801 0-.627.115-1.234.302-1.801v-2.641h-3.37c-.684 1.355-1.079 2.873-1.079 4.442s.395 3.087 1.079 4.442l3.382-2.641z" fill="#FBBC05"></path><path d="M12.04 7.579c1.473 0 2.469.637 3.037 1.172l2.225-2.172c-1.34-1.234-3.078-1.997-5.262-1.997-2.02 0-3.855.781-5.08 2.047l3.382 2.641c.462-1.388 1.785-2.631 3.698-2.631z" fill="#EA4335"></path></g></svg>
                    Google
                  </Button>
                  <Button type="button"  className="w-1/2 flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12c0 4.387 3.165 8.028 7.335 8.865.537.099.732-.234.732-.519 0-.256-.009-.936-.014-1.837-2.984.649-3.614-1.438-3.614-1.438-.488-1.241-1.192-1.572-1.192-1.572-.974-.666.073-.652.073-.652 1.077.076 1.645 1.107 1.645 1.107.957 1.64 2.512 1.166 3.126.892.097-.693.374-1.167.68-1.436-2.382-.271-4.887-1.191-4.887-5.303 0-1.171.418-2.129 1.104-2.881-.111-.271-.479-1.362.104-2.84 0 0 .9-.288 2.95 1.099a10.18 10.18 0 0 1 2.687-.362c.912.004 1.832.124 2.687.362 2.05-1.387 2.95-1.099 2.95-1.099.583 1.478.215 2.569.105 2.84.687.752 1.103 1.71 1.103 2.881 0 4.122-2.508 5.029-4.897 5.295.384.331.726.984.726 1.984 0 1.432-.013 2.587-.013 2.938 0 .287.193.622.74.516C18.838 20.025 22 16.387 22 12c0-5.385-4.365-9.75-9.75-9.75z" fill="#181717"></path></g></svg>
                    GitHub
                  </Button>
                </div>
                <div className="text-center text-sm mt-2">
                  Don&apos;t have an account? <a href="/auth/register" className="text-blue-600 hover:underline">Sign up</a>
                </div>
              </CardContent>
            </form>
          </Form>
        </Card>

      </div>
    </main>
  );
}
