export const SITE_URL = getSiteURL();

function getSiteURL(): string {
  if (process.env.NODE_ENV === "production" && process.env.VERCEL_URL) {
    return "https://" + process.env.VERCEL_URL;
  }
  try {
    if (!document) throw new Error("Document is not defined");

    return document.location.origin;
  } catch (e) {
    return "http://localhost:3000";
  }
}
