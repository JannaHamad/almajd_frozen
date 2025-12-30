let cart = {};

// السطر المهم جداً لبدء عرض البيانات
document.addEventListener("DOMContentLoaded", () => {
    showCategory("all", document.querySelector(".tab"));
});

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

function toggleMenu() {
    document.getElementById("sideMenu").classList.toggle("open");
}

function toggleCart() {
    document.getElementById("cartDrawer").classList.toggle("open");
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
    let items = document.getElementById("cartItems");
    let total = 0, count = 0;
    items.innerHTML = "";
    for (let item in cart) {
        let cost = cart[item].qty * cart[item].price;
        total += cost; count += cart[item].qty;
        items.innerHTML += `
            <div class="cart-item" style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px dashed #eee;">
                <span>${item} × ${cart[item].qty}</span>
                <span>${cost} ₪</span>
            </div>`;
    }
    document.getElementById("cartTotal").innerText = total;
    document.getElementById("cartCount").innerText = count;
}

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
