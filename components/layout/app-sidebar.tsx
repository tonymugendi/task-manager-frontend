import { 
  Calendar, 
  Home, 
  Kanban, 
  Users, 
  BarChart3, 
  Settings, 
  User,
  LogOut,
  CheckSquare,
  Archive
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupAction,
  SidebarSeparator,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { BiTask } from 'react-icons/bi'
import { useUser } from '@/hooks/useUser'

// Main navigation items
const mainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    description: "Overview and quick stats"
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: CheckSquare,
    description: "Manage your tasks"
  },
  {
    title: "Boards",
    url: "/boards",
    icon: Kanban,
    description: "Kanban boards"
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
    description: "Schedule and deadlines"
  },
]

// Secondary navigation items
const secondaryItems = [
  {
    title: "Team",
    url: "/team",
    icon: Users,
    description: "Team members"
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    description: "Reports and insights"
  },
  {
    title: "Archive",
    url: "/archive",
    icon: Archive,
    description: "Completed projects"
  },
]

// Sample projects data
const sampleProjects = [
  {
    id: 1,
    name: "Website Redesign",
    color: "bg-blue-500",
    taskCount: 12
  },
  {
    id: 2,
    name: "Mobile App",
    color: "bg-green-500",
    taskCount: 8
  },
  {
    id: 3,
    name: "Marketing Campaign",
    color: "bg-purple-500",
    taskCount: 15
  },
]

export function AppSidebar() {
  const router = useRouter()
  const { user, logout } = useUser()

  const isActive = (url: string) => {
    return router.pathname === url
  }

  return (
    <Sidebar className="border-r border-gray-200">
      {/* Header with Logo and User */}
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <BiTask className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Task Manager</h2>
            <p className="text-xs text-gray-500">Pro</p>
          </div>
        </div>
        
        {/* User Profile */}
        {user && (
          <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.email || 'user@example.com'}
              </p>
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-2">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`w-full justify-start px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.url) 
                        ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Link href={item.url} className="flex items-center gap-3 w-full">
                      <item.icon className={`w-4 h-4 ${
                        isActive(item.url) ? 'text-indigo-600' : 'text-gray-500'
                      }`} />
                      <div className="flex-1">
                        <span className="text-sm font-medium">{item.title}</span>
                        <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-2">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`w-full justify-start px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.url) 
                        ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Link href={item.url} className="flex items-center gap-3 w-full">
                      <item.icon className={`w-4 h-4 ${
                        isActive(item.url) ? 'text-indigo-600' : 'text-gray-500'
                      }`} />
                      <div className="flex-1">
                        <span className="text-sm font-medium">{item.title}</span>
                        <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        {/* Projects Section */}
        <SidebarGroup>
          <div className="flex items-center justify-between px-2 py-2">
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Projects
            </SidebarGroupLabel>
            <SidebarGroupAction title="Add Project">
              {/* <Button 
                size="sm" 
                variant="ghost" 
                className="w-6 h-6 p-0 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <Plus className="w-4 h-4" />
                <span className="sr-only">Add Project</span>
              </Button> */}
            </SidebarGroupAction>
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {sampleProjects.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton 
                    asChild 
                    className="w-full justify-start px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                  >
                    <Link href={`/projects/${project.id}`} className="flex items-center gap-3 w-full">
                      <div className={`w-3 h-3 rounded-full ${project.color}`}></div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium truncate">{project.name}</span>
                        <p className="text-xs text-gray-500">{project.taskCount} tasks</p>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with Settings and Logout */}
      <SidebarFooter className="border-t border-gray-200 p-2">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className={`w-full justify-start px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/settings') 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Link href="/settings" className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="w-full justify-start px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              onClick={logout}
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}