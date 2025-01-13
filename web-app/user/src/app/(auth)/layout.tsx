import { MaxWithWrapper } from "@/components/partials/MaxWithWrapper";
import Image from "next/image";
import Link from "next/link";

export default function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MaxWithWrapper as="section">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="md:order-2">
            <div className="space-y-6 md:max-w-screen-sm">
              {children}
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms-and-condition"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service&nbsp;
                </Link>
                and&nbsp;
                <Link
                  href="/privacy-policy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
          <figure className="md:order-1">
            <Image
              src="/auth-banner.jpeg"
              alt="picture of students, studying in a classroom"
              height={544}
              width={544}
              className="rounded-md"
              priority
            />
            <figcaption className="sr-only">
              Autentication Banner
            </figcaption>
          </figure>
        </div>
      </MaxWithWrapper>
    </div>
  );
}
