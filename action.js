

document.addEventListener("DOMContentLoaded",function(){

    let products =fetch('./products.json').json();

    displayProducts(products);
})



function displayProducts(products){

    let productsContainer=document.getElementById('product');

    products.array.forEach(product => {

        productsContainer.innerHTML +=
        `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.decription}</td>
            <td>${product.price}</td>
            <td><button onclick="updateById(${product.id})">Update</button></td>
            <td><button onclick="deleteById(${product.id})">Update</button></td>
        `
    });

}

