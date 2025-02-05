import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="border-secondary relative w-full border-t py-24">
        <div className="from-border to-border absolute top-[-1px] right-0 left-0 mx-auto h-px w-48 bg-linear-to-r via-gray-400 opacity-40 md:w-96"></div>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap">
            <div className="flex w-full flex-col sm:w-2/5">
              <Logo />
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-400">
                Rangeli-08, Koshi, Nepal
              </p>
            </div>
            <div className="mt-6 grid grow grid-cols-3 gap-6 sm:mt-0 sm:grid-cols-3 lg:grid-cols-4">
              <div>
                <div>Links</div>
                <div className="mt-4 flex flex-col space-y-4">
                  <a
                    className="text-sm text-gray-700 hover:underline dark:text-gray-400"
                    href="/#"
                  >
                    Media
                  </a>
                  <a
                    className="text-sm text-gray-700 hover:underline dark:text-gray-400"
                    href="/#"
                  >
                    Brand
                  </a>
                  <a
                    className="text-sm text-gray-700 hover:underline dark:text-gray-400"
                    href="/#"
                  >
                    Subscribe
                  </a>
                </div>
              </div>
              <div>
                <div>Links</div>
                <div className="mt-4 flex flex-col space-y-4">
                  <a
                    className="text-sm text-gray-700 hover:underline dark:text-gray-400"
                    href="/#"
                  >
                    Media
                  </a>
                  <a
                    className="text-sm text-gray-700 hover:underline dark:text-gray-400"
                    href="/#"
                  >
                    Brand
                  </a>
                  <a
                    className="text-sm text-gray-700 hover:underline dark:text-gray-400"
                    href="/#"
                  >
                    Subscribe
                  </a>
                </div>
              </div>
              <div>
                <div>Links</div>
                <div className="mt-4 flex flex-col space-y-4">
                  <a
                    className="text-sm text-gray-700 hover:underline dark:text-gray-400"
                    href="/#"
                  >
                    Media
                  </a>
                  <a
                    className="text-sm text-gray-700 hover:underline dark:text-gray-400"
                    href="/#"
                  >
                    Brand
                  </a>
                  <a
                    className="text-sm text-gray-700 hover:underline dark:text-gray-400"
                    href="/#"
                  >
                    Subscribe
                  </a>
                </div>
              </div>
              <div>
                <div>Links</div>
                <div className="mt-4 flex flex-col space-y-4">
                  <a
                    className="text-sm text-gray-700 hover:underline dark:text-gray-400"
                    href="/#"
                  >
                    Media
                  </a>
                  <a
                    className="text-sm text-gray-700 hover:underline dark:text-gray-400"
                    href="/#"
                  >
                    Brand
                  </a>
                  <a
                    className="text-sm text-gray-700 hover:underline dark:text-gray-400"
                    href="/#"
                  >
                    Subscribe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
