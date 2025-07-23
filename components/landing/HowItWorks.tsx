import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HowItWorks() {
  const steps = ["Sign up & log in", "Create your tasks", "Track progress", "Complete & stay productive"];

  return (
    <section className="px-4 py-16 bg-white text-center">
      <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
      <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
        {steps.map((step, idx) => (
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
  );
}
