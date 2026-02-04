import { GalleryVerticalEnd, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const { userLogin } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await userLogin({
        email: data.email,
        password: data.password,
      });

      navigate("/");
      toast.success(res.data.message || "Login successfully");
    } catch (error: any) {
      console.log(error.response?.data?.message);
      alert(error.response?.data?.message || "Login failed");
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* LOGO + TITLE */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <GalleryVerticalEnd className="h-6 w-6" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>

          <p className="text-sm text-muted-foreground">
            Login to your admin dashboard
          </p>
        </div>

        {/* EMAIL */}
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
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

          {/* PASSWORD */}
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel>Password</FieldLabel>

              <Link
                to="/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-11 pr-10"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </Field>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="h-11 w-full text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>

          {/* DIVIDER */}
          <FieldSeparator>
            <span className="bg-background px-2">OR</span>
          </FieldSeparator>
        </FieldGroup>
      </form>

      {/* FOOTER */}
      <p className="mt-6 text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <a href="#" className="underline underline-offset-4">
          Terms
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
