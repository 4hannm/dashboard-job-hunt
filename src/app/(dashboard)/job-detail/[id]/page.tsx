import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import Applicants from "@/components/organisms/Applicants";
import JobDetail from "@/components/organisms/JobDetail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "../../../../../lib/prisma";

export const revalidate = 0;

async function getDetailJob(id: string) {
  return prisma.job.findFirst({
    where: { id },
    include: {
      applicant: { include: { user: true } },
      CategoryJob: true,
    },
  });
}

export default async function JobDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const job = await getDetailJob(params.id);
  const parsedJob = job && {
    ...job,
    benefits: Array.isArray(job.benefits)
      ? (job.benefits as Array<{ benefit: string; description: string }>)
      : [],
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-10">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-5">
        <Link href="/job-listings" className="w-fit">
          <ArrowLeftIcon className="w-8 h-8 sm:w-9 sm:h-9" />
        </Link>
        <div>
          <div className="text-xl sm:text-2xl font-semibold mb-1">{job?.roles}</div>
          <div className="text-sm sm:text-base text-gray-600">
            {job?.CategoryJob?.name} · {job?.jobType} · {job?.applicants}/{job?.needs} Hired
          </div>
        </div>
      </div>

      <Tabs defaultValue="applicants" className="w-full">
        <TabsList className="mb-6 flex flex-wrap gap-2 sm:gap-4">
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
          <TabsTrigger value="jobDetails">Job Details</TabsTrigger>
        </TabsList>
        <TabsContent value="applicants">
          <Applicants applicants={job?.applicant ?? []} />
        </TabsContent>
        <TabsContent value="jobDetails">
          <JobDetail detail={parsedJob} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
