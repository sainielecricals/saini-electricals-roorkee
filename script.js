const password="dhairya123";

let data=JSON.parse(localStorage.getItem("sainiData"))||{};

if(Object.keys(data).length===0){
data={
"Solar":[{name:"Solar Panel 550W",price:28000,spec:"550W Mono PERC High Efficiency",reviews:"4.6⭐ (150 reviews)",warranty:"5 Years"}]
};
save();
}

function save(){localStorage.setItem("sainiData",JSON.stringify(data));}

function render(){
const box=document.getElementById("products");
box.innerHTML="";
for(let cat in data){
data[cat].forEach((p,i)=>{
box.innerHTML+=`
<div class="card">
<h3>${p.name}</h3>
<p>₹ ${p.price}</p>
<button onclick="order('${p.name}')">Order</button>
<button onclick="deleteProduct('${cat}',${i})">Delete</button>
</div>`;
});
}
}
render();

function order(name){
window.open("https://wa.me/919548021272?text=Details about "+name);
}

function deleteProduct(cat,i){
data[cat].splice(i,1);
save();
render();
}

/* FULL ADMIN */
document.addEventListener("keydown",e=>{
if(e.key==="F2"){
let pass=prompt("Enter Admin Password:");
if(pass===password)openAdmin();
}
});

function openAdmin(){
const panel=document.getElementById("adminPanel");
panel.classList.remove("hidden");
panel.innerHTML=`
<h3>Admin Panel</h3>
<button onclick="addCategory()">Add Category</button>
<button onclick="addProduct()">Add Product</button>
<button onclick="closeAdmin()">Close</button>`;
}

function closeAdmin(){document.getElementById("adminPanel").classList.add("hidden");}

function addCategory(){
let name=prompt("New Category Name:");
if(!name)return;
data[name]=[];
save();
}

function addProduct(){
let cat=prompt("Category:");
if(!data[cat]){alert("Category not found");return;}
let name=prompt("Product Name:");
let price=prompt("Price:");
let spec=prompt("Specifications:");
let reviews=prompt("Review Summary:");
let warranty=prompt("Warranty:");
data[cat].push({name,price,spec,reviews,warranty});
save();
render();
}

/* SMART CHATBOT */
function toggleChat(){document.getElementById("chatBox").classList.toggle("hidden");}

function sendMessage(){
let input=document.getElementById("userInput");
let msg=input.value.toLowerCase();
if(!msg)return;
addChat(input.value,"right");
input.value="";
setTimeout(()=>addChat(getReply(msg),"left"),400);
}

function addChat(text,align){
let chat=document.getElementById("chatMessages");
chat.innerHTML+=`<div style="text-align:${align};margin:6px">${text}</div>`;
chat.scrollTop=chat.scrollHeight;
}

function getReply(msg){
for(let cat in data){
for(let p of data[cat]){
if(msg.includes(p.name.toLowerCase())){
return `<b>${p.name}</b><br>
₹${p.price}<br>
📦 ${p.spec}<br>
⭐ ${p.reviews}<br>
🛡 ${p.warranty}<br>
<a href='https://wa.me/919548021272' target='_blank'>Order on WhatsApp 📲</a>`;
}
}
}
return "Welcome 🙏 Type exact product name for full details.";
}
