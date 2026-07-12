import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  layout("routes/auth/layout.tsx", [
    route("/login", "routes/auth/login.tsx"),
    route("/register", "routes/auth/register.tsx"),
    route("/forgot-password", "routes/auth/forgot-password.tsx"),
    route("/reset-password/:token", "routes/auth/reset-password.tsx"),
    route("/verify-email/:token", "routes/auth/verify-email.tsx"),
  ]),

  layout("routes/user/layout.tsx", [
    route("/logout", "routes/user/logout.tsx"),
    route("/profile", "routes/user/profile.tsx"),
    route("/wishlist", "routes/user/wishlist.tsx"),
    route("/cart", "routes/user/cart.tsx"),
    route("/notifications", "routes/user/notification.tsx"),
    route("/become-instructor", "routes/user/become-instructor.tsx"),
  ]),

  layout("routes/admin/layout.tsx", [
    route("/admin", "routes/admin/dashboard.tsx"),
    route("/admin/notifications", "routes/admin/notifications.tsx"),
    route("/admin/courses", "routes/admin/courses.tsx"),
    route("/admin/users", "routes/admin/users.tsx"),
    route(
      "/admin/instructor-applications",
      "routes/admin/instructor-applications.tsx"
    ),
    route(
      "/admin/instructor-applications/:applicationId",
      "routes/admin/instructor-application.tsx"
    ),
  ]),

  // Public routes

  layout("routes/public/layout.tsx", [
    route("/contact-us", "routes/public/contact-us.tsx"),
    route("/terms-and-conditions", "routes/public/terms-and-conditions.tsx"),
    route("/privacy-policy", "routes/public/privacy-policy.tsx"),
    route("/teaching", "routes/public/teaching.tsx"),
    route("/blogs", "routes/public/blogs.tsx"),
    route("/blogs/:slug", "routes/public/blog-details.tsx"),
    route("/about", "routes/public/about.tsx"),
    route("/cookies", "routes/public/cookies.tsx"),
  ]),

  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
