const html = document.querySelector("#result")
const brands = document.getElementsByName("brand")
const filter = document.getElementsByName("filter")
const form = document.querySelector("#form")
const cart = document.querySelector("#cart")
const cartProductsContainer = document.querySelector("#cart-products-container")
const cartProducts = document.querySelector("#cart-products")
const cartTotal = document.querySelector("#cart-total")

// hook for calling products
const fetchProducts = async () => {
    const response = await fetch("./api/products.json")
    const data = await response.json()
    return data
}

let storedProducts = localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")) : []

const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {style: 'currency',currency: 'ARS', minimumFractionDigits: 2}).format(price)
}

const createNotification = (text) => {
    Toastify({
        text: text,
        className: "notification",
        position: "right",
        gravity: "bottom",
        duration: 2000,
        style: {
            background: "#06f"
        }
      }).showToast();
} 

const addToCart = (id) => {
    fetchProducts().then(products => {
        const addedProduct = products.find(product => product.id === id);
        const message = `¡Añadiste ${addedProduct.name.toUpperCase()} al carrito! 😎✔️`
    
        createNotification(message)
    
        storedProducts = [...storedProducts, addedProduct]
        storedProducts = storedProducts.reduce((acc, elem) => {
            const repeated = acc.find(e => e.id === elem.id)
            if(repeated){
                return [...acc]
            }else{
                return [...acc, elem]
            }
        }, [])
    
        localStorage.setItem("productsInCart", JSON.stringify(storedProducts))
    })
}

const productCheckout = (id) => {
    fetchProducts().then(products => {
        const acquiredProduct = products.find(product => product.id === id);
        const message = `¡Gracias por adquirir ${acquiredProduct.name} 🤑🔥!`
    
        createNotification(message)
    
        storedProducts = storedProducts.filter(product => product.id === id ? '' : product)
        localStorage.setItem("productsInCart", JSON.stringify(storedProducts))
    })
}

const getAllProducts = () => {
    createNotification('¡Adquiriste todos los productos! 🤯🚀')
    storedProducts = []
    localStorage.setItem("productsInCart", storedProducts)
}

const renderCart = () => {
    cartProductsContainer.classList.toggle("open")
    cartProducts.innerHTML = ''

    const totalPrice = storedProducts.reduce((acc, elem) => acc + elem.price , 0)

    storedProducts.length > 0
        ? storedProducts.map(product => {
            cartProducts.innerHTML +=
            `
            <div class="cart-product">
                <img src="${product.img}" class="cart-product-img"/>
                <div class="cart-product-data">
                    <h4 class="cart-product-name">${product.name}</h4>
                    <p class="cart-product-price">${formatPrice(product.price)}</p>
                </div>
                <button class="primary-button cart-button" onclick="productCheckout(${product.id})")>Realizar compra</button>
            </div>
            <div class="cart-total">
                
            </div>
            `
            
            cartTotal.innerHTML = `
            <p class="cart-total-price">${formatPrice(totalPrice)}</p>
            <button class="primary-button cart-button" onclick="getAllProducts()">Comprar todo</button>
            `
        })
        : (
            cartProducts.innerHTML = '<p class="empty-cart-text">¡Aún no añadiste ningún producto!</p>',
            cartTotal.innerHTML = ``
        )
}

cart.addEventListener("click", renderCart)

fetchProducts().then(products => {
    products.map(product => {
        html.innerHTML += `
                <div class="product-card" id="product-${product.id}">
                    <img src="${product.img}" alt="${product.name}" role="product-image" aria-label="product-image" loading="lazy" class="product-img"/>
                    <div class="product-data-ctn">
                        <div class="product-data">
                            <h2 class="product-name">${product.name.toUpperCase()}</h2>
                            <span class="product-price">${formatPrice(product.price)}</span>
                        </div>
                        <button class="primary-button" onclick="addToCart(${product.id})">Agregar al carrito</button>
                    </div>
                </div>`
    })
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    html.innerHTML = '';
    const brandSelected = [];
    let filterSelected;

    fetchProducts().then(products => {
        for(brand of brands){
            brand.checked && brandSelected.push(brand.value)
        }
    
        for(f of filter){
            f.selected ? filterSelected = f : '';
        }
    
        const filterBrands = brandSelected.length && brandSelected.map(brand => products.filter(product => product.brand.toUpperCase() === brand.toUpperCase() && product)).reduce((a, b) => [...a, ...b]);
    
        const filteredProducts = filterBrands && filterBrands.sort((a, b) => {
            if(filterSelected?.value === "menor-mayor"){
                if(a.price < b.price) return -1
                if(a.price > b.price) return 1
                return 0
            }
    
            if(filterSelected?.value === "mayor-menor"){
                if(a.price > b.price) return -1
                if(a.price < b.price) return 1
                return 0
            }
                    
            if(filterSelected?.value === "a-z"){
                if(a.name < b.name) return -1
                if(a.name > b.name) return 1
                return 0
            }
    
            if(filterSelected?.value === "z-a"){
                if(a.name > b.name) return -1
                if(a.name < b.name) return 1
                return 0
            }
        })
    
        const createHtml = () => {
            return filteredProducts && filteredProducts.map(product => {
                html.innerHTML += `
                <div class="product-card" id="product-${product.id}">
                    <img src="${product.img}" alt="${product.name}" role="product-image" aria-label="product-image" loading="lazy" class="product-img"/>
                    <div class="product-data-ctn">
                        <div class="product-data">
                            <h2 class="product-name">${product.name.toUpperCase()}</h2>
                            <span class="product-price">${formatPrice(product.price)}</span>
                        </div>
                        <button class="primary-button" onclick="addToCart(${product.id})">Agregar al carrito</button>
                    </div>
                </div>
            `})
        }
        return createHtml();
    })
})