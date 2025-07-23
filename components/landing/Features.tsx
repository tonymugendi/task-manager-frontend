import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Features() {
  const features = [
    { 
      title: "Task Management", 
      desc: "Create, edit, and organize tasks with intuitive drag-and-drop functionality and real-time updates.",
      icon: "📝",
      category: "Core Features",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      title: "Smart Prioritization", 
      desc: "AI-powered priority suggestions with customizable due dates and automated deadline reminders.",
      icon: "🎯",
      category: "Core Features",
      color: "from-purple-500 to-pink-500"
    },
    { 
      title: "Real-time Collaboration", 
      desc: "Share projects with team members and track progress with live updates and notifications.",
      icon: "👥",
      category: "Core Features",
      color: "from-green-500 to-emerald-500"
    },
    { 
      title: "Advanced Analytics", 
      desc: "Comprehensive dashboard with productivity insights, completion rates, and performance metrics.",
      icon: "📊",
      category: "Analytics",
      color: "from-orange-500 to-red-500"
    },
    { 
      title: "Secure Authentication", 
      desc: "JWT-based auth with role-based access control, OAuth integration, and enterprise security.",
      icon: "🔒",
      category: "Security",
      color: "from-indigo-500 to-purple-500"
    },
    { 
      title: "Mobile-First Design", 
      desc: "Responsive PWA with offline support, touch gestures, and native app-like experience.",
      icon: "📱",
      category: "User Experience",
      color: "from-teal-500 to-blue-500"
    },
    { 
      title: "API-First Architecture", 
      desc: "RESTful API with comprehensive documentation, rate limiting, and third-party integrations.",
      icon: "🔌",
      category: "Technical",
      color: "from-yellow-500 to-orange-500"
    },
    { 
      title: "Performance Optimized", 
      desc: "Sub-2s load times, lazy loading, code splitting, and 98+ Lighthouse performance score.",
      icon: "⚡",
      category: "Technical",
      color: "from-pink-500 to-rose-500"
    },
    { 
      title: "Developer Experience", 
      desc: "100% TypeScript, comprehensive testing, CI/CD pipeline, and modern development workflow.",
      icon: "💻",
      category: "Technical",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <section className="px-4 py-20 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-indigo-600 bg-clip-text text-transparent">
          Powerful Features
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Built with modern technologies and best practices for optimal performance and user experience
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={feature.title} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            
            {/* Category Badge */}
            <div className="absolute top-4 right-4">
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                {feature.category}
              </span>
            </div>
            
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {feature.icon}
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              
              {/* Hover Effect Arrow */}
              <div className="mt-4 flex items-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                <span className="text-sm font-medium">Learn more</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
