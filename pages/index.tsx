import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="px-4 py-20 text-center bg-white shadow">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Stay Organized. Get Things Done.</h1>
        <p className="text-lg mb-6">A fullstack task manager built with Next.js & Node.js to help you manage productivity with ease.</p>
        <div className="space-x-4">
          <Button asChild><a href="/auth/login">View Demo</a></Button>
          <Button variant="secondary" asChild><a href="https://github.com/your-repo">View on GitHub</a></Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Features</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Task Management", desc: "Create, edit, and delete tasks easily." },
            { title: "Set Priorities", desc: "Assign due dates and priorities to stay on track." },
            { title: "Progress Tracking", desc: "Mark tasks as todo, in progress, or done." },
            { title: "Filter & Sort", desc: "Quickly find and organize your tasks." },
            { title: "User Roles", desc: "Secure authentication & role-based access." },
            { title: "Responsive UI", desc: "Works beautifully on all devices." },
            { title: "Dashboard Stats", desc: "Get insights on task submissions, overdue, and active users." },
            { title: "Leaderboard", desc: "See the most active users by tasks completed or activity." },
            { title: "Performance Metrics", desc: "Track average time to grade, completion rates, and more." }
          ].map((f) => (
            <Card key={f.title}>
              <CardHeader>
                <CardTitle>{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="px-4 py-16 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {["Sign up & log in", "Create your tasks", "Track progress", "Complete & stay productive"].map((step, idx) => (
            <Card key={idx} className="w-40">
              <CardHeader>
                <CardTitle>Step {idx + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{step}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-4 py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-4">Built With</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {["Next.js", "Node.js", "Express", "PostgreSQL", "TailwindCSS", "Shadcn UI"].map((tech) => (
            <Card key={tech} className="px-4 py-2">
              <CardContent>{tech}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="px-4 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">See It In Action</h2>
        <p className="mb-6">Check out the live demo or explore the code on GitHub.</p>
        <Button asChild><a href="https://your-demo-link">Live Demo</a></Button>
      </section>

      {/* Footer */}
      <footer className="px-4 py-6 text-center text-sm text-gray-500 bg-white">
        © {new Date().getFullYear()} Tony Mugendi. All rights reserved.
      </footer>
    </main>
  );
}
