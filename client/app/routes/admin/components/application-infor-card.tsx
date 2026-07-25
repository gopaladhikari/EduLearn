import { Award, Briefcase } from "lucide-react";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import type { InstructorApplication } from "../../../../types/instructor-application.t";

export function ApplicationInfoCards({
  application,
}: {
  application: InstructorApplication;
}) {
  return (
    <div className="space-y-6 lg:col-span-2">
      {/* Personal Information */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Personal Information
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p className="text-lg font-medium text-foreground">
              {application.user.username}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <a
              href={`mailto:${application.user.email}`}
              className="text-primary hover:underline"
            >
              {application.user.email}
            </a>
          </div>
        </div>
      </Card>

      {/* Professional Details */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Professional Details
        </h2>
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">Qualification</p>
            </div>
            <p className="text-foreground">{application.qualification}</p>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">Experience</p>
            </div>
            <p className="text-foreground">
              {application.experienceYears} years
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Expertise Areas
            </p>
            <div className="flex flex-wrap gap-2">
              {application.expertise.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Motivation */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Teaching Motivation
        </h2>
        <p className="leading-relaxed text-foreground">
          {application.motivation}
        </p>
      </Card>

      {/* Social Links */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Social Links
        </h2>
        <div className="space-y-3">
          {application.socialLinks?.website && (
            <div>
              <p className="text-sm text-muted-foreground">Website</p>
              <a
                href={application.socialLinks.website}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                {application.socialLinks.website}
              </a>
            </div>
          )}
          {application.socialLinks?.linkedin && (
            <div>
              <p className="text-sm text-muted-foreground">LinkedIn</p>
              <a
                href={application.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                {application.socialLinks.linkedin}
              </a>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
