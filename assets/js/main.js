/* =======================================
   MAIN.JS – GLOBAL INTERACTIONS
   ======================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     SMOOTH SCROLL
     =============================== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ===============================
     PROP FIRMS DROPDOWN
     =============================== */
  const btn = document.getElementById("propFirmBtn");
  const menu = document.getElementById("propFirmMenu");

  if (!btn || !menu) {
    console.warn("Prop firm dropdown elements not found");
    return;
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
  });

  document.addEventListener("click", () => {
    menu.classList.remove("active");
  });

  console.log("Dropdown JS loaded successfully");
});
