import { Calendar } from "lucide-react";
import Image from "next/image";

interface TaskCardProps {
  isLastElement?: boolean;
}

export default function TaskCard({ isLastElement = false }: TaskCardProps) {
  return (
    <div
      className={`flex items-center gap-[16px] border-b ${isLastElement ? "border-b-transparent" : "border-b-[#F1F2F4]"} py-[16px]`}
    >
      {true ? (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.9998 3.66675C22.8105 3.66675 28.3332 9.18808 28.3332 16.0001C28.3332 22.8107 22.8105 28.3334 15.9998 28.3334C9.18784 28.3334 3.6665 22.8107 3.6665 16.0001C3.6665 9.18808 9.18784 3.66675 15.9998 3.66675Z"
            fill="#5FB918"
          />
          <path
            d="M11.2529 16.0002L14.4183 19.1642L20.7463 12.8362"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="32"
          height="33"
          viewBox="0 0 32 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.0003 4.16675C22.811 4.16675 28.3337 9.68808 28.3337 16.5001C28.3337 23.3107 22.811 28.8334 16.0003 28.8334C9.18833 28.8334 3.66699 23.3107 3.66699 16.5001C3.66699 9.68808 9.18833 4.16675 16.0003 4.16675Z"
            stroke="#B3B1BB"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <div className="flex flex-1 justify-between gap-[16px]">
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[4px]">
            <span className="text-sm">Bookum App</span>
            <span className="text-md font-semibold">
              Design feedback on wireframe
            </span>
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="flex items-center gap-[4px]">
              <Calendar className="h-[20px] w-[20px]" />
              <span className="text-sm">31 Sep</span>
            </div>
            <div className="flex items-center gap-[4px]">
              <Calendar className="h-[20px] w-[20px]" />
              <span className="text-sm">5 Objective</span>
            </div>
            <div className="flex items-center gap-[4px]">
              <Calendar className="h-[20px] w-[20px]" />
              <span className="text-sm">2 Attachment</span>
            </div>
            <div className="flex items-center gap-[4px]">
              <Calendar className="h-[20px] w-[20px]" />
              <span className="text-sm">Medium</span>
            </div>
          </div>
        </div>
        {/* images */}
        <div className="flex items-center gap-[16px]">
          <Image
            alt=""
            src="/dummy-image.png"
            width={80}
            height={80}
            className="object-cover object-center"
          />
          <Image
            alt=""
            src="/dummy-image.png"
            width={80}
            height={80}
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
