import {
  BackpackIcon,
  CodeSandboxLogoIcon,
  GlobeIcon,
  LayersIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Link, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "../components/ui/button";
import { logout } from "../services/auth";

export default function VerticalNavigation() {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-primary text-white"
      : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";

  return (
    <div className="h-screen hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <NavLink
            to="/"
            className="flex items-center gap-2 font-semibold text-lg"
          >
            <Link className="h-6 w-6" />
            <span className="">Freethinkers</span>
          </NavLink>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-base font-medium lg:px-4 space-y-2">
            {/* <NavLink to="/" className={getNavLinkClass}>
              <Home className="h-4 w-4" />
              Dashboard
            </NavLink> */}
            <NavLink to="/voters" className={getNavLinkClass}>
              <PersonIcon className="h-4 w-4" />
              Voters
            </NavLink>
            <NavLink to="/elections" className={getNavLinkClass}>
              <LayersIcon className="h-4 w-4" />
              Elections
            </NavLink>
            <NavLink to="/election-parties" className={getNavLinkClass}>
              <BackpackIcon className="h-4 w-4" />
              Election Parties
            </NavLink>
            <NavLink to="/electorate-districts" className={getNavLinkClass}>
              <GlobeIcon className="h-4 w-4" />
              Electoral Districts
            </NavLink>
            <NavLink to="/nodes" className={getNavLinkClass}>
              <CodeSandboxLogoIcon className="h-4 w-4" />
              Nodes
            </NavLink>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button
            size="sm"
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2 bg-primary text-white text-base"
            onClick={() => logout()}
          >
            <LogOut className="h-4 w-4" />
            LogOut
          </Button>
        </div>
      </div>
    </div>
  );
}
