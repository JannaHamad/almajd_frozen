let cart = {};

function toggleCart() {
  document.getElementById("cartDrawer").classList.toggle("open");
}

function toggleMenu() {
  document.getElementById("sideMenu").classList.toggle("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showCategory(id, btn) {
  document.querySelectorAll(".category").forEach(c => c.style.display = "none");
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

  document.getElementById(id).style.display = "block";
  btn.classList.add("active");
}

function changeQty(name, price, change) {
  if (!cart[name]) cart[name] = { qty: 0, price };
  cart[name].qty += change;

  if (cart[name].qty <= 0) delete cart[name];

  document.getElementById(name).innerText = cart[name]?.qty || 0;
  updateCart();
}

function updateCart() {
  let items = document.getElementById("cartItems");
  let total = 0;
  let count = 0;

  items.innerHTML = "";

  for (let item in cart) {
    let cost = cart[item].qty * cart[item].price;
    total += cost;
    count += cart[item].qty;

    items.innerHTML += `
      <div>
        ${item} × ${cart[item].qty}
        <span onclick="removeItem('${item}')">✖</span>
      </div>
    `;
  }

  document.getElementById("cartTotal").innerText = total;
  document.getElementById("cartCount").innerText = count;
}

function removeItem(name) {
  delete cart[name];
  document.getElementById(name).innerText = 0;
  updateCart();
}

function sendWhatsApp() {
  let text = "طلب جديد:\n";
  let total = 0;

  for (let item in cart) {
    let cost = cart[item].qty * cart[item].price;
    total += cost;
    text += `${item} × ${cart[item].qty} = ${cost} ₪\n`;
  }

  text += `\nالمجموع: ${total} ₪`;
  window.open(`https://wa.me/970599999999?text=${encodeURIComponent(text)}`);
}

document.addEventListener("DOMContentLoaded", () => {
  showCategory("all", document.querySelector(".tab"));
});
