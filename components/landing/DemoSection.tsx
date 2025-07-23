import { Button } from "@/components/ui/button";

export default function DemoSection() {
  return (
    <section id="demo" className="px-4 py-16 text-center">
      <h2 className="text-3xl font-semibold mb-4">See It In Action</h2>
      <p className="mb-6">Check out the live demo or explore the code on GitHub.</p>
      <Button asChild><a href="https://your-demo-link">Live Demo</a></Button>
    </section>
  );
}
