import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ScrollToTop } from "@/app/scroll-to-top";
import { ScrollToHash } from "@/app/scroll-to-hash";
import { SiteBackground } from "@/components/site-background";
import { AdminLoginPage } from "@/pages/admin-login";
import { AdminPage } from "@/pages/admin";
import { HomePage } from "@/pages/home";
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
          element={<Navigate to="/#why-us" replace />}
        />
        <Route
          path="/why-presence"
          element={<Navigate to="/#problem" replace />}
        />
        <Route
          path="/services"
          element={<Navigate to="/#services" replace />}
        />
        <Route path="/scope" element={<Navigate to="/#contact" replace />} />
        <Route path="/pricing" element={<Navigate to="/#contact" replace />} />
        <Route path="/resources" element={<Navigate to="/#contact" replace />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
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
      <ScrollToHash />
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
