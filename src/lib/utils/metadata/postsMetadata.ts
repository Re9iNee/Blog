import { PostModel } from "@/types/post.type";
import { Metadata } from "next";
import { getHomepageOGImageLink } from "../imageUtils";
import { SITE_URL } from "../constants";

export function generateMetadataForPost(data: PostModel): Metadata {
  const metadata: Metadata = {
    title: data.title,
    publisher: "Mora Blog",
    description: data.summary,
    robots: getRobotsMetadata(),
    twitter: getTwitterMetadata(data),
    openGraph: getOpenGraphMetadata(data),
    keywords: data.categories.map((c) => c.name),
    alternates: {
      canonical: `${SITE_URL}/posts/${data.slug}`,
    },
  };

  return metadata;
}

function getRobotsMetadata(): Metadata["robots"] {
  const metadata: Metadata["robots"] = {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
    },
  };
  return metadata;
}

function getOpenGraphMetadata(data: PostModel): Metadata["openGraph"] {
  return {
    type: "article",
    locale: "en_US",
    siteName: "Mora Blog",
    authors: data.author.name,
    description: data.summary,
    title: `${data.title} | Mora Blog`,
    modifiedTime: data?.updatedAt?.toUTCString(),
    publishedTime: data?.publishedAt?.toUTCString(),
    url: `https://www.mora-ed.com/posts/${data.slug}`,
    images: [
      {
        width: "1080",
        height: "1080",
        alt: data.title,
        type: "image/jpeg",
        url: data.mainImageUrl ?? getHomepageOGImageLink(),
      },
    ],
  };
}

function getTwitterMetadata(data: PostModel): Metadata["twitter"] {
  return {
    site: "@nuwa_company",
    description: data.summary,
    card: "summary_large_image",
    siteId: "https://www.mora-ed.com",
    title: `${data.title} | Mora Blog`,
    images: [
      {
        width: "1080",
        height: "1080",
        alt: data.title,
        type: "image/jpeg",
        url: data.mainImageUrl ?? getHomepageOGImageLink(),
      },
    ],
  };
}
