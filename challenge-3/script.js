const html = document.querySelector("#result")
const brands = document.getElementsByName("brand")
const filter = document.getElementsByName("filter")
const form = document.querySelector("#form")
const cart = document.querySelector("#cart")
const cartProductsContainer = document.querySelector("#cart-products-container")
const cartProducts = document.querySelector("#cart-products")
const cartTotal = document.querySelector("#cart-total")

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
        duration: 1000,
        style: {
            background: "#06f"
        }
      }).showToast();
} 

const addToCart = (id) => {
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
}

const productCheckout = (id) => {
    const acquiredProduct = products.find(product => product.id === id);
    const message = `¡Gracias por adquirir ${acquiredProduct.name} 🤑🔥!`

    createNotification(message)

    storedProducts = storedProducts.filter(product => product.id === id ? '' : product)
    localStorage.setItem("productsInCart", JSON.stringify(storedProducts))
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

const products = [
    { id: 1, name: 'MACBOOK PRO 16" APPLE M1 PRO CHIP 10-CORE CPU 16-CORE GPU - 1TB SSD - SILVER', brand:'apple', price: 720000, img: 'https://i.ibb.co/sgy3RmQ/MK1-F3-LEA-1.jpg'},
    { id: 2, name: 'APPLE MACBOOK AIR 13M1-8GB256GB GR', brand:'apple', price: 593250, img: 'https://i.ibb.co/rdwFPWq/APPLE-MACBOOK-AIR-13-M18-GB256-GB-GR.jpg'},
    { id: 3, name: 'Apple MacBook Pro MNEJ3LL/A Chip M2 512GB SSD 8GB 13″ Space Gray', brand:'apple', price: 390000, img: 'https://i.ibb.co/6WS1zMQ/SPG-1-FINAL.jpg'},
    { id: 4, name: 'Notebook MSI Summit E16Flip A12UCT I7-1280P RTX 3050 1TB SSD 16GB 16″ 165Hz + Pen Ink Black', brand:'msi', price: 499000, img: 'https://i.ibb.co/fpQn03c/Summit-E16-Flip-con-lapiz-1.jpg'},
    { id: 5, name: 'NOTEBOOK MSI KATANA GF66 15.6″ FHD 144HZ CORE I5 16GB', brand:'msi', price: 404400, img: 'https://i.ibb.co/F7783jf/NOT324.jpg'},
    { id: 6, name: 'Notebook MSI Delta 15 A5EFK-001US Gaming Ryzen 7 5800H RX 6700M 1TB SSD 16GB 15.6″ 240Hz', brand:'msi', price: 399000, img: 'https://i.ibb.co/C7K2FqR/MSI-DELTA-1.png'},
    { id: 7, name: 'Notebook Asus ZenBook UX482EAR-DB71T i7-1195G7 512GB SSD 8GB 14″ Touchscreen', brand:'asus', price: 319000, img: 'https://eclypse.com.ar/wp-content/uploads/2022/08/duo-final-1.jpg'},
    { id: 8, name: 'Notebook Asus Tuf FX706HE-211.TM17 i5-11260H RTX 3050Ti 512GB SSD 8GB 17.3″ 144Hz', brand:'asus', price: 234900, img: 'https://i.ibb.co/5YDSNv7/final1-1.jpg'},
    { id: 9, name: 'Notebook ASUS S513E K513EQ-NB74 I7-1165G7 MX350 512GB SSD 8GB 15.6″', brand:'asus', price: 224900, img: 'https://i.ibb.co/s6J4Try/asus-modificada.jpg'},
    { id: 10, name: 'Notebook HP OMEN 15-EN1570WM RYZEN 7 5800H RTX 3070 1TB SSD 24GB 15.6″ 144Hz', brand:'hp', price: 401200, img: 'https://i.ibb.co/ggCN7mX/d15hp.jpg'},
    { id: 11, name: 'Notebook HP Pavilion 15Z-EH100 Ryzen 7 5700U 1TB SSD 16GB 15.6″', brand:'hp', price: 202175, img: 'https://i.ibb.co/Nr9tkD9/HP-PAVILLION-1.jpg'},
    { id: 12, name: 'Notebook HP 15-EF2126 Ryzen 5 5500U 1TB SSD 32GB 15.6″', brand:'hp', price: 166100, img: 'https://i.ibb.co/Q6Pm4m2/HP2.jpg'},
    { id: 13, name: 'Notebook Lenovo ThinkBook 15 G2 ITL 20VE00L3AR I7-1165G7 256GB SSD 8GB 15.6″ Win 10 Pro', brand:'lenovo', price: 219000, img: 'https://i.ibb.co/zn4Zt8D/lenovo-thinkbook-2.png'},
    { id: 14, name: 'Notebook Lenovo ThinkPad T14 20W000T9US i5-1135G7 8GB 256GB SSD 14″', brand:'lenovo', price: 249000, img: 'https://i.ibb.co/Qrt51kw/lenovo-t14-g2-final.jpg'},
    { id: 15, name: 'Notebook Lenovo IdeaPad Gaming 3 15IHU6 82K1015CUS i5-11300H GTX 1650 256GB SSD+960GB SSD 16GB 15.6″', brand:'lenovo', price: 202500, img: 'https://i.ibb.co/QbGF4VQ/lenovo-gaming-final-1.jpg'},
]

form.addEventListener("submit", (e) => {
    e.preventDefault();
    html.innerHTML = '';

    const brandSelected = [];
    let filterSelected;

    for(brand of brands){
        if(brand.checked){
            brandSelected.push(brand.value)
        }else{
        }
    }

    for(f of filter){
        f.selected ? filterSelected = f : '';
    }

    if(brandSelected.length < 1 || !filterSelected){
        return alert("Debes completar el formulario para realizar una búsqueda.")
    }
    const array = brandSelected.map(brand => products.filter(product => product.brand.toUpperCase() === brand.toUpperCase() && product))

    const filterBrands = brandSelected.map(brand => products.filter(product => product.brand.toUpperCase() === brand.toUpperCase() && product)).reduce((a,b) => [...a, ...b]);

    const filteredProducts = filterBrands.sort((a, b) => {
        if(filterSelected.value === "menor-mayor"){
            if(a.price < b.price) return -1
            if(a.price > b.price) return 1
            return 0
        }

        if(filterSelected.value === "mayor-menor"){
            if(a.price > b.price) return -1
            if(a.price < b.price) return 1
            return 0
        }
                
        if(filterSelected.value === "a-z"){
            if(a.name < b.name) return -1
            if(a.name > b.name) return 1
            return 0
        }

        if(filterSelected.value === "z-a"){
            if(a.name > b.name) return -1
            if(a.name < b.name) return 1
            return 0
        }
    })

    const createHtml = () => {
        return filteredProducts.map(product => {
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