import { GalleryVerticalEnd, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { api } from "@/Instance/Instance";
import { toast } from "sonner";

type ForgotFormValues = {
  email: string;
};

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormValues>();

  const onSubmit = async (data: ForgotFormValues) => {
    try {
      const res = await api.post(
        "/auth/forgot-password",
        { email: data.email },
        { withCredentials: true },
      );
      console.log("Forgot password response", res.data);
      toast.success(res.data.message);
      reset();
    } catch (error: any) {
      console.log(error.response?.data?.message);
      alert(error.response?.data?.message);
    }
  };
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-md rounded-2xl border bg-card p-8 shadow-lg",
        className,
      )}
      {...props}
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* HEADER */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <GalleryVerticalEnd className="h-6 w-6" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Forgot Password
          </h1>

          <FieldDescription>
            Enter your email address and we’ll send you a reset link.
          </FieldDescription>
        </div>

        {/* FORM */}
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              className="h-11"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </Field>

          <Button
            type="submit"
            className="h-11 w-full text-base"
            disabled={isSubmitting}
          >
            Send reset link
          </Button>
        </FieldGroup>
      </form>

      {/* FOOTER */}
      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    </div>
  );
}
