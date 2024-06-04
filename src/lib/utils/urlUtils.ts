export const getSiteUrl = (): string => {
  if (!document) throw new Error("Document is not defined");

  return document.location.origin;
};

export const getServerSiteUrl = (): string => {
  return `https://${process.env.VERCEL_URL}`;
};

export const getPostUrl = (slug: string): string => {
  return `/posts/${slug}`;
};
