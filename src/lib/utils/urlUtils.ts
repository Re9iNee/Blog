export const getSiteUrl = (): string => {
  return document.location.origin;
};

export const getServerSiteUrl = (): string => {
  return `https://${process.env.VERCEL_URL}`;
};
