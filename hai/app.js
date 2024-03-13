const productList = document.getElementById('product-list');
const productForm = document.getElementById('product-form');
const productName = document.getElementById('product-name');
const productPrice = document.getElementById('product-price');
const productID =document.getElementById('product-id')
let errorName = document.getElementById('error-name');
let errorPrice = document.getElementById('error-price');
let products =[]

function getProduct(){
    fetch('http://localhost:3000/products').then(Response => Response.json()).then(data => {
        products =data
         disPlayproduct()
    }).catch(error => console.error())
}
function disPlayproduct(){
    productList.innerHTML=`
    <tr>
            <th>name</th>
            <th>eqweq</th>
            <th>qweqw</th>
            
            </tr>
            ${products.map(product=> `
            <tr>
            <td>${product.name}</td>
            <td>${product.name}</td>
            <td><button class="delete" type="submit" data-id="${product.name}">xoa</button></td>
            
            </tr>
            `).join("")}
    `
}
function addProduct(Event){
Event.preventDefault();
let flag =false
if(productName.value == ""){
    flag =true
}
if(productPrice.value == ""){
    flag =true
}
if(!flag){
    const product ={
        name:productName.value,
        price:productPrice.value
    }
    fetch('http://localhost:3000/products', {
        method:"POST",
        headers:{
            'content-Type':"application/json"
        },
        body:JSON.stringify(product)
    }).then(Response => Response.json()).then(data =>{
        products.push(data);
        disPlayproduct()
    })
}
}
productForm.addEventListener('submit', Event =>{
    addProduct(Event);
})
function deleteProduct(Event){
const productID=Event.target.dataset.id
fetch(`http://localhost:3000/products/${productID}`,{
    method:"DELETE"
}).then(Response =>{
    products =products.filter(product => product.id != productID);
    disPlayproduct()
})
}

productList.addEventListener('click', Event=>{
    if(Event.target.classList.contains('delete')){
        deleteProduct(Event)
    }
})
getProduct()