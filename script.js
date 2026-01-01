let cart = {};

function toggleMenu() { document.getElementById("sideMenu").classList.toggle("open"); }
function toggleCart() { document.getElementById("cartDrawer").classList.toggle("open"); }

function showCategory(id, btn) {
    document.querySelectorAll(".category").forEach(c => c.style.display = "none");
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    if (id === "all") {
        document.querySelectorAll(".category").forEach(c => c.style.display = "block");
    } else {
        document.getElementById(id).style.display = "block";
    }
    if (btn) btn.classList.add("active");
}

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

function updateCart() {
    let itemsDiv = document.getElementById("cartItems");
    let total = 0, count = 0;
    itemsDiv.innerHTML = "";
    for (let item in cart) {
        let cost = cart[item].qty * cart[item].price;
        total += cost; count += cart[item].qty;
        itemsDiv.innerHTML += `
            <div style="display:flex; justify-content:space-between; padding:12px; border-bottom:1px solid #f2f2f2;">
                <span>${item} × ${cart[item].qty}</span>
                <span style="font-weight:bold;">${cost} ₪</span>
            </div>`;
    }
    document.getElementById("cartTotal").innerText = total;
    document.getElementById("cartCount").innerText = count;
    let btn = document.getElementById("sendBtn");
    btn.disabled = count === 0;
    btn.innerHTML = count === 0 ? "السلة فارغة" : "<i class='fab fa-whatsapp'></i> إرسال الطلب الآن";
}

function sendWhatsApp() {
    let text = "طلب جديد من *مجمدات المجد*:\n\n";
    for (let item in cart) {
        text += `• ${item} (${cart[item].qty}) = ${cart[item].qty * cart[item].price} ₪\n`;
    }
    text += `\n*المجموع النهائي: ${document.getElementById("cartTotal").innerText} ₪*`;
    window.open(`https://wa.me/970566706688?text=${encodeURIComponent(text)}`);
}

// تشغيل وضع "الكل" عند البداية
document.addEventListener("DOMContentLoaded", () => showCategory('all', document.querySelector(".tab")));
