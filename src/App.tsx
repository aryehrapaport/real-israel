import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ScrollToTop } from "@/app/scroll-to-top";
import { SiteBackground } from "@/components/site-background";
import { AboutPage } from "@/pages/about";
import { AdminLoginPage } from "@/pages/admin-login";
import { AdminPage } from "@/pages/admin";
import { ContactPage } from "@/pages/contact";
import { HomePage } from "@/pages/home";
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
        <Route path="/scope" element={<Navigate to="/contact" replace />} />
        <Route path="/pricing" element={<Navigate to="/contact" replace />} />
        <Route path="/resources" element={<Navigate to="/contact" replace />} />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />
        <Route
          path="/admin"
          element={
            <PageTransition>
              <AdminPage />
            </PageTransition>
          }
        />
        <Route
          path="/admin/login"
          element={
            <PageTransition>
              <AdminLoginPage />
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
      <div className="relative isolate min-h-dvh bg-background">
        <SiteBackground />
        <div className="relative z-10">
          <SiteHeader />
          <main className="pt-16">
            <AnimatedRoutes />
          </main>
          <SiteFooter />
        </div>
      </div>
    </BrowserRouter>
  );
}
