import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview-lms";

import { VideoPlayer } from "./_components/video-player";
import { CourseProgressButton } from "./_components/course-progress-button";

const ChapterIdPage = async ({
  params
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const { userId } = auth();
  
  if (!userId) {
    return redirect("/");
  } 

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/")
  }

  const completeOnEnd = !userProgress?.isCompleted;

  return (
		<div className="overflow-hidden">
			{userProgress?.isCompleted && (
				<Banner
					variant="success"
					label="You already completed this chapter."
				/>
			)}
			<div className="flex flex-col max-w-4xl mx-auto pb-20">
				{muxData?.playbackId ? (
					<div className="p-4">
						<VideoPlayer
							chapterId={params.chapterId}
							title={chapter.title}
							courseId={params.courseId}
							nextChapterId={nextChapter?.id}
							playbackId={muxData.playbackId}
							completeOnEnd={completeOnEnd}
							videoUrl={chapter.videoUrl}
						/>
					</div>
				) : (
					<div className="p-4">
						<h2 className="text-3xl font-bold mb-2 py-0 px-3.5">
							{chapter.title}
						</h2>
						<div>
							<Preview value={chapter.description!} />
						</div>
					</div>
				)}
				<div className="p-4 flex flex-col md:flex-row-reverse	items-center justify-between">
					<CourseProgressButton
						chapterId={params.chapterId}
						courseId={params.courseId}
						nextChapterId={nextChapter?.id}
						isCompleted={!!userProgress?.isCompleted}
					/>
				</div>
			</div>
		</div>
  );
}

export default ChapterIdPage;
