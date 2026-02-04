import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  imageAlt: string;
  logo?: React.ReactNode;
  title: string;
  location: string;
  overview: string;
  price: number;
  pricePeriod: string;
  onBookNow: () => void;
}

const BlogCard = React.forwardRef<HTMLDivElement, BlogCardProps>(
  (
    {
      className,
      imageUrl,
      imageAlt,
      logo,
      title,
      location,
      overview,
      price,
      pricePeriod,
      onBookNow,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative w-full max-w-sm overflow-hidden rounded-xl border border-border bg-card shadow-lg",
          "transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2",
          className,
        )}
        {...props}
      >
        {/* Background Image with Zoom Effect on Hover */}
        <img
          src={imageUrl}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Content Container */}
        <div className="relative flex h-full flex-col justify-between p-6 text-card-foreground">
          {/* Top Section: Logo */}
          <div className="flex h-40 items-start">
            {logo && (
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/50 bg-black/20 backdrop-blur-sm">
                {logo}
              </div>
            )}
          </div>

          {/* Middle Section: Details (slides up on hover) */}
          <div className="transition-transform duration-500 ease-in-out group-hover:-translate-y-1">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
          </div>
          {/* Eye icon – appears top right on hover */}
          <div className="absolute right-2 top-2 opacity-0 scale-90 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-md shadow-lg cursor-pointer">
              <Eye className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
BlogCard.displayName = "BlogCard";

export { BlogCard };
