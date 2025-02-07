import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

const config: RouteConfig = [
  index("./pages/homepage.tsx"),
  layout("./layouts/AuthLayout.tsx", [
    route("/login", "./pages/login.tsx"),
    route("/register", "./pages/register.tsx"),
    route("/forgot-password", "./pages/forgot-password.tsx"),
    route("/reset-password", "./pages/reset-password.tsx"),
  ]),
  route("/courses/:slug", "./pages/course-detail.tsx"),
  route("/cart", "./pages/cart.tsx"),
  route("/privacy-policy", "./pages/privacy-policy.tsx"),
  route("/terms-and-conditions", "./pages/terms-and-conditions.tsx"),
  route("/*", "./pages/not-found.tsx"),
];

export default config;
