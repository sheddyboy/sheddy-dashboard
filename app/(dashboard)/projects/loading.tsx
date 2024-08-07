import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectsLoadingProps {}

export default function ProjectsLoading({}: ProjectsLoadingProps) {
  return (
    <div className="grid grid-cols-3 gap-[30px] overflow-auto px-[30px] pt-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <Card key={index}>
          <CardContent className="flex flex-col gap-4 p-4">
            <Skeleton className="aspect-[2] w-full rounded-[10px]" />
            <div className="flex flex-1 flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-[20px] w-[80%]" />
                  <div className="flex w-full items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Skeleton className="min-h-5 min-w-5" />
                      <Skeleton className="h-[18px] w-[50px]" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Skeleton className="min-h-5 min-w-5 rounded-full" />
                      <Skeleton className="h-[18px] w-[50px]" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center -space-x-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-[40px] w-[40px] rounded-full"
                    />
                  ))}
                </div>
              </div>
              <Skeleton className="h-1 w-[50%]" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
