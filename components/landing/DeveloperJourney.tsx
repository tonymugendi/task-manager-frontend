import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DeveloperJourney() {
  const journeySteps = [
    {
      phase: "Planning & Architecture",
      title: "System Design & Database Schema",
      description: "Designed a scalable architecture with proper separation of concerns, RESTful API design, and normalized database schema with optimized relationships.",
      achievements: ["Entity Relationship Modeling", "API Endpoint Planning", "Security Architecture", "Performance Considerations"],
      icon: "📐",
      color: "from-blue-500 to-cyan-500",
      side: "left"
    },
    {
      phase: "Backend Development",
      title: "API & Database Implementation",
      description: "Built a high-performance Node.js/Fastify API with PostgreSQL, implementing JWT authentication, input validation, error handling, and comprehensive testing.",
      achievements: ["RESTful API Design", "Database Optimization", "Authentication & Authorization", "Error Handling & Logging"],
      icon: "⚙️",
      color: "from-green-500 to-emerald-500",
      side: "right"
    },
    {
      phase: "Frontend Development",
      title: "Modern React Application",
      description: "Developed a responsive, accessible frontend using Next.js, TypeScript, and Tailwind CSS with optimized performance and user experience.",
      achievements: ["Component Architecture", "State Management", "Responsive Design", "Performance Optimization"],
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      side: "left"
    },
    {
      phase: "Testing & Quality",
      title: "Comprehensive Testing Strategy",
      description: "Implemented unit tests, integration tests, and end-to-end testing with high code coverage and automated quality checks.",
      achievements: ["Unit Testing (Jest)", "Integration Testing", "Code Coverage >90%", "Automated CI/CD"],
      icon: "🧪",
      color: "from-orange-500 to-red-500",
      side: "right"
    },
    {
      phase: "Deployment & DevOps",
      title: "Production Deployment",
      description: "Deployed using modern DevOps practices with containerization, environment management, and monitoring for optimal performance.",
      achievements: ["Docker Containerization", "Environment Configuration", "Performance Monitoring", "Security Hardening"],
      icon: "🚀",
      color: "from-indigo-500 to-purple-500",
      side: "left"
    }
  ];

  return (
    <section className="px-4 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-indigo-600 bg-clip-text text-transparent">
            Development Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From concept to deployment: the technical challenges solved and architectural decisions made
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
          
          <div className="space-y-12">
            {journeySteps.map((item, index) => (
              <div key={index} className={`relative flex items-center ${item.side === 'left' ? 'justify-start' : 'justify-end'}`}>
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-indigo-500 rounded-full z-10"></div>
                
                {/* Content Card */}
                <div className={`w-5/12 ${item.side === 'left' ? 'pr-8' : 'pl-8'}`}>
                  <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-lg`}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-indigo-600 mb-1">{item.phase}</div>
                          <CardTitle className="text-xl font-bold text-gray-900">{item.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {item.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            <span className="text-gray-700">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
