import Header from "../components/Header";
import VerticalNavigation from "../components/VerticalNavigation";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full h-screen flex flex-row fixed inset-y-0 left-0">
      <div className="md:w-[220px] lg:w-[280px] flex-none">
        <VerticalNavigation />
      </div>
      <div className="grow flex flex-col">
        <div className="flex-none h-[60px]">
          <Header />
        </div>
        <main className="grow p-4 lg:gap-6 lg:p-6 flex flex-1 flex-col gap-4  overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
