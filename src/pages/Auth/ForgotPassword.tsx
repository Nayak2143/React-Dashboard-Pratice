import { ForgotPasswordForm } from "@/components/Auth/ForgotPasswordForm"
export default function ForgotPassword() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-md">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}