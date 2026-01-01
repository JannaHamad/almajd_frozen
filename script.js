let cart = {};

document.addEventListener("DOMContentLoaded", () => {
    showCategory("meat", document.querySelector(".tab"));
    updateCart();
});

function toggleMenu() {
    document.getElementById("sideMenu").classList.toggle("open");
}

function toggleCart() {
    document.getElementById("cartDrawer").classList.toggle("open");
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
    if (cart[name].qty <= 0) {
        delete cart[name];
        document.getElementById(name).innerText = 0;
    } else {
        document.getElementById(name).innerText = cart[name].qty;
    }
    updateCart();
}

function updateCart() {
    const itemsDiv = document.getElementById("cartItems");
    const totalSpan = document.getElementById("cartTotal");
    const countSpan = document.getElementById("cartCount");
    const sendBtn = document.getElementById("sendBtn");

    let total = 0, count = 0;
    itemsDiv.innerHTML = "";

    if (Object.keys(cart).length === 0) {
        itemsDiv.innerHTML = `<p class="empty-cart">السلة فارغة</p>`;
        sendBtn.disabled = true;
        sendBtn.innerText = "السلة فارغة";
    } else {
        for (let item in cart) {
            const cost = cart[item].qty * cart[item].price;
            total += cost;
            count += cart[item].qty;

            itemsDiv.innerHTML += `
                <div class="cart-row">
                    <span>${item} × ${cart[item].qty}</span>
                    <strong>${cost} ₪</strong>
                </div>`;
        }
        sendBtn.disabled = false;
        sendBtn.innerHTML = `<i class="fab fa-whatsapp"></i> إرسال الطلب`;
    }

    totalSpan.innerText = total;
    countSpan.innerText = count;
}

function sendWhatsApp() {
    let msg = "طلب جديد من مجمدات المجد:\n\n";
    let total = 0;

    for (let item in cart) {
        const cost = cart[item].qty * cart[item].price;
        total += cost;
        msg += `• ${item} (${cart[item].qty}) = ${cost} ₪\n`;
    }

    msg += `\nالمجموع: ${total} ₪`;
    window.open(`https://wa.me/970566706688?text=${encodeURIComponent(msg)}`);
}
