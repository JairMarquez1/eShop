let carts = document.querySelectorAll('.add-cart');
let products = 
[
    {
    name: 'Black Shirt',
    tag: 'shirt1',
    price: 300,
    inCart: 0
    },
    {
    name: 'White Shirt',
    tag: 'shirt2',
    price: 500,
    inCart: 0
    },
    {
    name: 'Blue Shirt',
    tag: 'shirt3',
    price: 420,
    inCart: 0
    },
    {
    name: 'Green Shirt',
    tag: 'shirt4',
    price: 209,
    inCart: 0
    }        
]
for (let i=0; i<carts.length; i++){
    carts[i].addEventListener("click", () => {cartNumbers(products[i]);
    totalCost(products[i]);
    })
}

function onLoadCartNumber(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers){
    localStorage.setItem('cartNumbers', ++productNumbers);
    document.querySelector('.cart span').textContent = productNumbers;
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product){

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null){
        if (cartItems[product.name] == undefined){
            cartItems = {
                ...cartItems,
                [product.name]:product
            }
        }
        cartItems[product.name].inCart += 1; 
    }
    else{
        product.inCart = 1;
        cartItems = {
            [product.name]: product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify (cartItems));
}

function totalCost(product){
    //console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', product.price + cartCost);
    }
    else{
        localStorage.setItem('totalCost', product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="fullproduct">
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}</div>
            <div class="quantity">
                <ion-icon class="decrease" name="arrow-back-circle"></ion-icon><span>&nbsp&nbsp&nbsp${item.inCart}&nbsp&nbsp&nbsp</span>
                <ion-icon class= "increase" name="arrow-forward-circle"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price}
            </div>
            </div>
            `
        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">Basket Total</h4>
            <h4 class="basketTotal">$${cartCost}.00</h4>
        </div>
        `
    }
}



onLoadCartNumber();
displayCart();