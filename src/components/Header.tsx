import {
  BackpackIcon,
  CodeSandboxLogoIcon,
  GlobeIcon,
  LayersIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { CircleUser, Link, LogOut, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { logout } from "../services/auth";

export default function Header() {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-primary text-white"
      : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <NavLink
              to="/voters"
              className="flex items-center gap-2 font-semibold text-lg"
            >
              <Link className="h-5 w-5" />
              <span className="">Freethinkers</span>
            </NavLink>
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
          <div className="mt-auto">
            <Button
              size="sm"
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2 bg-primary text-white text-base"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4" />
              LogOut
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        {/* <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form> */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
