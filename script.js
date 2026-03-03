const password = "dhairya123";
const whatsappNumber = "919548021272";

/* ================= DATA ================= */

let data = JSON.parse(localStorage.getItem("sainiData")) || {
  "Solar": [
    {
      name: "Solar Panel 550W",
      price: "28000",
      specs: "High efficiency mono PERC panel",
      use: "Best for home rooftop systems",
      reviews: "4.6⭐ Trusted by 120+ users",
      warranty: "25 Years performance warranty",
      image: ""
    }
  ]
};

let isEditMode = false;

function save() {
  localStorage.setItem("sainiData", JSON.stringify(data));
}

/* ================= BACKGROUND SYSTEM ================= */

function applyBackground() {
  const saved = localStorage.getItem("siteBackground");

  if (saved) {
    document.body.style.background =
      `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('${saved}')`;
  } else {
    document.body.style.background =
      `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)),
       url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80')`;
  }

  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundAttachment = "fixed";
}

function enableBackgroundUpload() {
  if (!isEditMode) return;

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.style.position = "fixed";
  input.style.top = "60px";
  input.style.left = "10px";
  input.style.zIndex = "9999";

  input.onchange = function () {
    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem("siteBackground", e.target.result);
      applyBackground();
    };
    reader.readAsDataURL(this.files[0]);
  };

  document.body.appendChild(input);
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

          ${p.image ? `<img src="${p.image}" style="width:100%;border-radius:12px;margin-bottom:10px;">` : ""}

          ${isEditMode ? `
            <input type="file" accept="image/*"
              onchange="uploadImage('${cat}',${i},this)">
          ` : ""}

          <h3 contenteditable="${isEditMode}"
              onblur="updateProduct('${cat}',${i},this.innerText,'name')">
              ${p.name}
          </h3>

          <p>
            ₹ 
            <span contenteditable="${isEditMode}"
              onblur="updateProduct('${cat}',${i},this.innerText,'price')">
              ${p.price}
            </span>
          </p>

          <button onclick="order('${p.name}')">Order</button>

          ${isEditMode ? `
            <button onclick="deleteProduct('${cat}',${i})">Delete</button>
          ` : ""}
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

/* ================= IMAGE UPLOAD ================= */

function uploadImage(cat, index, input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    data[cat][index].image = e.target.result;
    save();
    render();
  };

  reader.readAsDataURL(file);
}

/* ================= CATEGORY ================= */

function addCategory() {
  let name = prompt("New Category Name:");
  if (!name) return;

  name = name.trim();
  if (data[name]) {
    alert("Category already exists!");
    return;
  }

  data[name] = [];
  save();
  render();
}

function renameCategory(oldName) {
  let newName = prompt("Rename Category:", oldName);
  if (!newName || newName.trim() === "" || newName === oldName) return;

  newName = newName.trim();
  data[newName] = data[oldName];
  delete data[oldName];

  save();
  render();
}

function deleteCategory(name) {
  if (!confirm("Delete this category?")) return;

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
  if (!name) return;

  let price = prompt("Price:");
  if (!price) return;

  let specs = prompt("Specifications:") || "";
  let use = prompt("Best Use:") || "";
  let reviews = prompt("Reviews Summary:") || "";
  let warranty = prompt("Warranty:") || "";

  data[cat].push({
    name: name.trim(),
    price: price.replace(/[^0-9]/g, ""),
    specs,
    use,
    reviews,
    warranty,
    image: ""
  });

  save();
  render();
}

function deleteProduct(cat, index) {
  data[cat].splice(index, 1);
  save();
  render();
}

function updateProduct(cat, index, value, field) {
  if (field === "price") {
    value = value.replace(/[^0-9]/g, "");
  }
  data[cat][index][field] = value.trim();
  save();
}

/* ================= ORDER ================= */

function order(name) {
  window.open(`https://wa.me/${whatsappNumber}?text=Details about ${name}`);
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

function getReply(msg) {
  msg = msg.toLowerCase();

  for (let cat in data) {
    for (let p of data[cat]) {
      if (msg.includes(p.name.toLowerCase())) {

        return `
        ${p.image ? `<img src="${p.image}" style="width:100%;border-radius:10px;margin-bottom:10px;">` : ""}
        <b>${p.name}</b><br><br>
        💰 Price: ₹${p.price}<br><br>
        ⚙ Specifications:<br>${p.specs || "Not added"}<br><br>
        🏠 Best Use:<br>${p.use || "Not added"}<br><br>
        ⭐ Reviews:<br>${p.reviews || "Not added"}<br><br>
        🛡 Warranty:<br>${p.warranty || "Not added"}<br><br>
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

applyBackground();
enableBackgroundUpload();
render();
