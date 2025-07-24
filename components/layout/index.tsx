import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { TopMenuBar } from "@/components/layout/top-menu-bar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-full">
        <div className="flex bg-gray-50 justify-between items-center">
          <SidebarTrigger className="size-8"/>
          <TopMenuBar />
        </div>

        <div className="p-4 md:p-6 w-full h-full overflow-y-auto">{children}</div>
      </main>
    </SidebarProvider>
  )
}