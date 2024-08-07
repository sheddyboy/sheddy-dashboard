import Image from "next/image";
import ProjectSubDetails from "@/components/ProjectSubDetails";

interface OngoingCardProps {
  isLastElement?: boolean;
}

export default function OngoingCard({
  isLastElement = false,
}: OngoingCardProps) {
  return (
    <div
      className={`flex items-center gap-4 border-b py-4 ${isLastElement ? "border-b-transparent" : "border-b-[#F1F2F4]"}`}
    >
      <Image alt="" src="/dummy-project-icon.png" width={84} height={84} />
      {/* <ProjectSubDetails /> */}
    </div>
  );
}
