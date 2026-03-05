import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "../components/PageLayout";

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    document.title = "Page not found | Nobi";
  }, []);

  return (
    <PageLayout>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <p className="text-6xl font-bold text-black/10 dark:text-white/10">404</p>
        <h1 className="mt-4 text-2xl font-bold text-black dark:text-white">Can't find {location.pathname}</h1>
        <p className="mt-3 text-base text-black/60 dark:text-white/60">
          The link you followed points to a page that doesn't exist. Check the URL or head back to the homepage.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button onClick={() => navigate("/")} className="h-10 px-5 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-medium text-sm hover:opacity-90 transition">
            Back to homepage
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
