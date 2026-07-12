import { Link, useLoaderData, type LoaderFunction } from "react-router";
import { api } from "~/lib/axios";
import { handleActionError } from "~/lib/utils";
import type { InstructorApplication } from "../../../types/instructor-application.t";
import type { ApiError, ApiSuccess } from "../../../types/axios.t";
import { Card, CardContent } from "~/components/ui/card";

import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { ArrowRight, Briefcase, GraduationCap } from "lucide-react";
import { buttonVariants } from "~/components/ui/button";

interface Results {
  instructorApplications: InstructorApplication[];
}

export function meta() {
  return [
    { title: "Instructor Applications - Admin" },
    {
      name: "description",
      content:
        "Manage instructor applications and verify instructor credentials.",
    },
  ];
}

export const clientLoader: LoaderFunction = async () => {
  try {
    const { data } = await api.get("/api/v1/instructor-application");
    return data;
  } catch (error) {
    return handleActionError(error);
  }
};

export default function InstructorApplications() {
  const response = useLoaderData<ApiSuccess<Results> | ApiError>();
  if (!response.success) {
    return (
      <div className="mx-auto mt-10 max-w-7xl">
        <Card>
          <CardContent className="py-10 text-center text-destructive">
            {response.message}
          </CardContent>
        </Card>
      </div>
    );
  }

  const applications = response.data.instructorApplications;

  return (
    <section className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Instructor Applications</h1>

        <p className="text-muted-foreground">
          {applications.length} application
          {applications.length !== 1 && "s"}
        </p>
      </div>

      <div className="grid gap-6">
        {applications.map((application) => (
          <Card key={application._id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex gap-5">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src={application.user.profile?.avatar?.secure_url || ""}
                  />

                  <AvatarFallback>
                    {application.user.username[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2">
                  <h3 className="font-semibold">{application.user.username}</h3>

                  <p className="text-sm text-muted-foreground">
                    {application.user.email}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase size={16} />
                      {application.experienceYears} Years
                    </span>

                    <span className="flex items-center gap-1">
                      <GraduationCap size={16} />
                      {application.qualification}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {application.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-4">
                <Badge>{application.status}</Badge>

                <Link
                  to={`/admin/instructor-applications/${application._id}`}
                  className={buttonVariants()}
                >
                  View
                  <ArrowRight />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
