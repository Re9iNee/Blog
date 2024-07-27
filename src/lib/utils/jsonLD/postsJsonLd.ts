import { PostModel } from "@/types/post.type";

export function generateSchemaJson(post: PostModel) {
  const jsonLd = {
    name: post.title,
    identifier: post.id,
    headline: post.title,
    "@type": "NewsArticle",
    description: post.summary,
    image: [post.mainImageUrl],
    creator: [post.author.name],
    dateCreated: post.createdAt,
    dateModified: post.updatedAt,
    "@context": "https://schema.org",
    url: "https://www.mora-ed.com/posts/" + post.slug,
    datePublished: post.publishedAt ?? post.createdAt,
    mainEntityOfPage: "https://mora-ed.com/posts/" + post.slug,

    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      name: "Mora Blog",
      "@type": "Organization",
      url: "https://www.mora-ed.com",
      logo: {
        "@type": "ImageObject",
        url: "https://d1ntfq67otjmwh.cloudfront.net/mora-blog-files/1717948463820-logo-small.svg",
      },
    },
  };

  return jsonLd;
}
