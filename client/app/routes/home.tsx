import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Link } from "react-router";
import { BookOpen, Clock, Award, Users, Target, Zap } from "lucide-react";
import { Header } from "~/components/header";

export function meta() {
  return [
    { title: "Home - Edulearn" },
    {
      name: "description",
      content:
        "Learn at your own pace with expert instructors and comprehensive learning materials.",
    },
  ];
}

export default function Home() {
  return (
    <>
      <Header />
      <section className="relative bg-linear-to-br from-primary/5 to-accent/5">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            {/* Left Content */}
            <div>
              <h1 className="mb-6 text-5xl leading-tight font-bold text-foreground md:text-6xl">
                Transform Your <span className="text-primary">Learning</span>{" "}
                Journey
              </h1>
              <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
                Access world-class courses designed for students seeking quality
                education. Learn at your own pace with expert instructors and
                comprehensive learning materials.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to="/auth/register">
                  <Button className="w-full bg-primary px-8 py-6 text-lg text-primary-foreground hover:bg-primary/90 sm:w-auto">
                    Get started free
                  </Button>
                </Link>
                <Link to="/contact-us">
                  <Button
                    variant="outline"
                    className="w-full border-primary px-8 py-6 text-lg text-primary hover:bg-primary/5 sm:w-auto"
                  >
                    Learn more
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-col gap-6 sm:flex-row">
                <div>
                  <p className="text-3xl font-bold text-foreground">50K+</p>
                  <p className="text-muted-foreground">Active students</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">500+</p>
                  <p className="text-muted-foreground">Quality courses</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">95%</p>
                  <p className="text-muted-foreground">Satisfaction rate</p>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="hidden items-center justify-center md:flex">
              <div className="relative flex h-96 w-full items-center justify-center rounded-2xl bg-linear-to-br from-primary to-accent opacity-90">
                <div className="text-center text-white">
                  <BookOpen className="mx-auto mb-4 h-24 w-24 opacity-80" />
                  <p className="text-2xl font-semibold">Start Learning Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section>
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
              Why Choose Edulearn?
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Everything you need to succeed in your learning goals
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="border-border p-8 transition-colors hover:border-primary/50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                Expert Instructors
              </h3>
              <p className="text-muted-foreground">
                Learn from industry professionals with years of experience and
                proven teaching methods.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="border-border p-8 transition-colors hover:border-primary/50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                Learn at Your Pace
              </h3>
              <p className="text-muted-foreground">
                Study whenever and wherever you want. No fixed schedules,
                complete flexibility.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="border-border p-8 transition-colors hover:border-primary/50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                Recognized Certificates
              </h3>
              <p className="text-muted-foreground">
                Earn certificates upon completion that are valued by employers
                worldwide.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="border-border p-8 transition-colors hover:border-primary/50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                Community Support
              </h3>
              <p className="text-muted-foreground">
                Connect with other learners, share ideas, and grow together in
                our vibrant community.
              </p>
            </Card>

            {/* Feature 5 */}
            <Card className="border-border p-8 transition-colors hover:border-primary/50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                Personalized Learning
              </h3>
              <p className="text-muted-foreground">
                Get customized recommendations based on your interests and
                learning progress.
              </p>
            </Card>

            {/* Feature 6 */}
            <Card className="border-border p-8 transition-colors hover:border-primary/50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                Interactive Content
              </h3>
              <p className="text-muted-foreground">
                Engage with videos, quizzes, assignments, and real-world
                projects to master skills.
              </p>
            </Card>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-linear-to-r from-primary to-accent">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Ready to Start Learning?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
            Join thousands of students already transforming their careers with
            Edulearn. Start your free trial today.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/auth/register">
              <Button className="w-full bg-white px-8 py-6 text-lg text-primary hover:bg-white/90 sm:w-auto">
                Start free trial
              </Button>
            </Link>
            <Link to="/contact-us">
              <Button className="w-full border border-white/50 bg-white/20 px-8 py-6 text-lg text-white hover:bg-white/30 sm:w-auto">
                Contact us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
