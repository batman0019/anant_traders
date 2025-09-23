// Lightweight app logic: products, cart, filters, auth stubs
const PRODUCTS = [
  {id:1,title:'Blue Cotton T-shirt',category:'tshirt',price:499,image:'assets/p1.png'},
  {id:2,title:'Red Silk Saree',category:'saree',price:2499,image:'assets/p2.png'},
  {id:3,title:'Green Kurta',category:'kurta',price:999,image:'assets/p3.png'},
  {id:4,title:'Comfort Nightwear',category:'nightwear',price:699,image:'assets/p4.png'}
];

let VIEW = 'grid';

function $(sel){return document.querySelector(sel)}
function $all(sel){return Array.from(document.querySelectorAll(sel))}

function renderProducts(list){
  const container = $('#products');
  if(!container) return;
  container.innerHTML = '';
  list.forEach(p=>{
    const div = document.createElement('div');
    div.className = 'product card';
    div.innerHTML = `
      <div class="media"><img src="${p.image}" alt="${p.title}"></div>
      <div class="body">
        <h4>${p.title}</h4>
        <p class="muted">Category: ${p.category}</p>
        <div class="actions">
          <div class="price">₹${p.price}</div>
          <div>
            <button class="btn-outline" onclick="viewProduct(${p.id})">View</button>
            <button class="btn-primary" onclick="addToCart(${p.id})">Add</button>
          </div>
        </div>
      </div>`;
    container.appendChild(div);
  });
  updateCartCount();
}

function filterProducts(cat){
  $('#category-filter').value = cat;
  applyFilters();
  window.scrollTo({top:300,behavior:'smooth'});
}

function applyFilters(){
  const cat = $('#category-filter')?.value || 'all';
  const sort = $('#sort-select')?.value || 'popular';
  let list = PRODUCTS.slice();
  if(cat !== 'all') list = list.filter(p=>p.category===cat);
  if(sort === 'price-asc') list.sort((a,b)=>a.price-b.price);
  if(sort === 'price-desc') list.sort((a,b)=>b.price-a.price);
  renderProducts(list);
}

function toggleView(v){
  VIEW = v;
  $('#grid-btn').classList.toggle('active', v==='grid');
  $('#list-btn').classList.toggle('active', v==='list');
  // list view could change card styles — omitted for brevity
}

function addToCart(id){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const item = cart.find(i=>i.id===id);
  if(item) item.qty += 1; else cart.push({id,qty:1});
  localStorage.setItem('cart', JSON.stringify(cart));
  showToast('Added to cart');
  updateCartCount();
}

function updateCartCount(){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  $('#cart-count').textContent = cart.reduce((s,i)=>s+i.qty,0);
}

function viewProduct(id){ showToast('Product view (TODO)'); }

function showToast(msg, timeout=1800){
  const t = $('#toast');
  t.textContent = msg; t.classList.remove('hidden');
  setTimeout(()=>t.classList.add('hidden'), timeout);
}

function clearCart(){
  localStorage.removeItem('cart');
  renderCart();
  updateCartCount();
  showToast('Cart cleared');
}

function renderCart(){
  const list = JSON.parse(localStorage.getItem('cart')||'[]');
  const out = $('#cart-list');
  if(!out) return;
  if(list.length===0){ out.innerHTML='<p class="muted">Your cart is empty.</p>'; return; }
  out.innerHTML = '';
  list.forEach(it=>{
    const p = PRODUCTS.find(x=>x.id===it.id);
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `<img src="${p.image}"><div><h4>${p.title}</h4><p>Qty: ${it.qty} • ₹${p.price}</p></div>`;
    out.appendChild(div);
  });
}

function proceedCheckout(){ showToast('Checkout (mock) — implement payments'); }

// Auth stubs
async function handleSignup(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  // TODO: call backend /api/signup to create account + OTP
  showToast('Signup submitted — check console (TODO: connect to backend)');
  console.log(Object.fromEntries(fd.entries()));
  return false;
}

async function handleLogin(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  // TODO: call backend /api/login and set session token
  showToast('Login submitted — check console (TODO: connect to backend)');
  console.log(Object.fromEntries(fd.entries()));
  return false;
}

function addProduct(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  console.log('Add product', Object.fromEntries(fd.entries()));
  showToast('Product added (mock)');
  return false;
}

// init
document.addEventListener('DOMContentLoaded', ()=>{
  applyFilters();
  renderCart();
  document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
});
