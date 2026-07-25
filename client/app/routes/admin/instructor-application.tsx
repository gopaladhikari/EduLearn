import {
  Link,
  useLoaderData,
  useNavigation,
  type MetaArgs,
} from "react-router";
import type { LoaderFunction, ActionFunction } from "react-router";
import { api } from "~/lib/axios";
import { handleActionError } from "~/lib/utils";
import type { InstructorApplication } from "../../../types/instructor-application.t";
import type { ApiError, ApiSuccess } from "../../../types/axios.t";
import { Button } from "~/components/ui/button";
import { ArrowLeft, CheckCircle, Clock, XCircle } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { ApplicationInfoCards } from "./components/application-infor-card";
import { ReviewSidebar } from "./components/review-sidebar";
import { ModerationSidebar } from "./components/moderation-sidebar";
import { RejectedSidebar } from "./components/rejected-sidebar";

interface Result {
  instructorApplication: InstructorApplication;
}

export const clientAction: ActionFunction = async ({ request, params }) => {
  const formdata = await request.formData();

  const { applicationId } = params;

  try {
    const { data } = await api.patch(
      `/api/v1/instructor-application/${applicationId}`,
      Object.fromEntries(formdata)
    );

    return data;
  } catch (error) {
    return handleActionError(error);
  }
};

export const clientLoader: LoaderFunction = async ({ params }) => {
  const { applicationId } = params;

  try {
    const { data } = await api.get<Result>(
      `/api/v1/instructor-application/${applicationId}`
    );

    return data;
  } catch (error) {
    return handleActionError(error);
  }
};

export function meta({ loaderData }: MetaArgs) {
  const instructorApplication = (loaderData as ApiSuccess<Result>)?.data
    ?.instructorApplication;

  return [
    {
      title: instructorApplication?.user?.username
        ? `${instructorApplication.user.username} - Instructor Application`
        : "Instructor Application",
    },
    {
      name: "description",
      content: "View and manage individual instructor applications.",
    },
  ];
}

export default function InstructorApplicationPage() {
  const response = useLoaderData<ApiSuccess<Result> | ApiError>();
  const navigator = useNavigation();
  const isSubmitting = navigator.state === "submitting";

  if (!response.success) {
    return (
      <div className="p-10 text-center text-destructive">
        {response.message}
      </div>
    );
  }

  const application = response.data.instructorApplication;
  const status = application.status || "pending";

  return (
    <div>
      <Link to="/admin/instructor-applications">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Applications
        </Button>
      </Link>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-2 flex items-center gap-4">
            <h1 className="text-4xl font-bold">Application Details</h1>

            {status === "pending" && (
              <Badge className="bg-yellow-500/20 text-yellow-700">
                <Clock className="mr-1 h-3 w-3" /> Pending Review
              </Badge>
            )}
            {status === "accepted" && (
              <Badge className="bg-green-500 hover:bg-green-600">
                <CheckCircle className="mr-1 h-3 w-3" /> Accepted
              </Badge>
            )}
            {status === "rejected" && (
              <Badge variant="destructive">
                <XCircle className="mr-1 h-3 w-3" /> Rejected
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column Component */}
        <ApplicationInfoCards application={application} />

        {/* Right Column Component (Changes based on status) */}
        <div>
          {status === "pending" && (
            <ReviewSidebar isSubmitting={isSubmitting} />
          )}
          {status === "accepted" && (
            <ModerationSidebar
              userId={application.user._id}
              isSubmitting={isSubmitting}
            />
          )}
          {status === "rejected" && (
            <RejectedSidebar reason={application.rejectionReason} />
          )}
        </div>
      </div>
    </div>
  );
}
