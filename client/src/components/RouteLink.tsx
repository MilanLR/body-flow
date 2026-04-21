import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { useLang } from "@/i18n/LangContext";
import { getLocalizedPath, type PageKey } from "@/lib/routes";

type RouteLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  children: ReactNode;
  pageKey: PageKey;
};

export function RouteLink({ children, pageKey, ...props }: RouteLinkProps) {
  const { lang } = useLang();

  return (
    <a href={getLocalizedPath(lang, pageKey)} {...props}>
      {children}
    </a>
  );
}
