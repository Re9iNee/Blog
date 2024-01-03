import { Spinner } from "@nextui-org/react";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { HTMLProps, Suspense } from "react";

const components = {};

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <Suspense fallback={<Spinner />}>
      {/* @ts-expect-error Async Server Component */}
      <MDXRemote
        {...props}
        components={{ ...components, ...(props.components || {}) }}
      />
    </Suspense>
  );
}
