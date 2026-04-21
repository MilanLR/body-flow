import { usePageSeo } from "@/hooks/usePageSeo";

export function SeoHead({
  title,
  description,
  pathname,
}: {
  title: string;
  description: string;
  pathname: string;
}) {
  usePageSeo({ title, description, pathname });
  return null;
}
