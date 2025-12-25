/* ================================
   FIRMS.JS – LOAD FIRMS + FILTER + CATEGORY
   ================================ */

document.addEventListener("DOMContentLoaded", () => {
  const firmContainer = document.querySelector(".firm-grid");
  const filterForm = document.querySelector("#firm-filter");

  // Read category from URL (?type=forex etc.)
  const params = new URLSearchParams(window.location.search);
  const firmType = params.get("type"); // forex, broker, futures, stocks, crypto

  let allFirms = [];

  // Load firms from JSON
  fetch("data/firms.json")
    .then(res => res.json())
    .then(firms => {
      allFirms = firms;
      applyFilters();
    });

  // Apply category + form filters
  function applyFilters() {
    let filtered = [...allFirms];

    // Category filter (from dropdown)
    if (firmType) {
      filtered = filtered.filter(f => f.type === firmType);
    }

    // Form filters
    if (filterForm) {
      const capital = filterForm.querySelector("#capital").value;
      const split = filterForm.querySelector("#profit-split").value;

      filtered = filtered.filter(f => {
        return (capital === "" || f.capital.includes(capital)) &&
               (split === "" || f.profitSplit.includes(split));
      });
    }

    renderFirms(filtered);
  }

  // Render firm cards
  function renderFirms(firms) {
    firmContainer.innerHTML = "";

    if (firms.length === 0) {
      firmContainer.innerHTML = "<p>No firms found.</p>";
      return;
    }

    firms.forEach(firm => {
      const card = document.createElement("article");
      card.classList.add("firm-card");

      card.innerHTML = `
        <img 
          src="assets/images/logos/${firm.logo}" 
          alt="${firm.name} Logo" 
          loading="lazy"
        />
        <h3>${firm.name}</h3>
        <ul>
          <li>Category: ${firm.type.toUpperCase()}</li>
          <li>Max Capital: ${firm.capital}</li>
          <li>Profit Split: ${firm.profitSplit}</li>
          <li>Payout: ${firm.payout}</li>
        </ul>
        <a href="compare.html" class="btn btn-outline">Compare</a>
      `;

      firmContainer.appendChild(card);
    });
  }

  // Filter form submit
  if (filterForm) {
    filterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      applyFilters();
    });
  }
});
