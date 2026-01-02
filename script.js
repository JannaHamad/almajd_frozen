let cart = {};

// دالة لفتح وإغلاق القائمة الجانبية
function toggleMenu() { 
    document.getElementById("sideMenu").classList.toggle("open"); 
}

// دالة لفتح وإغلاق سلة المشتريات
function toggleCart() { 
    document.getElementById("cartDrawer").classList.toggle("open"); 
}

// دالة تبديل الأقسام وتغيير أيقونة الكل تلقائياً إذا أردت من هنا
function showCategory(id, btn) {
    document.querySelectorAll(".category").forEach(c => c.style.display = "none");
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    
    if (id === "all") {
        document.querySelectorAll(".category").forEach(c => c.style.display = "block");
    } else {
        const categoryElement = document.getElementById(id);
        if (categoryElement) categoryElement.style.display = "block";
    }
    
    if (btn) btn.classList.add("active");
}

// دالة تغيير الكمية (+ أو -)
function changeQty(name, price, change) {
    if (!cart[name]) cart[name] = { qty: 0, price };
    cart[name].qty += change;
    
    if (cart[name].qty <= 0) {
        removeFromCart(name); // حذف المنتج إذا وصل الصفر
    } else {
        const qtyLabel = document.getElementById(name);
        if (qtyLabel) qtyLabel.innerText = cart[name].qty;
        updateCart();
    }
}

// دالة الحذف النهائي عبر أيقونة سلة المهملات
function removeFromCart(name) {
    delete cart[name];
    // تصحيح العداد في واجهة المنتجات الرئيسية ليصبح 0
    const qtyLabel = document.getElementById(name);
    if (qtyLabel) qtyLabel.innerText = 0;
    updateCart();
}

// تحديث عرض السلة وإضافة أيقونة الحذف بجانب السعر
function updateCart() {
    let itemsDiv = document.getElementById("cartItems");
    let total = 0, count = 0;
    itemsDiv.innerHTML = "";
    
    for (let item in cart) {
        let cost = cart[item].qty * cart[item].price;
        total += cost; 
        count += cart[item].qty;
        
        itemsDiv.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; border-bottom:1px solid #f2f2f2;">
                <span style="font-size:14px;">${item} × ${cart[item].qty}</span>
                <div style="display:flex; align-items:center; gap:12px;">
                    <span style="font-weight:bold;">${cost} ₪</span>
                    <button onclick="removeFromCart('${item}')" style="background:none; border:none; color:#ff4d4d; cursor:pointer; font-size:16px; padding:5px;">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>`;
    }
    
    document.getElementById("cartTotal").innerText = total;
    document.getElementById("cartCount").innerText = count;
    
    let btn = document.getElementById("sendBtn");
    if (btn) {
        btn.disabled = count === 0;
        btn.innerHTML = count === 0 ? "السلة فارغة" : "<i class='fab fa-whatsapp'></i> إرسال الطلب الآن";
    }
}

// إرسال الطلب عبر واتساب
function sendWhatsApp() {
    let totalValue = document.getElementById("cartTotal").innerText;
    let text = "طلب جديد من *مجمدات المجد*:\n\n";
    
    for (let item in cart) {
        text += `• ${item} (${cart[item].qty}) = ${cart[item].qty * cart[item].price} ₪\n`;
    }
    
    text += `\n*المجموع النهائي: ${totalValue} ₪*`;
    window.open(`https://wa.me/970566706688?text=${encodeURIComponent(text)}`);
}

// تشغيل الوضع الافتراضي عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    const firstTab = document.querySelector(".tab");
    if (firstTab) showCategory('all', firstTab);
});
