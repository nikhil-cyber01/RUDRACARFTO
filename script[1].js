const products=[
  {name:"Premium Photo Frame",price:299},
  {name:"PVC Visiting Cards",price:499},
  {name:"Passport Size Photo Print",price:149},
  {name:"Wedding Card",price:12},
  {name:"Photo Collage Frame",price:799}
];
let cart=[];

function renderProducts(){
  document.getElementById("productGrid").innerHTML=products.map((p,i)=>`
    <article class="product">
      <div class="product-img"><div class="fake-product">YOUR<br>PHOTO</div></div>
      <div class="product-info">
        <h3>${p.name}</h3><div class="price">₹${p.price}</div>
        <div class="rating">★★★★★ <span style="color:#888">(4.8)</span></div>
        <button class="add" onclick="addProduct(${i})">Add to Cart</button>
      </div>
    </article>`).join("");
}
function addProduct(i){cart.push({name:products[i].name,price:products[i].price});updateCart();alert("Product added to cart.");}
function addCustomToCart(){
  const size=document.getElementById("sizeSelect");
  cart.push({name:"Customized Photo Frame ("+size.options[size.selectedIndex].text.split("—")[0].trim()+")",price:Number(size.value)});
  updateCart();alert("Customized frame added to cart.");
}
function updateCart(){
  document.getElementById("cartCount").textContent=cart.length;
  document.getElementById("modalCount").textContent=cart.length;
  document.getElementById("cartTotal").textContent=cart.reduce((s,x)=>s+x.price,0);
  document.getElementById("cartItems").innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-item"><span>${x.name}</span><b>₹${x.price}</b></div>`).join(""):"<p>Your cart is empty.</p>";
}
function openCart(){updateCart();document.getElementById("cartModal").classList.add("show")}
function closeCart(){document.getElementById("cartModal").classList.remove("show")}
function checkout(){
  if(!cart.length){alert("Your cart is empty.");return}
  const total=cart.reduce((s,x)=>s+x.price,0);
  alert("Demo Checkout\\nTotal: ₹"+total+"\\n\\nFor live orders, connect a payment gateway and order database.");
}
function scrollToSection(id){document.getElementById(id).scrollIntoView({behavior:"smooth"})}
function updatePrice(){document.getElementById("customPrice").textContent=document.getElementById("sizeSelect").value}
function changeFrame(){
  const f=document.getElementById("previewFrame");
  f.className="preview-frame "+document.getElementById("colorSelect").value;
}
document.getElementById("photoUpload").addEventListener("change",e=>{
  const file=e.target.files[0]; if(!file)return;
  const img=document.getElementById("previewImg");
  img.src=URL.createObjectURL(file); img.classList.add("visible");
  document.getElementById("previewText").style.display="none";
});
renderProducts(); updateCart();
