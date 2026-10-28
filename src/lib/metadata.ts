export interface Metadata {
  title?: string;
  description?: string;
  robots?: string;
  metadataBase?: URL;
  authors?: { name: string; url?: string }[];
  creator?: string;
  publisher?: string;
  openGraph?: {
    title?: string; description?: string; type?: string; locale?: string;
    url?: string; siteName?: string; images?: { url: string }[];
  };
  twitter?: { card?: string; title?: string; description?: string; creator?: string; site?: string };
}
export interface SitemapEntry { url: string; lastModified?: Date }
