const productList = document.getElementById('product-list');
const productForm = document.getElementById('product-form');
const productName = document.getElementById('product-name');
const productPrice = document.getElementById('product-price');
const productID =document.getElementById('product-id')
let errorName = document.getElementById('error-name');
let errorPrice = document.getElementById('error-price');
let products =[]
function getProduct(){
    fetch('http://localhost:3300/products').then(Response => Response.json()).then(data => {
        products = data;
        disPlayproduct();
    })
}
function disPlayproduct(){
    productList.innerHTML=`
    <tr>
            <th>id</th>
            <th>name</th>
            <th>price</th>
            <th>chuc nang</th>
        </tr>
        ${products.map(product =>`
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
            <button class="delete" type="submit" data-id="${product.id}">xoa</button>
            </td>
        </tr>
        `).join('')}
    `
}
function addProduct(Event){
Event.preventDefault()
let flag =false;
if(productName.value == ""){
    errorName.innerText="dasda";
    flag= true;
}
if(productPrice.value == ""){
    errorPrice.innerText="dasda";
    flag= true;
}
if(!flag){
    const product ={
        name:productName.value,
        price:productPrice.value
    }
    fetch('http://localhost:3300/products', {
        method:"POST",
        headers:{
            'content-Type':"applacation/json"
        },
        body:JSON.stringify(product)
    }).then(Response => Response.json()).then(data =>{
        products.push(data);
        disPlayproduct()
    })
}
}
productForm.addEventListener('submit', Event =>{
    addProduct(Event)
})
getProduct()