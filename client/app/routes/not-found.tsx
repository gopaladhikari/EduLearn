import { Link } from "react-router";
import { ArrowLeft, GraduationCap, Home, SearchX } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Header } from "~/components/header";

export function meta() {
  return [
    { title: "Page Not Found - Edulearn" },
    {
      name: "description",
      content: "The page you are looking for does not exist.",
    },
  ];
}

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16 text-foreground">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,var(--primary)_0,transparent_28%),radial-gradient(circle_at_bottom_right,var(--chart-2)_0,transparent_28%)] opacity-15" />

        <div className="absolute top-20 left-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
        <div className="absolute right-10 bottom-20 h-32 w-32 rounded-full bg-chart-2/10 blur-3xl" />

        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 text-center">
          {/* Icon card */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />

            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-border bg-card shadow-xl">
              <SearchX className="h-11 w-11 text-primary" />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-5">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
              <GraduationCap className="h-4 w-4" />
              <span>Oops! Lesson not found</span>
            </div>

            <h1 className="text-8xl font-black tracking-tighter text-foreground sm:text-9xl">
              404
            </h1>

            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
              This page skipped class.
            </h2>

            <p className="mx-auto max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              The page you are looking for may have been moved, deleted, or
              never existed. Let&apos;s get you back to learning.
            </p>
          </div>

          {/* Action card */}
          <Card className="w-full max-w-xl border-border/70 bg-card/80 p-4 shadow-lg backdrop-blur sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/">
                  <Home className="h-4 w-4" />
                  Go home
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/courses">Browse courses</Link>
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="lg"
                className="gap-2"
                onClick={() => history.back()}
              >
                <ArrowLeft className="h-4 w-4" />
                Go back
              </Button>
            </div>
          </Card>

          {/* Small hint */}
          <p className="text-sm text-muted-foreground">
            Error code: <span className="font-medium text-foreground">404</span>
          </p>
        </section>
      </main>
    </>
  );
}
