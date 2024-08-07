import Image from "next/image";

interface ActivityCardProps {
  isLastElement?: boolean;
}

export default function ActivityCard({
  isLastElement = false,
}: ActivityCardProps) {
  return (
    <div
      className={`flex flex-col gap-[16px] border-b py-[16px] ${isLastElement ? "border-b-transparent" : "border-b-[#F1F2F4]"}`}
    >
      <div className="flex flex-col">
        <span className="text-sm">SWYFT • Yesterday at 09.30am</span>
        <span className="text-md font-semibold">
          F&B Landing Page V2 Work Area
        </span>
      </div>
      <div className="flex items-center gap-[8px]">
        <Image alt="" src="/activity-icon.png" width={24} height={24} />
        <span className="font-medium text-text-40">
          <span className="font-bold">Omnicreativora</span> changed due date 
          <span className="font-semibold text-blue-40">Sep 20 – 21.</span>
        </span>
      </div>
      <div className="flex rounded-[8px] bg-orange-10 px-[24px] py-[16px]">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.0858 3.58579C19.7107 3.21071 19.202 3 18.6716 3H9C8.20435 3 7.44129 3.31607 6.87868 3.87868C6.31607 4.44129 6 5.20435 6 6V30C6 30.7957 6.31607 31.5587 6.87868 32.1213C7.44129 32.6839 8.20435 33 9 33H27C27.7956 33 28.5587 32.6839 29.1213 32.1213C29.6839 31.5587 30 30.7957 30 30V14.3284C30 13.798 29.7893 13.2893 29.4142 12.9142L20.0858 3.58579Z"
            fill="#F18524"
          />
          <path d="M14 14L23 19L14 24V14Z" fill="white" />
        </svg>
        <div className="flex flex-col gap-[6px]">
          <span className="text-md font-bold">Client Meeting.mp4</span>
          <span className="text-sm font-medium text-text-60">
            Video FIle • 10.5 MB
          </span>
        </div>
      </div>
    </div>
  );
}
