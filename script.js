const form = document.getElementById("form");
const dateInput = document.getElementById("date");
const xuInput = document.getElementById("xu");
const tableBody = document.getElementById("tableBody");
const totalXuEl = document.getElementById("totalXu");
const totalTienEl = document.getElementById("totalTien");

let data = JSON.parse(localStorage.getItem("xuData") || "[]");

function renderTable() {
  tableBody.innerHTML = "";
  let totalXu = 0;
  let totalTien = 0;

  data.forEach(item => {
    const row = document.createElement("tr");

    const xu = item.xu;
    const tien = Math.round((xu / 1000) * 80 * 100) / 100;
    let bonus = 0;
    if (xu >= 7000) bonus = 1000;
    else if (xu >= 6000) bonus = 500;

    totalXu += xu;
    totalTien += tien + bonus / 1000;

    row.innerHTML = `
      <td>${item.date}</td>
      <td>${xu}</td>
      <td>${tien}k</td>
      <td>${bonus}</td>
    `;
    tableBody.appendChild(row);
  });

  totalXuEl.textContent = Math.round(totalXu / 1000);
  totalTienEl.textContent = `${Math.round(totalTien)}k`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const date = dateInput.value;
  const xu = parseInt(xuInput.value);

  if (!date || !xu) return;

  data = data.filter(d => d.date !== date);
  data.push({ date, xu });
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  localStorage.setItem("xuData", JSON.stringify(data));
  dateInput.value = "";
  xuInput.value = "";

  renderTable();
});

renderTable();
