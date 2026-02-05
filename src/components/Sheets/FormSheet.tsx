import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FormSheetProps {
  title: string;
  description?: string;
  trigger: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  width?: string;
}

export default function FormSheet({
  title,
  description,
  trigger,
  open,
  onOpenChange,
  children,
  width = "w-[400px] sm:w-[500px]",
}: FormSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent side="right" className={width}>
        <SheetHeader className="border-b">
          <SheetTitle>{title}</SheetTitle>
          {description && (
            <SheetDescription>{description}</SheetDescription>
          )}
        </SheetHeader>

        <div className=" px-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
