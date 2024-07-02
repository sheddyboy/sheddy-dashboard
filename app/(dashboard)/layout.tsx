import Nav from "@/components/Nav";
import PageNav from "@/components/PageNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayoutProps({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-y-clip">
      <Nav />
      <div className="flex flex-1 flex-col">
        <PageNav />
        {children}
      </div>
    </div>
  );
}
