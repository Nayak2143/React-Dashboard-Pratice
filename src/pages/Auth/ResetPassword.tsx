import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";
export default function ResetPassword() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
