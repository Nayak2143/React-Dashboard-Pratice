import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";

const routeLabels: Record<string, string> = {
  "/": "Dashboard",
  "/users": "Users",
  "/settings": "Settings",
};

export default function AppBreadcrumb() {
  const { pathname } = useLocation();

  const segments = pathname.split("/").filter(Boolean);

  const paths = segments.map((seg, index) => {
    const url = "/" + segments.slice(0, index + 1).join("/");
    return {
      label: routeLabels[url] ?? seg,
      href: url,
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {paths.map((item, idx) => (
          <BreadcrumbItem key={item.href}>
            <BreadcrumbSeparator />

            {idx === paths.length - 1 ? (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link to={item.href}>{item.label}</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
