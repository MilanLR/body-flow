import { type ComponentType } from "react";
import { Redirect, Route, Switch } from "wouter";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LangProvider } from "@/i18n/LangContext";
import { DEFAULT_LANG, LOCALIZED_ROUTES, getLocalizedPath, type PageKey } from "@/lib/routes";
import { useLocalizedPage } from "@/hooks/useLocalizedPage";
import AmsterdamPage from "@/pages/AmsterdamPage";
import BlogIndexPage from "@/pages/BlogIndexPage";
import BlogPostPage from "@/pages/BlogPostPage";
import ContactPage from "@/pages/ContactPage";
import CostsPage from "@/pages/CostsPage";
import LocalizedHomePage from "@/pages/LocalizedHomePage";
import NotFound from "@/pages/NotFound";
import PrivacyPage from "@/pages/PrivacyPage";
import SciencePage from "@/pages/SciencePage";
import TreatmentPage from "@/pages/TreatmentPage";
import WhoItsForPage from "@/pages/WhoItsForPage";

import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function RootRedirect() {
  return <Redirect to={getLocalizedPath(DEFAULT_LANG, "home")} />;
}

const localizedPageComponents: Record<PageKey, ComponentType<any>> = {
  home: LocalizedHomePage,
  treatment: TreatmentPage,
  costs: CostsPage,
  whoItsFor: WhoItsForPage,
  amsterdam: AmsterdamPage,
  science: SciencePage,
  contact: ContactPage,
  privacy: PrivacyPage,
};

import { CookieBanner } from "@/components/CookieBanner";

function LocalizedAppShell() {
  const langValue = useLocalizedPage();

  return (
    <LangProvider value={langValue}>
      <CookieBanner />
      <Switch>
        <Route path={"/"} component={RootRedirect} />
        {LOCALIZED_ROUTES.flatMap(({ pageKey, paths }) => [
          <Route key={`nl-${pageKey}`} path={paths.nl} component={localizedPageComponents[pageKey]} />,
          <Route key={`en-${pageKey}`} path={paths.en} component={localizedPageComponents[pageKey]} />,
        ])}
        <Route path={"/nl/blog"} component={BlogIndexPage} />
        <Route path={"/en/blog"} component={BlogIndexPage} />
        <Route path={"/nl/blog/:slug"} component={BlogPostPage} />
        <Route path={"/en/blog/:slug"} component={BlogPostPage} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </LangProvider>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <LocalizedAppShell />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
