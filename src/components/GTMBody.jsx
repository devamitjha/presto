import { useEffect } from "react";

export default function GTMBody() {
  useEffect(() => {
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WCHKTB6F"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.prepend(noscript);
  }, []);

  return null;
}
