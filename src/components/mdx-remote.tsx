import { Spinner } from "@nextui-org/react";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { Suspense } from "react";

const components = {};

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <MDXRemote
        {...props}
        components={{ ...components, ...(props.components || {}) }}
      />
    </Suspense>
  );
}
