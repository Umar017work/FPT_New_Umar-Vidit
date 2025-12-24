/* =======================================
   MAIN.JS – GLOBAL INTERACTIONS
   ======================================= */

document.addEventListener("DOMContentLoaded", () => {
  
  /* ===============================
     MOBILE NAV TOGGLE
     =============================== */
  const nav = document.querySelector(".main-nav");
  const logo = document.querySelector(".logo a");

  // Create mobile menu button
  const menuBtn = document.createElement("button");
  menuBtn.innerHTML = "☰";
  menuBtn.classList.add("mobile-menu-btn");
  menuBtn.setAttribute("aria-label", "Toggle Menu");
  logo.parentNode.insertBefore(menuBtn, logo.nextSibling);

  // Hide nav on small screens initially
  if (window.innerWidth < 768) {
    nav.style.display = "none";
  }

  // Toggle nav on click
  menuBtn.addEventListener("click", () => {
    if (nav.style.display === "none") {
      nav.style.display = "flex";
      nav.style.flexDirection = "column";
      nav.style.gap = "1rem";
    } else {
      nav.style.display = "none";
    }
  });

  // Adjust nav on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      nav.style.display = "flex";
      nav.style.flexDirection = "row";
      nav.style.gap = "2rem";
    } else {
      nav.style.display = "none";
    }
  });

  /* ===============================
     SMOOTH SCROLL (OPTIONAL)
     =============================== */
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

});
