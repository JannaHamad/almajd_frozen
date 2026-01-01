let cart = {};

document.addEventListener("DOMContentLoaded", () => {
    // عند تحميل الصفحة، يتم عرض الكل تلقائياً
    showCategory("all", document.querySelector(".tab"));
    updateCart();
});

function toggleMenu() {
    document.getElementById("sideMenu").classList.toggle("open");
}

function toggleCart() {
    document.getElementById("cartDrawer").classList.toggle("open");
}

function showCategory(id, btn) {
    // إخفاء جميع الأقسام أولاً
    document.querySelectorAll(".category").forEach(c => {
        c.style.display = "none";
    });
    
    // إزالة اللون النشط من جميع التبويب (الأزرار)
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

    // التعديل الجوهري لعرض "الكل"
    if (id === "all") {
        document.querySelectorAll(".category").forEach(c => {
            c.style.display = "block"; // عرض كل الأقسام تحت بعضها
        });
    } else {
        // عرض القسم المختار فقط
        const target = document.getElementById(id);
        if (target) {
            target.style.display = "block";
        }
    }
    
    // تفعيل الزر الذي تم الضغط عليه
    if (btn) btn.classList.add("active");
}

function changeQty(name, price, change) {
    if (!cart[name]) cart[name] = { qty: 0, price };
    cart[name].qty += change;

    // إذا وصلت الكمية لصفر أو أقل، نحذف الصنف من السلة
    if (cart[name].qty <= 0) {
        delete cart[name];
        // تحديث الرقم الظاهر في بطاقة المنتج إلى 0
        const qtySpan = document.getElementById(name);
        if (qtySpan) qtySpan.innerText = 0;
    } else {
        // تحديث الرقم الظاهر في بطاقة المنتج
        const qtySpan = document.getElementById(name);
        if (qtySpan) qtySpan.innerText = cart[name].qty;
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

    if (Object.keys(cart).length === 0) {
        itemsDiv.innerHTML = "<div style='text-align:center; padding:40px; color:#aaa;'>السلة فارغة حالياً</div>";
        sendBtn.disabled = true;
        sendBtn.innerText = "السلة فارغة";
    } else {
        for (let item in cart) {
            let cost = cart[item].qty * cart[item].price;
            total += cost;
            count += cart[item].qty;

            // عرض المنتجات داخل الدرج الجانبي للسلة
            itemsDiv.innerHTML += `
                <div style="display:flex; justify-content:space-between; padding:12px; border-bottom:1px solid #f2f2f2;">
                    <span>${item} × ${cart[item].qty}</span>
                    <span style="font-weight:bold;">${cost} ₪</span>
                </div>`;
        }
        sendBtn.disabled = false;
        sendBtn.innerHTML = "<i class='fab fa-whatsapp'></i> إرسال الطلب الآن";
    }

    totalSpan.innerText = total;
    countSpan.innerText = count;
}

function sendWhatsApp() {
    let text = "طلب جديد من *مجمدات المجد*:\n\n";
    let total = 0;

    for (let item in cart) {
        let cost = cart[item].qty * cart[item].price;
        total += cost;
        text += `• ${item} (${cart[item].qty}) = ${cost} ₪\n`;
    }

    text += `\n*المجموع النهائي: ${total} ₪*`;
    // رقم الواتساب الخاص بك مع نص الطلب المشفر
    window.open(`https://wa.me/970566706688?text=${encodeURIComponent(text)}`);
}
