const password = "dhairya123";
let data = JSON.parse(localStorage.getItem("sainiData")) || {
  "Solar": [
    { name: "Solar Panel 550W", price: 28000 }
  ]
};

function save() {
  localStorage.setItem("sainiData", JSON.stringify(data));
}

function render() {
  const box = document.getElementById("products");
  box.innerHTML = "";

  for (let cat in data) {
    data[cat].forEach((p, i) => {
      box.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>₹ ${p.price}</p>
        <button onclick="order('${p.name}')">Order</button>
        ${isEditMode ? `<button onclick="deleteProduct('${cat}',${i})">Delete</button>` : ""}
      </div>`;
    });
  }
}

function order(name) {
  window.open("https://wa.me/919548021272?text=Details about " + name);
}

function deleteProduct(cat, i) {
  data[cat].splice(i, 1);
  save();
  render();
}

/* ================= EDIT MODE ================= */

let isEditMode = false;

function enableEditMode() {
  isEditMode = true;
  document.body.insertAdjacentHTML("afterbegin",
    `<div style="position:fixed;top:10px;left:10px;
    background:#d4af37;color:#000;padding:6px 12px;
    border-radius:6px;font-weight:bold;z-index:9999;">
    ✏ EDIT MODE
    </div>`);
  render();
}

function openAdminPanel() {
  const cat = prompt("Category name:");
  if (!cat) return;
  if (!data[cat]) data[cat] = [];

  const name = prompt("Product name:");
  const price = prompt("Price:");

  data[cat].push({ name, price });
  save();
  render();
}

/* URL PASSWORD TRIGGER */
const params = new URLSearchParams(window.location.search);
if (params.get("edit") === password) {
  enableEditMode();
  setTimeout(() => {
    if (confirm("Add new product?")) {
      openAdminPanel();
    }
  }, 500);
}

render();
