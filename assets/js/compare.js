/* ================================
   COMPARE.JS – SELECT & COMPARE FIRMS
   ================================ */

document.addEventListener("DOMContentLoaded", () => {
  const firmASelect = document.querySelector("#firmA");
  const firmBSelect = document.querySelector("#firmB");
  const compareTable = document.querySelector(".compare-table");

  let firmsData = [];

  // Load firms
  fetch("data/firms.json")
    .then(res => res.json())
    .then(data => {
      firmsData = data;
      populateSelect(firmASelect);
      populateSelect(firmBSelect);
    });

  function populateSelect(select) {
    firmsData.forEach(f => {
      const option = document.createElement("option");
      option.value = f.id;
      option.textContent = f.name;
      select.appendChild(option);
    });
  }

  function renderComparison(firm1, firm2) {
    compareTable.innerHTML = `
      <tr><th>Feature</th><th>${firm1.name}</th><th>${firm2.name}</th></tr>
      <tr><td>Max Capital</td><td>${firm1.capital}</td><td>${firm2.capital}</td></tr>
      <tr><td>Profit Split</td><td>${firm1.profitSplit}</td><td>${firm2.profitSplit}</td></tr>
      <tr><td>Payout</td><td>${firm1.payout}</td><td>${firm2.payout}</td></tr>
    `;
  }

  // Compare on change
  [firmASelect, firmBSelect].forEach(select => {
    select.addEventListener("change", () => {
      const firm1 = firmsData.find(f => f.id == firmASelect.value);
      const firm2 = firmsData.find(f => f.id == firmBSelect.value);
      if (firm1 && firm2 && firm1.id !== firm2.id) {
        renderComparison(firm1, firm2);
      } else {
        compareTable.innerHTML = "<tr><td colspan='3'>Select two different firms to compare.</td></tr>";
      }
    });
  });
});
