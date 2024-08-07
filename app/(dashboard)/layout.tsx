import Nav from "@/components/Nav";
import PageNav from "@/components/PageNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayoutProps({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      <Nav />
      <div className="flex h-screen flex-1 flex-col">
        <PageNav />
        {children}
      </div>
    </div>
  );
}
