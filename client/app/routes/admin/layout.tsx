import { LogOut } from "lucide-react";
import { Link, Outlet } from "react-router";
import { Button } from "~/components/ui/button";
import { useNavigation } from "~/hooks/use-navigation";

export default function AdminLayout() {
  const navs = useNavigation();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card">
        {/* Logo */}
        <div className="border-b border-border p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">
                E
              </span>
            </div>
            <div>
              <p className="font-bold text-foreground">Edulearn</p>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 p-4">
          {navs.header.map(({ icon: Icon, title, to }) => {
            return (
              <Link key={title} to={to}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-foreground hover:bg-primary/10"
                >
                  {Icon && <Icon className="h-5 w-5" />}
                  {title}
                </Button>
              </Link>
            );
          })}
          {navs.dropdown.map(({ icon: Icon, title, to }) => {
            return (
              <Link key={title} to={to}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-foreground hover:bg-primary/10"
                >
                  {Icon && <Icon className="h-5 w-5" />}
                  {title}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-64 border-t border-border p-4">
          <Button variant="outline" className="w-full justify-start gap-3">
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
