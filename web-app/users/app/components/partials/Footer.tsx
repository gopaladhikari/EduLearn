import { BookOpen } from "lucide-react";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="mt-8 bg-secondary py-12">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">EduLearn</span>
            </div>
            <p className="text-gray-400">
              Empowering individuals through quality online education.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400">
                  Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Business
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Marketing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Subscribe</h3>
            <p className="mb-4 text-gray-400">
              Get the latest updates and offers.
            </p>
            {/* <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-l-lg bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="rounded-r-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Subscribe
              </button>
            </div> */}
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p>&copy; 2024 EduLearn. All rights reserved.</p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
