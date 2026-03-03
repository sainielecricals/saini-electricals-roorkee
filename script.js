const password = "dhairya123";
const whatsappNumber = "919548021272";

let data = JSON.parse(localStorage.getItem("sainiData")) || {
  "Solar": [
    {
      name: "Solar Panel 550W",
      price: 28000,
      specs: "High efficiency mono PERC panel",
      use: "Best for home rooftop systems",
      reviews: "4.6⭐ Trusted by 120+ users",
      warranty: "25 Years performance warranty"
    }
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
      </h2>
    `;

    data[cat].forEach((p, i) => {
      section.innerHTML += `
        <div class="card">
          <h3>${p.name}</h3>
          <p>₹ ${p.price}</p>
          <button onclick="order('${p.name}')">Order</button>
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
  window.open(`https://wa.me/${whatsappNumber}?text=Details about ${name}`);
}

/* ================= CATEGORY ================= */

function addCategory() {
  let name = prompt("New Category Name:");
  if (!name) return;
  data[name] = [];
  save();
  render();
}

/* ================= PRODUCT (FULL DETAILS) ================= */

function addProduct() {

  let cat = prompt("Category Name:");
  if (!data[cat]) {
    alert("Category not found!");
    return;
  }

  let name = prompt("Product Name:");
  let price = prompt("Price:");
  let specs = prompt("Specifications:");
  let use = prompt("Best Use:");
  let reviews = prompt("Reviews Summary:");
  let warranty = prompt("Warranty:");

  data[cat].push({
    name,
    price,
    specs,
    use,
    reviews,
    warranty
  });

  save();
  render();
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
  }, 400);
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

/* ================= SMART BOT ================= */

function getReply(msg) {
  msg = msg.toLowerCase();

  for (let cat in data) {
    for (let p of data[cat]) {

      if (msg.includes(p.name.toLowerCase())) {

        return `
        <b>${p.name}</b><br><br>

        💰 Price: ₹${p.price}<br><br>

        ⚙ Specifications:<br>
        ${p.specs || "Not added"}<br><br>

        🏠 Best Use:<br>
        ${p.use || "Not added"}<br><br>

        ⭐ Reviews:<br>
        ${p.reviews || "Not added"}<br><br>

        🛡 Warranty:<br>
        ${p.warranty || "Not added"}<br><br>

        <a href="https://wa.me/${whatsappNumber}?text=Details about ${p.name}" 
        target="_blank"
        style="color:#d4af37;font-weight:bold;">
        Order on WhatsApp 📲
        </a>
        `;
      }
    }
  }

  return "Welcome to Saini Electricals 🙏<br>Type exact product name for full details.";
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
