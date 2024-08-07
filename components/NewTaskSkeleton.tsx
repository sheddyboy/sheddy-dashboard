import { Card, CardContent } from "@/components//ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface NewTaskSkeletonProps {}

export default function NewTaskSkeleton({}: NewTaskSkeletonProps) {
  return (
    <Card className="sticky top-0 h-full flex-1">
      <CardContent className="flex h-full flex-col p-0">
        <div className="flex flex-1 flex-col gap-5 overflow-auto p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-[4px] w-6" />
          </div>
          <div className="flex flex-1 flex-col gap-4 overflow-hidden">
            <div className="flex-1 overflow-auto">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex flex-1 flex-col gap-1">
                  <Skeleton className="h-[60px] w-full" />
                </div>
              </div>
              <div className="mb-5 flex flex-col gap-3">
                <div className="flex items-center gap-5">
                  <Skeleton className="h-[18px] w-14" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-[100px]" />
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <Skeleton className="h-[18px] w-14" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-[100px]" />
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <Skeleton className="h-[18px] w-14" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-[100px]" />
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <Skeleton className="h-[18px] w-14" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-[100px]" />
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <Skeleton className="h-[18px] w-14" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-[100px]" />
                  </div>
                </div>
                <Skeleton className="h-[85px] w-full" />
              </div>

              <div className="mb-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-[18px] w-[70px]" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
                <div className="flex items-center gap-2 overflow-auto">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-[70px] w-[70px] rounded-[8px]"
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-[18px] w-[70px]" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
                <div className="flex max-h-40 flex-col overflow-auto">
                  {Array.from({ length: 4 }).map((_, index, array) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 border-b ${array.length === index + 1 ? "border-b-transparent" : "border-b-[#F1F2F4]"} py-2.5`}
                    >
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-[20px] w-[70%]" />
                      <Skeleton className="h-5 w-5 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-auto flex max-h-48 flex-col gap-4">
              <div className="flex flex-1 flex-col gap-2.5 overflow-hidden">
                <Skeleton className="h-[18px] w-[70px]" />

                <div className="flex flex-1 flex-col gap-4 overflow-auto">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <div className="flex flex-col gap-1">
                        <Skeleton className="h-[18px] w-[40%]" />
                        <Skeleton className="h-[18px] w-[80%]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Skeleton className="h-[50px] w-full rounded-[8px]" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
