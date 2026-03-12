function getReply(msg) {

  msg = msg.toLowerCase();

  /* ================= BULB LIST ================= */

  if (msg.includes("bulb")) {

    let reply = `<b>💡 Available Bulbs:</b><br><br>`;

    for (let cat in data) {
      for (let p of data[cat]) {

        if (p.name.toLowerCase().includes("bulb")) {
          reply += `• ${p.name} – ₹${p.price}<br>`;
        }

      }
    }

    return reply;
  }

  /* ================= PRICE LIST ================= */

  if (msg.includes("price")) {

    let reply = `<b>💰 Product Prices:</b><br><br>`;

    for (let cat in data) {
      for (let p of data[cat]) {

        reply += `• ${p.name} – ₹${p.price}<br>`;

      }
    }

    return reply;
  }

  /* ================= LOCATION ================= */

  if (
    msg.includes("location") ||
    msg.includes("address") ||
    msg.includes("shop location")
  ) {
    return `
    📍 <b>Our Shop Location</b><br><br>

    <a href="https://www.google.com/maps/search/?api=1&query=Saini+Electricals+Roorkee"
    target="_blank"
    style="color:#d4af37;font-weight:bold;">
    Open in Google Maps 🗺
    </a>
    `;
  }

  /* ================= WELCOME ================= */

  if (
    msg === "hi" ||
    msg === "hello" ||
    msg === "namaste"
  ) {
    return `
    👋 <b>Welcome to Saini Electricals</b><br><br>

    Aap kya dekhna chahte ho?<br><br>

    💡 Bulbs<br>
    🔋 Batteries<br>
    ⚡ Inverters<br>
    ☀ Solar Products<br><br>

    Ya type kare:<br>
    • best bulb<br>
    • inverter price<br>
    • shop location
    `;
  }

  /* ================= SMART RECOMMENDATION ================= */

  if (
    msg.includes("best") ||
    msg.includes("sabse") ||
    msg.includes("achha") ||
    msg.includes("acha") ||
    msg.includes("recommend")
  ) {

    let filteredProducts = [];

    for (let cat in data) {
      for (let p of data[cat]) {

        const words = p.name.toLowerCase().split(" ");

        if (words.some(word => msg.includes(word))) {
          filteredProducts.push(p);
        }

      }
    }

    if (filteredProducts.length === 0) {
      return "Please type full product name for best recommendation 🙂";
    }

    /* ⭐ SORT BY RATING NUMBER */

    filteredProducts.sort((a, b) =>
      (b.rating || 0) - (a.rating || 0)
    );

    let reply = `<b>🔥 Best ${msg.replace("best","").trim()} Products:</b><br><br>`;

    filteredProducts.slice(0, 3).forEach(p => {

      reply += `
      ${p.image ? `<img src="${p.image}" style="width:100%;border-radius:10px;margin-bottom:10px;">` : ""}

      <b>${p.name}</b><br>
      ⭐ Rating: ${p.rating || "Not rated"} / 5<br>
      ₹${p.price}<br><br>
      `;

    });

    return reply;
  }

  /* ================= EXACT PRODUCT MATCH ================= */

  for (let cat in data) {
    for (let p of data[cat]) {

      if (msg.includes(p.name.toLowerCase())) {

        return `
        ${p.image ? `<img src="${p.image}" style="width:100%;border-radius:10px;margin-bottom:10px;">` : ""}

        <b>${p.name}</b><br><br>

        ⭐ Rating: ${p.rating || "Not rated"} / 5<br>
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

  return "Welcome to Saini Electricals 🙏<br>Type product name or ask for best recommendation 😎";
}
