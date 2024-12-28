import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/_dashboard/dashboard/courses',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/_dashboard/courses"!</div>
}
