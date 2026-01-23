// js/app.js
import { navigate } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".top-link").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const route = btn.getAttribute("data-nav") || "/";
      navigate(route);
    });
  });
});
