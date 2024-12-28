import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/_dashboard/dashboard/customers',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/_dashboard/customers"!</div>
}
