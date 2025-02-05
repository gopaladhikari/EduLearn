import { MaxWithWrapper } from "./MaxWidthWrapper";
import { Link } from "react-router";
import { Logo } from "./Logo";
import { Input } from "../ui/input";

export function Footer() {
  return (
    <footer className="bg-secondary mt-8 py-12">
      <MaxWithWrapper>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Logo />
            <p className="text-gray-400">
              Empowering individuals through quality online education.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Development
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Design
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Marketing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Subscribe</h3>
            <p className="mb-4 text-gray-400">
              Get the latest updates and offers.
            </p>
            <div className="flex">
              <Input type="email" placeholder="Enter your email" />
              <button className="rounded-r-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p>&copy; 2024 EduLearn. All rights reserved.</p>
        </div>
      </MaxWithWrapper>
    </footer>
  );
}
