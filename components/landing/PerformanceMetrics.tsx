import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PerformanceMetrics() {
  const metrics = [
    { metric: "98", unit: "/100", label: "Lighthouse Score", desc: "Performance", color: "from-green-500 to-emerald-500", icon: "⚡" },
    { metric: "<2", unit: "s", label: "Load Time", desc: "First Contentful Paint", color: "from-blue-500 to-cyan-500", icon: "🚀" },
    { metric: "100", unit: "%", label: "TypeScript", desc: "Type Coverage", color: "from-indigo-500 to-purple-500", icon: "🔷" },
    { metric: "95", unit: "%", label: "Test Coverage", desc: "Code Quality", color: "from-orange-500 to-red-500", icon: "🧪" }
  ];

  const performanceOptimizations = [
    "Code splitting and lazy loading for optimal bundle size",
    "Image optimization with Next.js Image component",
    "Database query optimization with proper indexing",
    "Caching strategies for API responses",
    "Minification and compression for production builds"
  ];

  const securityPractices = [
    "JWT-based authentication with secure token handling",
    "Input validation and sanitization on all endpoints",
    "CORS configuration and security headers",
    "Environment variable management for secrets",
    "Rate limiting and request throttling"
  ];

  return (
    <section className="px-4 py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-indigo-600 bg-clip-text text-transparent">
          Performance & Quality Metrics
        </h2>
        <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
          Optimized for speed, accessibility, and user experience with measurable results
        </p>
        
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {metrics.map((item, index) => (
            <Card key={index} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {item.metric}<span className="text-2xl text-gray-600">{item.unit}</span>
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-1">{item.label}</div>
                <div className="text-sm text-gray-600">{item.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Technical Highlights */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="text-left border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-xl">
                  📈
                </div>
                Performance Optimizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {performanceOptimizations.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-left border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-xl">
                  🛡️
                </div>
                Security & Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityPractices.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
