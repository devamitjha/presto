import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router";

export default function GTMPageTracker() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.dataLayer = window.dataLayer || [];

      window.dataLayer.push({
        event: "page_view",
        page_path: window.location.pathname + window.location.search,
        page_title: document.title,
        navigation_type: navigationType
      });
    }, 150);

    return () => clearTimeout(timeout);
  }, [location, navigationType]);

  return null;
}
