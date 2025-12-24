/* ================================
   FIRMS.JS – LOAD FIRMS + FILTER
   ================================ */

document.addEventListener("DOMContentLoaded", () => {
  const firmContainer = document.querySelector(".firm-grid");
  const filterForm = document.querySelector("#firm-filter");

  // Load firms from JSON
  fetch("data/firms.json")
    .then(res => res.json())
    .then(firms => renderFirms(firms));

  // Render firm cards
  function renderFirms(firms) {
    firmContainer.innerHTML = "";
    firms.forEach(firm => {
      const card = document.createElement("article");
      card.classList.add("firm-card");
      card.innerHTML = `
        <img src="assets/images/logos/${firm.logo}" alt="${firm.name} Logo" />
        <h3>${firm.name}</h3>
        <ul>
          <li>Max Capital: ${firm.capital}</li>
          <li>Profit Split: ${firm.profitSplit}</li>
          <li>Payout: ${firm.payout}</li>
        </ul>
        <a href="firms.html" class="btn btn-outline">View Details</a>
      `;
      firmContainer.appendChild(card);
    });
  }

  // Filter firms
  if (filterForm) {
    filterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const capital = filterForm.querySelector("#capital").value;
      const split = filterForm.querySelector("#profit-split").value;
      fetch("data/firms.json")
        .then(res => res.json())
        .then(firms => {
          const filtered = firms.filter(f => {
            return (capital === "" || f.capital.includes(capital)) &&
                   (split === "" || f.profitSplit.includes(split));
          });
          renderFirms(filtered);
        });
    });
  }
});
