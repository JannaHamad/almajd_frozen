let cart = {};

// تمرير المستخدم إلى القائمة
function scrollToMenu() {
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

// عرض القسم المحدد أو كل الأقسام
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

// تعديل الكمية وإدارة السلة
function changeQty(name, price, change) {
  if (!cart[name]) cart[name] = { qty: 0, price };
  cart[name].qty += change;

  if (cart[name].qty < 0) cart[name].qty = 0;
  if (cart[name].qty === 0) delete cart[name];

  document.getElementById(name).innerText = cart[name]?.qty || 0;
  updateCart();
}

// تحديث محتوى السلة
function updateCart() {
  let cartItems = document.getElementById("cartItems");
  let cartCount = document.getElementById("cartCount");
  let cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  for (let item in cart) {
    let cost = cart[item].qty * cart[item].price;
    total += cost;
    count += cart[item].qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item} × ${cart[item].qty}</span>
        <span>${cost} ₪</span>
        <span class="remove-item" onclick="removeItem('${item}')">✖</span>
      </div>
    `;
  }

  cartTotal.innerText = total;
  cartCount.innerText = count;
}

// مسح صنف من السلة مباشرة
function removeItem(name) {
  delete cart[name];
  document.getElementById(name).innerText = 0;
  updateCart();
}

// فتح وغلق السلة
function toggleCart() {
  document.getElementById("cartDrawer").classList.toggle("open");
}

// إرسال الطلب عبر واتساب
function sendWhatsApp() {
  let text = "طلب جديد من مجمدات المجد:\n\n";
  let total = 0;

  for (let item in cart) {
    let cost = cart[item].qty * cart[item].price;
    total += cost;
    text += `${item} × ${cart[item].qty} = ${cost} ₪\n`;
  }

  text += `\nالمجموع: ${total} ₪`;

  let phone = "970599999999"; // عدلي الرقم هنا
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
}

// عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  showCategory("all", document.querySelector(".tab")); // عرض كل الأصناف أولًا
});

// تغيير تصميم الهيدر عند التمرير
window.addEventListener("scroll", () => {
  const header = document.querySelector(".top-bar");
  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
