import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import { Header } from "~/components/header";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

export function GlobalError() {
  const error = useRouteError();

  let title = "Something went wrong";

  let message = "An unexpected error occurred. Please try again.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;

    if (error.status === 404) {
      title = "Page not found";
      message = "The page you are looking for does not exist.";
    } else if (error.data?.message) {
      message = error.data.message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <>
      <Header />
      <section className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
        <Card className="w-full max-w-lg p-8 text-center shadow-lg">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>

          <h1 className="mb-3 text-3xl font-bold text-foreground">{title}</h1>

          <p className="mb-8 text-muted-foreground">{message}</p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go home
              </Link>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => window.location.reload()}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Reload
            </Button>
          </div>
        </Card>
      </section>
    </>
  );
}
