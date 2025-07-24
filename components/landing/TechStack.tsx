import { Card, CardContent } from "@/components/ui/card";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiShadcnui,
  SiNodedotjs, 
  SiFastify, 
  SiPostgresql, 
  SiPrisma,
  SiDocker, 
  SiVercel, 
  SiGithub, 
  SiJest 
} from 'react-icons/si';
import { RiPaintBrushFill } from 'react-icons/ri';
import { MdSettings, MdBuild } from 'react-icons/md';

export default function TechStack() {
  const techCategories = [
    {
      title: "Frontend",
      icon: RiPaintBrushFill,
      iconBg: "from-blue-500 to-cyan-500",
      technologies: [
        { 
          name: "Next.js", 
          desc: "React Framework", 
          color: "from-black to-gray-800", 
          brandColor: "#000000",
          icon: SiNextdotjs 
        },
        { 
          name: "TypeScript", 
          desc: "Type Safety", 
          color: "from-blue-600 to-blue-700", 
          brandColor: "#3178C6",
          icon: SiTypescript 
        },
        { 
          name: "Tailwind CSS", 
          desc: "Utility-First CSS", 
          color: "from-cyan-500 to-blue-500", 
          brandColor: "#06B6D4",
          icon: SiTailwindcss 
        },
        { 
          name: "Shadcn/UI", 
          desc: "Component Library", 
          color: "from-slate-700 to-slate-800", 
          brandColor: "#000000",
          icon: SiShadcnui 
        }
      ]
    },
    {
      title: "Backend & Database",
      icon: MdSettings,
      iconBg: "from-green-500 to-emerald-500",
      technologies: [
        { 
          name: "Node.js", 
          desc: "Runtime Environment", 
          color: "from-green-600 to-green-700", 
          brandColor: "#339933",
          icon: SiNodedotjs 
        },
        { 
          name: "Fastify", 
          desc: "High-Performance Web Framework", 
          color: "from-gray-700 to-gray-800", 
          brandColor: "#000000",
          icon: SiFastify 
        },
        { 
          name: "PostgreSQL", 
          desc: "Database", 
          color: "from-blue-700 to-indigo-700", 
          brandColor: "#4169E1",
          icon: SiPostgresql 
        },
        { 
          name: "Prisma", 
          desc: "ORM", 
          color: "from-indigo-600 to-purple-600", 
          brandColor: "#2D3748",
          icon: SiPrisma 
        }
      ]
    },
    {
      title: "DevOps & Tools",
      icon: MdBuild,
      iconBg: "from-purple-500 to-pink-500",
      technologies: [
        { 
          name: "Docker", 
          desc: "Containerization", 
          color: "from-blue-500 to-blue-600", 
          brandColor: "#2496ED",
          icon: SiDocker 
        },
        { 
          name: "Vercel", 
          desc: "Deployment", 
          color: "from-black to-gray-800", 
          brandColor: "#000000",
          icon: SiVercel 
        },
        { 
          name: "GitHub", 
          desc: "Version Control", 
          color: "from-gray-800 to-black", 
          brandColor: "#181717",
          icon: SiGithub 
        },
        { 
          name: "Jest", 
          desc: "Testing", 
          color: "from-red-600 to-red-700", 
          brandColor: "#C21325",
          icon: SiJest 
        }
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
                  <category.icon className="w-5 h-5" />
                </span>
                {category.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {category.technologies.map((tech) => (
                  <Card key={tech.name} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                    <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                        <tech.icon 
                          className="w-8 h-8" 
                          style={{ color: tech.brandColor }}
                        />
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
