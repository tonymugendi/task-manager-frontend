import { Card, CardContent } from "@/components/ui/card";

export default function TechStack() {
  const techCategories = [
    {
      title: "Frontend",
      icon: "🎨",
      iconBg: "from-blue-500 to-cyan-500",
      technologies: [
        { name: "Next.js", desc: "React Framework", color: "from-black to-gray-800", icon: "⚡" },
        { name: "TypeScript", desc: "Type Safety", color: "from-blue-600 to-blue-700", icon: "🔷" },
        { name: "Tailwind CSS", desc: "Utility-First CSS", color: "from-cyan-500 to-blue-500", icon: "🎨" },
        { name: "Shadcn/UI", desc: "Component Library", color: "from-slate-700 to-slate-800", icon: "🧩" }
      ]
    },
    {
      title: "Backend & Database",
      icon: "⚙️",
      iconBg: "from-green-500 to-emerald-500",
      technologies: [
        { name: "Node.js", desc: "Runtime Environment", color: "from-green-600 to-green-700", icon: "🟢" },
        { name: "Fastify", desc: "High-Performance Web Framework", color: "from-gray-700 to-gray-800", icon: "🚀" },
        { name: "PostgreSQL", desc: "Database", color: "from-blue-700 to-indigo-700", icon: "🐘" },
        { name: "Prisma", desc: "ORM", color: "from-indigo-600 to-purple-600", icon: "🔗" }
      ]
    },
    {
      title: "DevOps & Tools",
      icon: "🛠️",
      iconBg: "from-purple-500 to-pink-500",
      technologies: [
        { name: "Docker", desc: "Containerization", color: "from-blue-500 to-blue-600", icon: "🐳" },
        { name: "Vercel", desc: "Deployment", color: "from-black to-gray-800", icon: "▲" },
        { name: "GitHub", desc: "Version Control", color: "from-gray-800 to-black", icon: "🐙" },
        { name: "Jest", desc: "Testing", color: "from-red-600 to-red-700", icon: "🧪" }
      ]
    }
  ];

  return (
    <section className="px-4 py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-indigo-600 bg-clip-text text-transparent">
          Built With Modern Technologies
        </h2>
        <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
          Leveraging cutting-edge tools and frameworks for optimal performance, scalability, and developer experience
        </p>
        
        <div className="grid gap-12 md:gap-16">
          {techCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-3">
                <span className={`w-8 h-8 bg-gradient-to-r ${category.iconBg} rounded-lg flex items-center justify-center text-white text-lg`}>
                  {category.icon}
                </span>
                {category.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {category.technologies.map((tech) => (
                  <Card key={tech.name} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                    <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {tech.icon}
                      </div>
                      <h4 className="font-bold text-lg text-gray-900 mb-1">{tech.name}</h4>
                      <p className="text-sm text-gray-600">{tech.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
