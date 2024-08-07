import Spinner from "@/components/Spinner";
interface ProjectSlugLoadingProps {}

export default function ProjectSlugLoading({}: ProjectSlugLoadingProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-[30px]">
      <Spinner />
    </div>
  );
}
