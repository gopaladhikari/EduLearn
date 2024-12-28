import { createFileRoute, redirect } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { verifyEmailMutation } from '@/lib/mutations/auth.mutation'
import { useMutation } from '@tanstack/react-query'

export const Route = createFileRoute('/_auth/verify-email')({
  component: RouteComponent,

  validateSearch: (search) => {
    const token = search?.token

    return {
      token: String(token) || '',
    }
  },
})

function RouteComponent() {
  const { token } = Route.useSearch()

  const form = useForm({
    defaultValues: {
      email: '',
    },
    onSubmit: ({ value: { email } }) => {
      mutatation.mutate(email)
    },
  })

  const mutatation = useMutation({
    mutationFn: (email: string) => verifyEmailMutation(email, token),
    onSuccess() {
      redirect({
        to: '/login',
      })
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Verify Email</CardTitle>
        <CardDescription>
          Enter your email to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-3" onSubmit={form.handleSubmit}>
          <div className="space-y-3">
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'A first name is required'
                    : value.length < 3
                      ? 'First name must be at least 3 characters'
                      : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  return (
                    value.includes('error') &&
                    'No "error" allowed in first name'
                  )
                },
              }}
              children={(field) => {
                return (
                  <>
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      type="email"
                      onBlur={field.handleBlur}
                      placeholder="Enter your email"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                )
              }}
            />
          </div>
          {mutatation.error && (
            <div className="text-destructive">{mutatation.error.message}</div>
          )}

          <CardFooter>
            <Button type="submit" className="w-full">
              {form.state.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}
