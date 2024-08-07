import ProjectNav from "@/components/ProjectNav";

interface KanbanViewProps {
  params: {
    slug: string;
  };
}

export default function KanbanView({ params: { slug } }: KanbanViewProps) {
  return <main>KanbanView</main>;
}
