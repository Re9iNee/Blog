"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/dashboard",
    text: "Overview",
  },
  {
    href: "/dashboard/posts",
    text: "Posts",
  },
  {
    href: "/dashboard/upload",
    text: "Upload",
  },
  {
    href: "/",
    text: "Visit Site",
    target: "_blank",
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
