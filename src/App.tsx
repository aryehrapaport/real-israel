import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ScrollToTop } from "@/app/scroll-to-top";
import { AboutPage } from "@/pages/about";
import { ContactPage } from "@/pages/contact";
import { HomePage } from "@/pages/home";
import { PricingPage } from "@/pages/pricing";
import { ResourcesPage } from "@/pages/resources";
import { ScopePage } from "@/pages/scope";
import { ServicesPage } from "@/pages/services";
import { WhyPresencePage } from "@/pages/why-presence";
import { PageTransition } from "@/components/page-transition";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <AboutPage />
            </PageTransition>
          }
        />
        <Route
          path="/why-presence"
          element={
            <PageTransition>
              <WhyPresencePage />
            </PageTransition>
          }
        />
        <Route
          path="/services"
          element={
            <PageTransition>
              <ServicesPage />
            </PageTransition>
          }
        />
        <Route
          path="/scope"
          element={
            <PageTransition>
              <ScopePage />
            </PageTransition>
          }
        />
        <Route
          path="/pricing"
          element={
            <PageTransition>
              <PricingPage />
            </PageTransition>
          }
        />
        <Route
          path="/resources"
          element={
            <PageTransition>
              <ResourcesPage />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-dvh">
        <SiteHeader />
        <main className="pt-16">
          <AnimatedRoutes />
        </main>
        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}
