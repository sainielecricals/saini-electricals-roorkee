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
/* ================= BODY BACKGROUND ================= */

function applyBodyBackground() {

  const saved = localStorage.getItem("siteBackground");

  if (saved) {
    document.body.style.background =
      `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('${saved}')`;
  } else {
    document.body.style.background =
      `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)),
       url('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1600&q=80')`;
  }

  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundAttachment = "fixed";
}

function enableBodyBgUpload() {

  if (!isEditMode) return;

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.title = "Change Full Page Background";

  input.style.position = "fixed";
  input.style.top = "60px";
  input.style.left = "10px";
  input.style.zIndex = "9999";

  input.onchange = function () {
    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem("siteBackground", e.target.result);
      applyBodyBackground();
    };
    reader.readAsDataURL(this.files[0]);
  };

  document.body.appendChild(input);
}


/* ================= HERO BACKGROUND ================= */

function applyHeroBackground() {

  const hero = document.getElementById("heroSection");
  if (!hero) return;

  const saved = localStorage.getItem("heroBackground");

  if (saved) {
    hero.style.background =
      `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('${saved}')`;
  } else {
    hero.style.background =
      `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)),
       url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80')`;
  }

  hero.style.backgroundSize = "cover";
  hero.style.backgroundPosition = "center";
}

function enableHeroBgUpload() {

  if (!isEditMode) return;

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.title = "Change Hero Background";

  input.style.position = "fixed";
  input.style.top = "110px";
  input.style.left = "10px";
  input.style.zIndex = "9999";

  input.onchange = function () {
    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem("heroBackground", e.target.result);
      applyHeroBackground();
    };
    reader.readAsDataURL(this.files[0]);
  };

  document.body.appendChild(input);
}


/* ================= INIT BACKGROUNDS ================= */

applyBodyBackground();
applyHeroBackground();
enableBodyBgUpload();
enableHeroBgUpload();
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
  let rating = parseFloat(prompt("Rating (1 to 5):") || 0);
  let warranty = prompt("Warranty:") || "";

  data[cat].push({
  name: name.trim(),
  price: price.replace(/[^0-9]/g, ""),
  rating: rating,
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
function extractRating(reviewText) {
  if (!reviewText) return 0;

  const match = reviewText.match(/([0-9.]+)\s*⭐/);
  return match ? parseFloat(match[1]) : 0;
}

function getReply(msg) {

  msg = msg.toLowerCase();

  /* ================= RECOMMENDATION LOGIC ================= */

  if (
    msg.includes("best") ||
    msg.includes("sabse") ||
    msg.includes("achha") ||
    msg.includes("acha") ||
    msg.includes("recommend")
  ) {

    let allProducts = [];

    for (let cat in data) {
      for (let p of data[cat]) {
        allProducts.push(p);
      }
    }

    // ⭐ reviews text se rating nikaal ke sort karega
    allProducts.sort((a, b) =>
      extractRating(b.reviews) - extractRating(a.reviews)
    );

    let reply = `<b>🔥 Top Recommended Products:</b><br><br>`;

    allProducts.slice(0, 3).forEach(p => {
      reply += `
        ${p.image ? `<img src="${p.image}" style="width:100%;border-radius:10px;margin-bottom:10px;">` : ""}
        <b>${p.name}</b><br>
        ⭐ Rating: ${extractRating(p.reviews) || "Not rated"}<br>
        ₹${p.price}<br><br>
      `;
    });

    return reply;
  }

  /* ================= EXACT PRODUCT MATCH (OLD SAFE SYSTEM) ================= */

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

  return "Welcome to Saini Electricals 🙏<br>Type product name or ask for best recommendation 😎";
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
  enableHeroControl();
}

applyBackground();
enableBackgroundUpload();
render();
/* ================= BACKGROUND SYSTEM ================= */

function applyBodyBackground() {

  const saved = localStorage.getItem("siteBackground");

  if (saved) {
    document.body.style.background =
      `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('${saved}')`;
  } else {
    document.body.style.background =
      `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)),
       url('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1600&q=80')`;
  }

  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundAttachment = "fixed";
}

function applyHeroBackground() {

  const hero = document.getElementById("heroSection");
  if (!hero) return;

  const saved = localStorage.getItem("heroBackground");

  if (saved) {
    hero.style.background =
      `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('${saved}')`;
  } else {
    hero.style.background =
      `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)),
       url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80')`;
  }

  hero.style.backgroundSize = "cover";
  hero.style.backgroundPosition = "center";
}

function enableBackgroundUploads() {

  if (!isEditMode) return;

  // Body Background Button
  const bodyInput = document.createElement("input");
  bodyInput.type = "file";
  bodyInput.accept = "image/*";
  bodyInput.title = "Change Full Page Background";

  bodyInput.style.position = "fixed";
  bodyInput.style.top = "60px";
  bodyInput.style.left = "10px";
  bodyInput.style.zIndex = "9999";

  bodyInput.onchange = function () {
    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem("siteBackground", e.target.result);
      applyBodyBackground();
    };
    reader.readAsDataURL(this.files[0]);
  };

  document.body.appendChild(bodyInput);


  // Hero Background Button
  const heroInput = document.createElement("input");
  heroInput.type = "file";
  heroInput.accept = "image/*";
  heroInput.title = "Change Hero Background";

  heroInput.style.position = "fixed";
  heroInput.style.top = "110px";
  heroInput.style.left = "10px";
  heroInput.style.zIndex = "9999";

  heroInput.onchange = function () {
    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem("heroBackground", e.target.result);
      applyHeroBackground();
    };
    reader.readAsDataURL(this.files[0]);
  };

  document.body.appendChild(heroInput);
}
function applyHeroBackground() {

  const hero = document.getElementById("heroSection");
  if (!hero) return;

  const saved = localStorage.getItem("heroBackground");

  const image = saved
    ? saved
    : "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80";

  hero.style.setProperty(
    "background",
    `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('${image}')`,
    "important"
  );
}
function scrollToProducts() {
  const section = document.getElementById("products");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth"
    });
  }
}
/* ================= HERO IMAGE CONTROL ================= */

function enableHeroControl() {

  if (!isEditMode) return;

  const panel = document.createElement("div");
  panel.style.position = "fixed";
  panel.style.bottom = "20px";
  panel.style.left = "20px";
  panel.style.background = "#111";
  panel.style.padding = "15px";
  panel.style.border = "1px solid #d4af37";
  panel.style.borderRadius = "10px";
  panel.style.zIndex = "9999";
  panel.style.color = "#fff";

  panel.innerHTML = `
    <div style="margin-bottom:10px;font-weight:bold;color:#d4af37;">
      Hero Image Adjust
    </div>

    Zoom:
    <input type="range" min="100" max="200" value="100"
      oninput="adjustZoom(this.value)">
    <br><br>

    Position X:
    <input type="range" min="0" max="100" value="50"
      oninput="adjustPosition()"
      id="posX">
    <br><br>

    Position Y:
    <input type="range" min="0" max="100" value="50"
      oninput="adjustPosition()"
      id="posY">
  `;

  document.body.appendChild(panel);
}

function adjustZoom(value) {
  document.documentElement.style
    .setProperty("--hero-size", value + "%");
}

function adjustPosition() {
  const x = document.getElementById("posX").value;
  const y = document.getElementById("posY").value;

  document.documentElement.style
    .setProperty("--hero-position", x + "% " + y + "%");
}

/* INIT */
applyBodyBackground();
applyHeroBackground();
enableBackgroundUploads();
