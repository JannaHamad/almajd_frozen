let cart = {};

// 1. عرض الأقسام عند الضغط على التبويبات
function showCategory(id, btn) {
  document.querySelectorAll(".category").forEach(c => c.style.display = "none");
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  
  if (id === "all") {
    document.querySelectorAll(".category").forEach(c => c.style.display = "block");
  } else {
    document.getElementById(id).style.display = "block";
  }
  btn.classList.add("active");
}

// 2. التحكم في الكميات
function changeQty(name, price, change) {
  if (!cart[name]) cart[name] = { qty: 0, price };
  cart[name].qty += change;
  
  if (cart[name].qty <= 0) {
    delete cart[name];
    document.getElementById(name).innerText = 0;
  } else {
    document.getElementById(name).innerText = cart[name].qty;
  }
  updateCart();
}

// 3. تحديث السلة
function updateCart() {
  let items = document.getElementById("cartItems");
  let total = 0, count = 0;
  items.innerHTML = "";
  for (let item in cart) {
    let cost = cart[item].qty * cart[item].price;
    total += cost; count += cart[item].qty;
    items.innerHTML += `
      <div class="cart-item">
        <span>${item} × ${cart[item].qty}</span>
        <span>${cost} ₪</span>
        <span class="remove-item" onclick="removeItem('${item}')">✖</span>
      </div>`;
  }
  document.getElementById("cartTotal").innerText = total;
  document.getElementById("cartCount").innerText = count;
}

function removeItem(name) { delete cart[name]; document.getElementById(name).innerText = 0; updateCart(); }

function toggleCart() { document.getElementById("cartDrawer").classList.toggle("open"); }

// 4. فتح وإغلاق قائمة الثلاث خطوط (Dropdown)
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.classList.toggle("open");
}

// 5. إرسال الطلب عبر واتساب
function sendWhatsApp() {
  let text = "طلب جديد من مجمدات المجد:\n\n", total = 0;
  for (let item in cart) {
    let cost = cart[item].qty * cart[item].price;
    total += cost;
    text += `${item} × ${cart[item].qty} = ${cost} ₪\n`;
  }
  text += `\nالمجموع: ${total} ₪`;
  window.open(`https://wa.me/970566706688?text=${encodeURIComponent(text)}`);
}

// 6. السطر الذي سألت عنه (مهم جداً لعرض المنتجات عند فتح الصفحة)
document.addEventListener("DOMContentLoaded", () => {
  showCategory("all", document.querySelector(".tab"));
});

// إغلاق القائمة عند النقر خارجها
window.onclick = function(event) {
    if (!event.target.matches('.menu-btn')) {
        const menu = document.getElementById("sideMenu");
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
        }
    }
}
