import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, FormProvider } from "react-hook-form";
import { ImageUploadDemo } from "./components/ImageUpload/ImageUploadDemo";
import { api } from "@/Instance/Instance";
import { toast } from "sonner";
import { useState } from "react";

type BlogFormValues = {
  title: string;
  subtitle: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage?: File | null;
  altText: string;
};

export default function AddNewBlog() {
  const [saving, setSaving] = useState(false);

  const methods = useForm<BlogFormValues>({
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      featuredImage: null,
      altText: "",
    },
  });

  const { handleSubmit, register, setValue, reset } = methods;

  /* ---------------- SUBMIT ---------------- */

  const submitBlog = async (
    data: BlogFormValues,
    status: "draft" | "published",
  ) => {
    try {
      setSaving(true);

      const form = new FormData();

      form.append("title", data.title);
      form.append("subtitle", data.subtitle);
      form.append("content", data.content);
      form.append("metaTitle", data.metaTitle);
      form.append("metaDescription", data.metaDescription);
      form.append("altText", data.altText);
      form.append("status", status);

      // ⭐ FILE
      if (data.featuredImage instanceof File) {
        form.append("featuredImage", data.featuredImage);
      }

      /* DEBUG — see what you're sending */
      for (const pair of form.entries()) {
        console.log(pair[0], pair[1]);
      }

      await api.post("/blogs", form); // ❌ don't set content-type manually

      toast.success("Blog created successfully!");
      reset();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to create blog");
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" encType="multipart/form-data">
        {/* HEADER */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Add Blog</h1>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={saving}
              onClick={handleSubmit((d) => submitBlog(d, "draft"))}
            >
              Save Draft
            </Button>

            <Button
              type="button"
              disabled={saving}
              onClick={handleSubmit((d) => submitBlog(d, "published"))}
            >
              Publish
            </Button>
          </div>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border p-6 space-y-4 bg-card">
              <Label>Title</Label>
              <Input {...register("title")} />

              <Label>Subtitle</Label>
              <Input {...register("subtitle")} />
            </div>

            <div className="rounded-xl border p-6 space-y-4 bg-card">
              <Label>Content</Label>
              <Textarea rows={8} {...register("content")} />
            </div>

            <div className="rounded-xl border p-6 space-y-4 bg-card">
              <Label>Meta Title</Label>
              <Input {...register("metaTitle")} />

              <Label>Meta Description</Label>
              <Textarea {...register("metaDescription")} />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <div className="rounded-xl border p-6 space-y-4 bg-card">
              <h3 className="font-semibold">Featured Image</h3>

              <ImageUploadDemo
                onImageSelect={(file) =>
                  setValue("featuredImage", file || null)
                }
              />

              <Label>Alt Text</Label>
              <Input {...register("altText")} />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
