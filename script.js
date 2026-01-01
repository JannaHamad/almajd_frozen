let cart = {};

document.addEventListener("DOMContentLoaded", () => {
    // عرض الكل عند فتح الصفحة
    showCategory("all", document.querySelector(".tab"));
    updateCart();
});

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
        if(document.getElementById(name)) document.getElementById(name).innerText = 0;
    } else {
        if(document.getElementById(name)) document.getElementById(name).innerText = cart[name].qty;
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
        itemsDiv.innerHTML += `<div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee;"><span>${item} × ${cart[item].qty}</span><b>${cost} ₪</b></div>`;
    }
    document.getElementById("cartTotal").innerText = total;
    document.getElementById("cartCount").innerText = count;
    let btn = document.getElementById("sendBtn");
    btn.disabled = count === 0;
    btn.innerText = count === 0 ? "السلة فارغة" : "إرسال الطلب الآن";
}

function sendWhatsApp() {
    let text = "طلب جديد من *مجمدات المجد*:\n\n";
    for (let item in cart) {
        text += `• ${item} (${cart[item].qty}) = ${cart[item].qty * cart[item].price} ₪\n`;
    }
    text += `\n*المجموع النهائي: ${document.getElementById("cartTotal").innerText} ₪*`;
    window.open(`https://wa.me/970566706688?text=${encodeURIComponent(text)}`);
}
