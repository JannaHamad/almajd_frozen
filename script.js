let cart = {};

document.addEventListener("DOMContentLoaded", () => {
    // عرض كل المنتجات عند التحميل
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
        const target = document.getElementById(id);
        if(target) target.style.display = "block";
    }
    if(btn) btn.classList.add("active");
}

function changeQty(name, price, change) {
    if (!cart[name]) cart[name] = { qty: 0, price: price };
    
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
    let totalSpan = document.getElementById("cartTotal");
    let countSpan = document.getElementById("cartCount");
    let sendBtn = document.getElementById("sendBtn");
    
    let total = 0, count = 0;
    itemsDiv.innerHTML = "";

    const items = Object.keys(cart);
    if (items.length === 0) {
        itemsDiv.innerHTML = `<div style="text-align:center; padding:40px; color:#999;">السلة فارغة</div>`;
        sendBtn.disabled = true;
        sendBtn.innerText = "السلة فارغة";
    } else {
        items.forEach(item => {
            let cost = cart[item].qty * cart[item].price;
            total += cost; 
            count += cart[item].qty;
            itemsDiv.innerHTML += `
                <div style="display:flex; justify-content:space-between; padding:12px; border-bottom:1px solid #eee;">
                    <span>${item} × ${cart[item].qty}</span>
                    <span style="font-weight:bold;">${cost} ₪</span>
                </div>`;
        });
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<i class="fab fa-whatsapp"></i> إرسال الطلب عبر واتساب';
    }
    totalSpan.innerText = total;
    countSpan.innerText = count;
}

function sendWhatsApp() {
    let text = "طلب جديد من مجمدات المجد:\n\n";
    let total = 0;
    for (let item in cart) {
        let cost = cart[item].qty * cart[item].price;
        total += cost;
        text += `• ${item} (${cart[item].qty}) = ${cost} ₪\n`;
    }
    text += `\nالمجموع النهائي: ${total} ₪`;
    window.open(`https://wa.me/970566706688?text=${encodeURIComponent(text)}`);
}
