let cart = {};

function showCategory(id, btn) {
  document.querySelectorAll(".category").forEach(c=>c.style.display="none");
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  if(id==="all"){ document.querySelectorAll(".category").forEach(c=>c.style.display="block"); }
  else document.getElementById(id).style.display="block";
  btn.classList.add("active");
}

function changeQty(name, price, change){
  if(!cart[name]) cart[name]={qty:0,price};
  cart[name].qty+=change;
  if(cart[name].qty<=0){ delete cart[name]; document.getElementById(name).innerText=0; }
  else document.getElementById(name).innerText=cart[name].qty;
  updateCart();
}

function updateCart(){
  let items=document.getElementById("cartItems");
  let total=0, count=0;
  items.innerHTML="";
  for(let item in cart){
    let cost=cart[item].qty*cart[item].price;
    total+=cost; count+=cart[item].qty;
    items.innerHTML+=`<div class="cart-item"><span>${item} × ${cart[item].qty}</span><span>${cost} ₪</span><span class="remove-item" onclick="removeItem('${item}')">✖</span></div>`;
  }
  document.getElementById("cartTotal").innerText=total;
  document.getElementById("cartCount").innerText=count;
}

function removeItem(name){ delete cart[name]; document.getElementById(name).innerText=0; updateCart(); }

function toggleCart(){ document.getElementById("cartDrawer").classList.toggle("open"); }

function sendWhatsApp(){
  let text="طلب جديد من مجمدات المجد:\n\n", total=0;
  for(let item in cart){ let cost=cart[item].qty*cart[item].price; total+=cost; text+=`${item} × ${cart[item].qty} = ${cost} ₪\n`; }
  text+=`\nالمجموع: ${total} ₪`;
  window.open(`https://wa.me/970566706688?text=${encodeURIComponent(text)}`);
}

function toggleMenu(){ 
  const menu=document.getElementById("sideMenu"); 
  menu.style.right=menu.style.right==="10px"?"-250px":"10px"; 
}

document.addEventListener("DOMContentLoaded",()=>{ showCategory("all", document.querySelector(".tab")); });

