import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, FormProvider } from "react-hook-form";
import PointListEditor from "./components/BlogEditor/PointListEditor";
import { ImageUploadDemo } from "./components/ImageUpload/ImageUploadDemo";

type BlogFormValues = {
  title: string;
  subtitle: string;
  slug: string;
  content: string;
  extraContent: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage?: File | null;
  altText: string;
};

export default function AddNewBlog() {
  const methods = useForm<BlogFormValues>({
    defaultValues: {
      title: "",
      subtitle: "",
      slug: "",
      content: "",
      extraContent: "",
      metaTitle: "",
      metaDescription: "",
      featuredImage: null,
      altText: "",
    },
  });

  const { handleSubmit, register, setValue } = methods;

  const onSubmit = (data: BlogFormValues) => {
    console.log("FORM DATA 👉", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Header */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Add Blog</h1>

          <div className="flex gap-2">
            <Button type="submit" variant="outline">
              Save Draft
            </Button>
            <Button type="submit">Publish</Button>
          </div>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* BASIC */}
            <div className="rounded-xl border p-6 space-y-4 bg-card">
              <Label>Title</Label>
              <Input {...register("title")} />

              <Label>Subtitle</Label>
              <Input {...register("subtitle")} />

              <Label>Slug</Label>
              <Input {...register("slug")} />
            </div>

            {/* CONTENT */}
            <div className="rounded-xl border p-6 space-y-4 bg-card">
              <Textarea rows={8} {...register("content")}/>
              <Textarea rows={5} {...register("extraContent")} />
            </div>

            <PointListEditor />

            {/* SEO */}
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
                onImageSelect={(file: any) => setValue("featuredImage", file)}
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
