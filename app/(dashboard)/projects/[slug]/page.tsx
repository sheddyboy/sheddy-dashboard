import { redirect } from "next/navigation";

interface ProjectSlugProps {
  params: {
    slug: string;
  };
}

export default function ProjectSlug({ params: { slug } }: ProjectSlugProps) {
  redirect(`/projects/${slug}/list`);
}
