import { LoginForm } from "@/components/Auth/login-form"
export default function Login() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  )
}