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
      {links.map(({ href, text }) => {
        return (
          <Link
            key={href}
            href={href}
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
