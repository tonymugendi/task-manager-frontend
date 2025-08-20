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
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdEmail, MdLock } from 'react-icons/md';
import { BiTask } from 'react-icons/bi';
import api from "@/lib/axios";
import { Link } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})


export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      const token = res.data.data.token;
      const user = res.data.data.user;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/boards");
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
    <main className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="mb-8">
            <BiTask className="w-16 h-16 text-white/90" />
          </div>
          <h2 className="text-4xl font-bold mb-4 text-center">Task Manager Pro</h2>
          <p className="text-xl text-white/80 text-center mb-8 max-w-md leading-relaxed">
            Streamline your workflow with our powerful task management platform
          </p>
          <div className="space-y-4 text-white/70">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span>Organize tasks efficiently</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span>Collaborate with your team</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span>Track progress in real-time</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <BiTask className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Task Manager Pro</h1>
          </div>

          <Card className="w-full p-8 rounded-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <CardHeader className="p-0">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
                    <p className="text-gray-600">Please sign in to your account</p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </div>
                  )}
                </CardHeader>

                <CardContent className="p-0 space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              placeholder="Enter your email"
                              type="email"
                              className="pl-10 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg transition-all duration-200"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              placeholder="Enter your password"
                              type={showPassword ? "text" : "password"}
                              className="pl-10 pr-10 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg transition-all duration-200"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Link
                      href="/auth/forgot"
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing in...
                      </div>
                    ) : (
                      "Sign in"
                    )}
                  </Button>

                  {/* <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    <span className="text-sm text-gray-500 font-medium">or continue with</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 border-gray-200 hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      <FaGoogle className="w-4 h-4 text-red-500 mr-2" />
                      <span className="text-gray-700">Google</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 border-gray-200 hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      <FaGithub className="w-4 h-4 text-gray-900 mr-2" />
                      <span className="text-gray-700">GitHub</span>
                    </Button>
                  </div> */}

                  <div className="text-center pt-4">
                    <p className="text-gray-600">
                      Don&apos;t have an account?{' '}
                      <a
                        href="/auth/register"
                        className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </CardContent>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </main>
  );
}

LoginPage.noLayout = true;
