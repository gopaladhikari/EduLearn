import { Header } from "./Header";
import { MaxWithWrapper } from "./MaxWithWrapper";

export function ErrorPage() {
  return (
    <>
      <Header />
      <main>
        <MaxWithWrapper as="section">
          <div className="mx-auto mt-32 max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl font-extrabold tracking-tight lg:text-8xl">
              500
            </h1>
            <p className="mb-4 text-3xl font-bold tracking-tight">
              Something went wrong
            </p>
            <p>Sorry, something went wrong. Please try again later.</p>
          </div>
        </MaxWithWrapper>
      </main>
    </>
  );
}
