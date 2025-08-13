import React from 'react'
import withAuth from '@/components/auth/withAuth'
import { 
  CheckSquare, 
  Users, 
  Calendar, 
  TrendingUp, 
  AlertCircle, 
  Target,
  Clock,
  Award
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Static data for demonstration
const dashboardMetrics = {
  totalTasks: {
    value: 127,
    change: '+12%',
    trend: 'up' as const,
    description: 'Total tasks across all boards'
  },
  activeTasks: {
    value: 34,
    change: '+8%',
    trend: 'up' as const,
    description: 'Tasks in progress'
  },
  completedTasks: {
    value: 89,
    change: '+15%',
    trend: 'up' as const,
    description: 'Completed this month'
  },
  teamMembers: {
    value: 8,
    change: '+2',
    trend: 'up' as const,
    description: 'Active team members'
  },
  completionRate: {
    value: 87,
    change: '+5%',
    trend: 'up' as const,
    description: 'Overall completion rate'
  },
  overdueItems: {
    value: 4,
    change: '-2',
    trend: 'down' as const,
    description: 'Overdue tasks'
  }
}

interface MetricCardProps {
  title: string;
  value: number;
  change: string;
  trend: 'up' | 'down';
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: 'indigo' | 'green' | 'blue' | 'purple' | 'orange' | 'red';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  trend, 
  description, 
  icon: Icon, 
  color = 'indigo' 
}) => {
  const colorClasses: Record<string, string> = {
    indigo: 'bg-indigo-500 text-white',
    green: 'bg-green-500 text-white',
    blue: 'bg-blue-500 text-white',
    purple: 'bg-purple-500 text-white',
    orange: 'bg-orange-500 text-white',
    red: 'bg-red-500 text-white'
  }

  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600'
  const trendIcon = trend === 'up' ? '↗️' : '↘️'

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <div className="text-2xl font-bold text-gray-900">
            {typeof value === 'number' && value > 100 ? value.toLocaleString() : value}
            {title.includes('Rate') && '%'}
          </div>
          <span className={`text-sm font-medium ${trendColor} flex items-center`}>
            {trendIcon} {change}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

const Dashboard = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <div className="p-4 md:p-6 lg:p-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your projects today, {currentDate}
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-gray-500">Current Time</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Target className="h-5 w-5 mr-2 text-indigo-600" />
            Key Metrics Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <MetricCard
              title="Total Tasks"
              value={dashboardMetrics.totalTasks.value}
              change={dashboardMetrics.totalTasks.change}
              trend={dashboardMetrics.totalTasks.trend}
              description={dashboardMetrics.totalTasks.description}
              icon={CheckSquare}
              color="indigo"
            />
            
            <MetricCard
              title="Active Tasks"
              value={dashboardMetrics.activeTasks.value}
              change={dashboardMetrics.activeTasks.change}
              trend={dashboardMetrics.activeTasks.trend}
              description={dashboardMetrics.activeTasks.description}
              icon={Clock}
              color="blue"
            />
            
            <MetricCard
              title="Completed"
              value={dashboardMetrics.completedTasks.value}
              change={dashboardMetrics.completedTasks.change}
              trend={dashboardMetrics.completedTasks.trend}
              description={dashboardMetrics.completedTasks.description}
              icon={Award}
              color="green"
            />
            
            <MetricCard
              title="Team Members"
              value={dashboardMetrics.teamMembers.value}
              change={dashboardMetrics.teamMembers.change}
              trend={dashboardMetrics.teamMembers.trend}
              description={dashboardMetrics.teamMembers.description}
              icon={Users}
              color="purple"
            />
            
            <MetricCard
              title="Completion Rate"
              value={dashboardMetrics.completionRate.value}
              change={dashboardMetrics.completionRate.change}
              trend={dashboardMetrics.completionRate.trend}
              description={dashboardMetrics.completionRate.description}
              icon={TrendingUp}
              color="orange"
            />
            
            <MetricCard
              title="Overdue Items"
              value={dashboardMetrics.overdueItems.value}
              change={dashboardMetrics.overdueItems.change}
              trend={dashboardMetrics.overdueItems.trend}
              description={dashboardMetrics.overdueItems.description}
              icon={AlertCircle}
              color="red"
            />
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
            Today's Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-1">12</div>
              <div className="text-sm text-gray-600">Tasks Due Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">8</div>
              <div className="text-sm text-gray-600">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">3</div>
              <div className="text-sm text-gray-600">High Priority</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(Dashboard)