"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const links = [
  {
    text: "Overview",
    href: "/dashboard",
  },
  {
    text: "Posts",
    href: "/dashboard/posts",
  },
  {
    text: "Upload",
    href: "/dashboard/upload",
  },
  {
    text: "Categories",
    href: "/dashboard/categories",
  },
  {
    href: "/",
    target: "_blank",
    text: "Visit Site",
  },
];

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {links.map(({ href, text, target }) => {
        return (
          <Link
            key={href}
            href={href}
            target={target ?? undefined}
            className={`text-sm font-medium transition-colors hover:text-primary text-muted-foreground ${
              pathname === href && "text-primary"
            }`}
          >
            {text}
          </Link>
        );
      })}
    </nav>
  );
}
