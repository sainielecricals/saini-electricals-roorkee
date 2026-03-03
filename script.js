const password = "dhairya123";

let data = JSON.parse(localStorage.getItem("sainiData")) || {
  "Solar": [
    { name: "Solar Panel 550W", price: 28000 }
  ],
  "Batteries": [
    { name: "Eastman Battery 150Ah", price: 12500 }
  ]
};

let isEditMode = false;

function save() {
  localStorage.setItem("sainiData", JSON.stringify(data));
}

/* ================= RENDER ================= */

function render() {
  const container = document.getElementById("products");
  container.innerHTML = "";

  for (let cat in data) {

    let section = document.createElement("div");

    section.innerHTML = `
      <h2 style="color:#d4af37;margin-top:40px;">
        ${cat}
        ${isEditMode ? `
          <button onclick="renameCategory('${cat}')">✏</button>
          <button onclick="deleteCategory('${cat}')">❌</button>
        ` : ""}
      </h2>
    `;

    data[cat].forEach((p, i) => {
      section.innerHTML += `
        <div class="card">
          <h3 contenteditable="${isEditMode}" 
              onblur="updateProduct('${cat}',${i},this.innerText,'name')">
              ${p.name}
          </h3>

          <p>₹ 
            <span contenteditable="${isEditMode}" 
              onblur="updateProduct('${cat}',${i},this.innerText,'price')">
              ${p.price}
            </span>
          </p>

          <button onclick="order('${p.name}')">Order</button>

          ${isEditMode ? 
            `<button onclick="deleteProduct('${cat}',${i})">Delete</button>` 
            : ""
          }
        </div>
      `;
    });

    container.appendChild(section);
  }

  if (isEditMode) {
    container.innerHTML += `
      <div style="margin-top:40px;">
        <button onclick="addCategory()">➕ Add Category</button>
        <button onclick="addProduct()">➕ Add Product</button>
      </div>
    `;
  }
}

/* ================= HERO BUTTON ================= */

function scrollToProducts() {
  document.getElementById("products")
    .scrollIntoView({ behavior: "smooth" });
}

/* ================= ORDER ================= */

function order(name) {
  window.open("https://wa.me/919548021272?text=Details about " + name);
}

/* ================= CATEGORY ================= */

function addCategory() {
  let name = prompt("New Category Name:");
  if (!name) return;
  data[name] = [];
  save();
  render();
}

function renameCategory(oldName) {
  let newName = prompt("Rename Category:", oldName);
  if (!newName || newName === oldName) return;

  data[newName] = data[oldName];
  delete data[oldName];
  save();
  render();
}

function deleteCategory(name) {
  if (!confirm("Delete category?")) return;
  delete data[name];
  save();
  render();
}

/* ================= PRODUCT ================= */

function addProduct() {
  let cat = prompt("Category Name:");
  if (!data[cat]) {
    alert("Category not found!");
    return;
  }

  let name = prompt("Product Name:");
  let price = prompt("Price:");

  data[cat].push({ name, price });
  save();
  render();
}

function deleteProduct(cat, index) {
  data[cat].splice(index, 1);
  save();
  render();
}

function updateProduct(cat, index, value, field) {
  data[cat][index][field] = value;
  save();
}

/* ================= CHAT ================= */

function toggleChat() {
  document.getElementById("chatBox").classList.toggle("hidden");
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  addChat(msg, "user");
  input.value = "";

  setTimeout(() => {
    addChat(getReply(msg), "bot");
  }, 500);
}

function addChat(text, type) {
  const chat = document.getElementById("chatMessages");
  const div = document.createElement("div");

  div.style.margin = "6px";
  div.style.textAlign = type === "user" ? "right" : "left";
  div.innerHTML = text;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function getReply(msg) {
  msg = msg.toLowerCase();

  for (let cat in data) {
    for (let p of data[cat]) {
      if (msg.includes(p.name.toLowerCase())) {
        return `<b>${p.name}</b><br>₹${p.price}<br>
        <a href="https://wa.me/919548021272" target="_blank">
        Order on WhatsApp 📲</a>`;
      }
    }
  }

  return "Welcome to Saini Electricals 🙏<br>Type product name for details.";
}

/* ================= EDIT MODE ================= */

const params = new URLSearchParams(window.location.search);
if (params.get("edit") === password) {
  isEditMode = true;

  document.body.insertAdjacentHTML("afterbegin",
    `<div style="
      position:fixed;
      top:10px;
      left:10px;
      background:#d4af37;
      color:#000;
      padding:6px 12px;
      border-radius:6px;
      font-weight:bold;
      z-index:9999;">
      ✏ EDIT MODE
    </div>`
  );
}

render();
