import { Header } from "@/components/partials/Header";
import { MaxWithWrapper } from "@/components/partials/MaxWithWrapper";
import { Button } from "@/components/ui/button";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import {
  CheckIcon,
  CreditCard,
  Database,
  Layers2Icon,
  MailIcon,
  SearchIcon,
  User2Icon,
} from "lucide-react";

export const Route = createLazyFileRoute("/(unprotected)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <MaxWithWrapper className="space-y-5">
        <div className="relative flex min-h-[70vh] flex-col items-center justify-center pb-12 pt-12 md:pt-0">
          <div className="relative isolate overflow-hidden bg-background">
            <div className="mx-auto flex w-full max-w-7xl justify-start px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-36">
              <div className="mx-auto max-w-7xl justify-start lg:max-w-3xl lg:pt-8">
                <h1 className="wrap-balance mt-6 bg-black bg-gradient-to-br bg-clip-text text-center text-4xl font-medium leading-tight tracking-tight text-transparent dark:from-white dark:to-[hsla(0,0%,100%,.5)] sm:text-6xl sm:leading-[1.15]">
                  <h1>Welcome to E-learning</h1>
                </h1>
                <p className="wrap-balance mt-6 text-center text-lg font-light leading-7 text-gray-700 dark:text-gray-400">
                  Start, switch, or advance your career with more than
                  7,000 courses, Professional Certificates, and degrees
                  from world-class universities and companies.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link to="/register">
                    <Button size="lg" className="px-16">
                      Get started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="wrap-balance mt-16 bg-black bg-gradient-to-br bg-clip-text text-left text-4xl font-medium tracking-tight text-transparent dark:from-white dark:to-[hsla(0,0%,100%,.5)] sm:text-5xl sm:leading-snug">
              All your features in one place
            </h1>
            <p className="wrap-balance mt-6 text-left text-base font-light leading-7 text-gray-700 dark:text-gray-400 lg:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
              aliquid voluptas saepe maxime asperiores totam fuga assumenda
              iure repudiandae. Ab, ipsum vitae!
            </p>
          </div>

          <div className="mt-16 grid gap-x-10 gap-y-20 sm:grid-cols-2 md:grid-cols-3">
            <div className="relative w-full rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-[7px] bg-gray-200 bg-gradient-to-br p-px dark:from-green-600 dark:to-green-300">
                <div className="flex h-full w-full items-center justify-center rounded-md dark:bg-black">
                  <User2Icon className="text-gray-800 dark:text-green-200" />
                </div>
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-700 dark:text-gray-300">
                Lorem ipsum dolor sit amet.
              </h3>
              <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-400">
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 1</div>
                </div>
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 2</div>
                </div>
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 3</div>
                </div>
              </div>
            </div>
            <div className="relative w-full rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-[7px] bg-gray-200 bg-gradient-to-br p-px dark:from-purple-600 dark:to-purple-300">
                <div className="flex h-full w-full items-center justify-center rounded-md dark:bg-black">
                  <CreditCard className="text-gray-600 dark:text-purple-200" />
                </div>
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-700 dark:text-gray-300">
                Second Feature
              </h3>
              <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-400">
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 1</div>
                </div>
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 2</div>
                </div>
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 3</div>
                </div>
              </div>
            </div>
            <div className="relative w-full rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-[7px] bg-gray-200 bg-gradient-to-br p-px dark:from-cyan-600 dark:to-cyan-300">
                <div className="flex h-full w-full items-center justify-center rounded-md dark:bg-black">
                  <MailIcon className="text-gray-600 dark:text-cyan-200" />
                </div>
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-700 dark:text-gray-300">
                Third Feature
              </h3>
              <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-400">
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 1</div>
                </div>
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 2</div>
                </div>
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 3</div>
                </div>
              </div>
            </div>
            <div className="relative w-full rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-[7px] bg-gray-200 bg-gradient-to-br p-px dark:from-cyan-600 dark:to-cyan-300">
                <div className="flex h-full w-full items-center justify-center rounded-md dark:bg-black">
                  <Database className="text-gray-600 dark:text-cyan-200" />
                </div>
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-700 dark:text-gray-300">
                Fourth Feature
              </h3>
              <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-400">
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 1</div>
                </div>
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 2</div>
                </div>
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 3</div>
                </div>
              </div>
            </div>
            <div className="relative w-full rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-[7px] bg-gray-200 bg-gradient-to-br p-px dark:from-fuchsia-600 dark:to-fuchsia-300">
                <div className="flex h-full w-full items-center justify-center rounded-md dark:bg-black">
                  <SearchIcon className="text-gray-600 dark:text-fuchsia-200" />
                </div>
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-700 dark:text-gray-300">
                Fifth Feature
              </h3>
              <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-400">
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 1</div>
                </div>
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 2</div>
                </div>
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 3</div>
                </div>
              </div>
            </div>
            <div className="relative w-full rounded-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-[7px] bg-gray-200 bg-gradient-to-br p-px dark:from-red-600 dark:to-red-300">
                <div className="flex h-full w-full items-center justify-center rounded-md dark:bg-black">
                  <Layers2Icon className="text-gray-600 dark:text-red-200" />
                </div>
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-700 dark:text-gray-300">
                Sixth Feature
              </h3>
              <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-400">
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 1</div>
                </div>
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 2</div>
                </div>
                <div className="flex space-x-2">
                  <CheckIcon />
                  <div>Example 3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <FeatureWithImage
          features={loginFeatures}
          title="Make your life easier"
          darkFeatureImage="/login-dark.jpeg"
          lightFeatureImage="/login-light.jpeg"
        /> */}
      </MaxWithWrapper>
    </>
  );
}
