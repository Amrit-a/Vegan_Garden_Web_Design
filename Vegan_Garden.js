const menuData = {
  savoury: [
    {
      name: "Vegan Lasagna",
      desc: "Rich tomato & vegetable layers",
      price: 8.5,
    },
    {
      name: "Roasted Aubergine",
      desc: "Herb-seasoned, oven roasted",
      price: 6.0,
    },
    {
      name: "Grilled Asparagus & Peppers",
      desc: "With a light marinade",
      price: 5.5,
    },
    { name: "Spring Rolls", desc: "Crispy, filled with fresh veg", price: 5.0 },
    {
      name: "Stuffed Roasted Vegetables",
      desc: "Seasonal mix, herb stuffing",
      price: 7.0,
    },
    {
      name: "Mushroom Quiche",
      desc: "Flaky pastry, creamy filling",
      price: 6.5,
    },
    {
      name: "Spinach Tart",
      desc: "Buttery pastry, wilted spinach",
      price: 6.5,
    },
    {
      name: "Vegetable Tart",
      desc: "Seasonal vegetables, light crust",
      price: 6.0,
    },
    {
      name: "Stuffed Peppers",
      desc: "Rice & herb filled, oven baked",
      price: 6.5,
    },
    { name: "Pasta Bake", desc: "Creamy vegan sauce, baked fresh", price: 7.5 },
    {
      name: "Vegan Savoury Pastries",
      desc: "Assorted, baked daily",
      price: 4.5,
    },
    {
      name: "Stuffed Vine Leaves",
      desc: "Rice & herb filled, classic style",
      price: 5.5,
    },
  ],
  salads: [
    {
      name: "Mixed Green Salad",
      desc: "Seasonal leaves & dressing",
      price: 4.5,
    },
    { name: "Cucumber Salad", desc: "Light, fresh & herby", price: 4.0 },
    { name: "Red Cabbage Slaw", desc: "Tangy & crunchy", price: 4.0 },
    { name: "Broccoli Salad", desc: "With toasted seeds", price: 4.5 },
    { name: "Chickpea & Grain Salad", desc: "Hearty & filling", price: 5.5 },
    {
      name: "Roasted Potato & Carrot Tray",
      desc: "Seasoned & oven roasted",
      price: 5.0,
    },
    {
      name: "Vegan Rice / Couscous Salad",
      desc: "With herbs & lemon",
      price: 5.0,
    },
    { name: "Herb Salad", desc: "Fresh mixed herbs & citrus", price: 4.0 },
  ],
  sweets: [
    {
      name: "Chocolate Raspberry Cake",
      desc: "Rich chocolate, sharp berry",
      price: 4.0,
    },
    {
      name: "Blueberry Cake",
      desc: "Light sponge, fresh blueberries",
      price: 3.8,
    },
    { name: "Apple Tart", desc: "Rustic, caramelised apple", price: 3.8 },
    { name: "Cinnamon Swirls", desc: "Warm, fluffy, spiced", price: 3.0 },
    { name: "Brownies", desc: "Fudgy dark chocolate", price: 3.0 },
    {
      name: "Raspberry Brownies",
      desc: "Chocolate with raspberry swirl",
      price: 3.2,
    },
    { name: "Banana Bread", desc: "Moist, naturally sweetened", price: 3.5 },
    { name: "Lemon Drizzle Loaf", desc: "Tangy & sweet", price: 3.5 },
    {
      name: "Fruit Crumble Cake",
      desc: "Seasonal fruit, buttery crumble",
      price: 4.0,
    },
    { name: "Cookies", desc: "Assorted, baked fresh", price: 2.5 },
    { name: "Vegan Sponge Cake", desc: "Classic light sponge", price: 3.5 },
    { name: "Chocolate Loaf Cake", desc: "Dense, rich chocolate", price: 3.8 },
    {
      name: "Berry Tart",
      desc: "Crisp pastry, cream, mixed berries",
      price: 4.2,
    },
    {
      name: "Rustic Fruit Tart",
      desc: "Seasonal fruit, freeform pastry",
      price: 4.2,
    },
  ],
};

let cart = {};

function renderMenu(items, containerId, category) {
  const el = document.getElementById(containerId);
  el.innerHTML = items
    .map((item, i) => {
      const key = category + "_" + i;
      return `<div class="menu-item" id="item-${key}">
      <div class="item-info"><h4>${item.name}</h4><span>${
        item.desc
      }</span></div>
      <div class="item-right">
        <span class="item-price">£${item.price.toFixed(2)}</span>
        <div id="ctrl-${key}"><button class="add-btn" onclick="addItem('${key}','${
        item.name
      }',${item.price})">+</button></div>
      </div>
    </div>`;
    })
    .join("");
}

function addItem(key, name, price) {
  if (!cart[key]) cart[key] = { name, price, qty: 0 };
  cart[key].qty++;
  renderCtrl(key);
  renderCart();
}
function removeItem(key) {
  if (!cart[key]) return;
  cart[key].qty--;
  if (cart[key].qty <= 0) delete cart[key];
  renderCtrl(key);
  renderCart();
}
function renderCtrl(key) {
  const el = document.getElementById("ctrl-" + key);
  if (!el) return;
  const item = cart[key];
  if (!item || item.qty === 0) {
    const parts = key.split("_");
    const cat = parts[0];
    const idx = parseInt(parts[1]);
    const data =
      cat === "savoury"
        ? menuData.savoury
        : cat === "salads"
        ? menuData.salads
        : menuData.sweets;
    el.innerHTML = `<button class="add-btn" onclick="addItem('${key}','${data[idx].name}',${data[idx].price})">+</button>`;
  } else {
    el.innerHTML = `<div class="qty-ctrl"><button onclick="removeItem('${key}')">−</button><span>${item.qty}</span><button onclick="addItem('${key}','${item.name}',${item.price})">+</button></div>`;
  }
}
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalRow = document.getElementById("cart-total-row");
  const checkoutBtn = document.getElementById("checkout-btn");
  const keys = Object.keys(cart);
  if (keys.length === 0) {
    container.innerHTML =
      '<p class="cart-empty">Your basket is empty.<br/>Add something delicious!</p>';
    totalRow.style.display = "none";
    checkoutBtn.disabled = true;
    return;
  }
  let total = 0;
  container.innerHTML = keys
    .map((k) => {
      const item = cart[k];
      const sub = item.price * item.qty;
      total += sub;
      return `<div class="cart-item">
      <span class="cart-item-name">${item.name}</span>
      <span class="cart-item-qty">x${item.qty}</span>
      <span class="cart-item-price">£${sub.toFixed(2)}</span>
      <button class="remove-item" onclick="deleteFromCart('${k}')" title="Remove">✕</button>
    </div>`;
    })
    .join("");
  document.getElementById("cart-total").textContent = "£" + total.toFixed(2);
  totalRow.style.display = "flex";
  checkoutBtn.disabled = false;
}
function deleteFromCart(key) {
  if (cart[key]) {
    cart[key].qty = 0;
    delete cart[key];
  }
  renderCtrl(key);
  renderCart();
}
function completeOrder() {
  const payment = document.querySelector('input[name="payment"]:checked').value;
  const pickup = document.getElementById("pickup-time").value;
  const ref = "SS-" + Math.floor(1000 + Math.random() * 9000);
  document.getElementById("order-ref").textContent = "Order " + ref;
  const msgs = {
    online: "Payment taken online. See you at the stall!",
    card: "Pay by card when you collect.",
    cash: "Pay cash when you collect. Thank you!",
  };
  document.getElementById("confirm-payment").textContent =
    "⏱ " + pickup + " · " + msgs[payment];
  document.getElementById("order-main").style.display = "none";
  document.getElementById("order-confirm").classList.add("show");
  document.getElementById("order-footer").style.display = "block";
}
function resetOrder() {
  cart = {};
  document.querySelectorAll('[id^="ctrl-"]').forEach((el) => {
    const key = el.id.replace("ctrl-", "");
    const parts = key.split("_");
    const cat = parts[0];
    const idx = parseInt(parts[1]);
    const data =
      cat === "savoury"
        ? menuData.savoury
        : cat === "salads"
        ? menuData.salads
        : menuData.sweets;
    el.innerHTML = `<button class="add-btn" onclick="addItem('${key}','${data[idx].name}',${data[idx].price})">+</button>`;
  });
  renderCart();
  document.getElementById("order-main").style.display = "grid";
  document.getElementById("order-confirm").classList.remove("show");
  document.getElementById("order-footer").style.display = "none";
}
function submitContact() {
  const n = document.getElementById("c-name").value;
  const e = document.getElementById("c-email").value;
  if (!n || !e) {
    alert("Please fill in your name and email.");
    return;
  }
  document.getElementById("contact-success").classList.add("show");
  document.getElementById("c-name").value = "";
  document.getElementById("c-email").value = "";
  document.getElementById("c-msg").value = "";
}
function showPage(id, linkEl) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("page-" + id).classList.add("active");
  document
    .querySelectorAll(".nav-links a")
    .forEach((a) => a.classList.remove("active"));
  if (linkEl) linkEl.classList.add("active");
}

const picker = document.getElementById("pickup-date");
picker.addEventListener("input", function (e) {
  const day = new Date(this.value).getUTCDay();
  if (![0, 5, 6].includes(day)) {
    e.preventDefault();
    this.value = "";
    alert(
      "We are only open Friday, Saturday, and Sunday. Please select one of those days!"
    );
  }
});

// Admin Page JavaScript

// Hardcoded credentials for the manager
const MANAGER_ID = "admin";
const MANAGER_PASS = "1";

function handleAdminLogin() {
    const id = document.getElementById('admin-id').value;
    const pass = document.getElementById('admin-pass').value;
    const errorDiv = document.getElementById('login-error');

    if (id === MANAGER_ID && pass === MANAGER_PASS) {
        errorDiv.style.display = "none";
        showPage('admin-dashboard');
        // Clear inputs for security
        document.getElementById('admin-id').value = "";
        document.getElementById('admin-pass').value = "";
    } else {
        errorDiv.style.display = "block";
    }
}

function renderAdminDashboard() {
    const selectedDate = document.getElementById('admin-date-filter').value;
    const prepDiv = document.getElementById('prep-list-content');
    const ledgerDiv = document.getElementById('ledger-content');

    // Filter orders for the chosen date from LocalStorage
    let storedOrders = JSON.parse(localStorage.getItem('ss_orders')) || [];
    const dailyOrders = storedOrders.filter(o => o.pickupDate === selectedDate);

    if (dailyOrders.length === 0) {
        prepDiv.innerHTML = "<p>No orders found for this date.</p>";
        ledgerDiv.innerHTML = "<p>No orders found for this date.</p>";
        return;
    }

    // 1. Calculate Prep Totals (Totals per item)
    let totals = {};
    dailyOrders.forEach(order => {
        if (order.status !== "Cancelled") {
            order.items.forEach(item => {
                totals[item.name] = (totals[item.name] || 0) + item.qty;
            });
        }
    });

    let prepTable = `<table class="admin-table"><thead><tr><th>Item</th><th>Total Qty</th></tr></thead><tbody>`;
    for (const [name, qty] of Object.entries(totals)) {
        prepTable += `<tr><td>${name}</td><td><strong>x${qty}</strong></td></tr>`;
    }
    prepTable += `</tbody></table>`;
    prepDiv.innerHTML = Object.keys(totals).length ? prepTable : "<p>All orders are cancelled.</p>";

    // 2. Render Ledger (Individual customers)
    let ledgerTable = `<table class="admin-table"><thead><tr><th>Ref</th><th>Items</th><th>Status</th><th>Action</th></tr></thead><tbody>`;
    dailyOrders.forEach(order => {
        const itemNames = order.items.map(i => `${i.name} (x${i.qty})`).join(', ');
        const isCancelled = order.status === "Cancelled";
        
        ledgerTable += `
            <tr style="opacity: ${isCancelled ? 0.5 : 1}">
                <td>${order.ref}</td>
                <td>${itemNames}</td>
                <td><span class="status-tag ${isCancelled ? 'status-cancelled' : 'status-confirmed'}">${order.status}</span></td>
                <td>
                    ${!isCancelled ? `<button class="cancel-action-btn" onclick="managerCancelOrder('${order.ref}')">Cancel</button>` : '—'}
                </td>
            </tr>`;
    });
    ledgerTable += `</tbody></table>`;
    ledgerDiv.innerHTML = ledgerTable;
}

function managerCancelOrder(ref) {
    if (confirm("Cancel this order? The customer will see this when they check their status.")) {
        let storedOrders = JSON.parse(localStorage.getItem('ss_orders')) || [];
        storedOrders = storedOrders.map(o => {
            if (o.ref === ref) o.status = "Cancelled";
            return o;
        });
        localStorage.setItem('ss_orders', JSON.stringify(storedOrders));
        renderAdminDashboard(); // Refresh view
    }
}
function renderAdminDashboard() {
    const selectedDate = document.getElementById('admin-date-filter').value;
    const ledgerDiv = document.getElementById('ledger-content');
    let storedOrders = JSON.parse(localStorage.getItem('ss_orders')) || [];
    const dailyOrders = storedOrders.filter(o => o.pickupDate === selectedDate);

    if (dailyOrders.length === 0) {
        ledgerDiv.innerHTML = "<p>No orders found for this date.</p>";
        return;
    }

    // UPDATED TABLE HEADER: Added "Payment"
    let ledgerTable = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Ref</th>
                    <th>Items</th>
                    <th>Payment</th> 
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

    dailyOrders.forEach(order => {
        const itemNames = order.items.map(i => `${i.name} (x${i.qty})`).join(', ');
        const isCancelled = order.status === "Cancelled";
        
        // Format payment display
        const paymentDisplay = order.paymentType.charAt(0).toUpperCase() + order.paymentType.slice(1);

        ledgerTable += `
            <tr style="opacity: ${isCancelled ? 0.5 : 1}">
                <td>${order.ref}</td>
                <td>${itemNames}</td>
                <td style="font-weight: 500;">${paymentDisplay}</td>
                <td><span class="status-tag ${isCancelled ? 'status-cancelled' : 'status-confirmed'}">${order.status}</span></td>
                <td>
                    ${!isCancelled ? `<button class="cancel-action-btn" onclick="managerCancelOrder('${order.ref}')">Cancel</button>` : '—'}
                </td>
            </tr>`;
    });

    ledgerTable += `</tbody></table>`;
    ledgerDiv.innerHTML = ledgerTable;
}


/**/
renderMenu(menuData.savoury, "savoury-list", "savoury");
renderMenu(menuData.salads, "salads-list", "salads");
renderMenu(menuData.sweets, "sweets-list", "sweets");
