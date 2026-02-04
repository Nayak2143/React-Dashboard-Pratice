import { Lock } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "@/Instance/Instance";

type ResetFormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormValues>();

  const onSubmit = async (data: ResetFormValues) => {
    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    try {
      const res = await api.post(
        "/auth/reset-password",
        {
          token,
          password: data.password,
        },
        { withCredentials: true },
      );

      toast.success(res.data.message || "Password updated");
      reset();

      setTimeout(() => navigate("/login"), 1200);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div
      className={cn(
        "mx-auto w-xl rounded-2xl border bg-card p-8 shadow-lg",
        className,
      )}
      {...props}
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Header */}
          <div className="flex flex-col items-center gap-2 text-center">
            <Lock className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold">Reset Password</h1>
            <FieldDescription>Enter your new password below.</FieldDescription>
          </div>

          {/* Password */}
          <Field>
            <FieldLabel>New Password</FieldLabel>
            <Input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </Field>

          {/* Confirm */}
          <Field>
            <FieldLabel>Confirm Password</FieldLabel>
            <Input
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Confirm password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </Field>

          {/* Submit */}
          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Reset Password"}
          </Button>

          {/* Back */}
          <FieldDescription className="text-center">
            <Link
              to="/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Back to login
            </Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
}
