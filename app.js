document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById('productForm');
    const productNameInput = document.getElementById('productName');
    const suggestionsBox = document.getElementById('suggestions');
    const productList = document.getElementById('productList');
    const searchBar = document.getElementById('searchBar');
    const printButton = document.getElementById('printButton');
    const quantityInput = document.getElementById('quantity');
    const priceInput = document.getElementById('price');
    const discountInput = document.getElementById('discount');
    const customerNameInput = document.getElementById('customerName');
    const customerMobileInput = document.getElementById('customerMobile');

    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Predefined product list
    const predefinedProducts = [
        { name: 'PVC Pipe 1', price: 150, discount: 0 },
        { name: 'PVC Pipe 2', price: 175, discount: 0 },
        { name: 'CPVC Pipe 1', price: 200, discount: 0 },
        { name: 'CPVC Pipe 2', price: 225, discount: 0 },
        { name: 'UPVC Pipe 1', price: 250, discount: 0 },
        { name: 'UPVC Pipe 2', price: 275, discount: 0 },
        { name: 'HDPE Pipe 1', price: 300, discount: 0 },
        { name: 'HDPE Pipe 2', price: 325, discount: 0 },
        { name: 'GI Pipe 1', price: 350, discount: 0 },
        { name: 'GI Pipe 2', price: 375, discount: 0 },
        { name: 'Copper Pipe 1', price: 400, discount: 0 },
        { name: 'Copper Pipe 2', price: 425, discount: 0 },
        { name: 'Steel Pipe 1', price: 450, discount: 0 },
        { name: 'Steel Pipe 2', price: 475, discount: 0 },
        { name: 'Cast Iron Pipe 1', price: 500, discount: 0 },
        { name: 'Cast Iron Pipe 2', price: 525, discount: 0 },
        { name: 'PVC Conduit Pipe 1', price: 550, discount: 0 },
        { name: 'PVC Conduit Pipe 2', price: 575, discount: 0 },
        { name: 'CPVC Conduit Pipe 1', price: 600, discount: 0 },
        { name: 'CPVC Conduit Pipe 2', price: 625, discount: 0 },
        { name: 'UPVC Conduit Pipe 1', price: 650, discount: 0 },
        { name: 'UPVC Conduit Pipe 2', price: 675, discount: 0 },
        { name: 'HDPE Conduit Pipe 1', price: 700, discount: 0 },
        { name: 'HDPE Conduit Pipe 2', price: 725, discount: 0 },
        { name: 'Flexible PVC Pipe 1', price: 750, discount: 0 },
        { name: 'Flexible PVC Pipe 2', price: 775, discount: 0 },
        { name: 'Flexible Metal Pipe 1', price: 800, discount: 0 },
        { name: 'Flexible Metal Pipe 2', price: 825, discount: 0 },
        { name: 'PVC Drainage Pipe 1', price: 850, discount: 0 },
        { name: 'PVC Drainage Pipe 2', price: 875, discount: 0 },
        { name: 'Corrugated PVC Pipe 1', price: 900, discount: 0 },
        { name: 'Corrugated PVC Pipe 2', price: 925, discount: 0 },
        { name: 'Galvanized Iron Pipe 1', price: 950, discount: 0 },
        { name: 'Galvanized Iron Pipe 2', price: 975, discount: 0 },
        { name: 'Stainless Steel Pipe 1', price: 1000, discount: 0 },
        { name: 'Stainless Steel Pipe 2', price: 1025, discount: 0 },
        { name: 'Black Iron Pipe 1', price: 1050, discount: 0 },
        { name: 'Black Iron Pipe 2', price: 1075, discount: 0 },
        { name: 'ABS Pipe 1', price: 1100, discount: 0 },
        { name: 'ABS Pipe 2', price: 1125, discount: 0 },
        { name: 'Polyethylene Pipe 1', price: 1150, discount: 0 },
        { name: 'Polyethylene Pipe 2', price: 1175, discount: 0 },
        { name: 'PVC-U Pipe 1', price: 1200, discount: 0 },
        { name: 'PVC-U Pipe 2', price: 1225, discount: 0 },
        { name: 'PVC-O Pipe 1', price: 1250, discount: 0 },
        { name: 'PVC-O Pipe 2', price: 1275, discount: 0 },
        { name: 'PVC-M Pipe 1', price: 1300, discount: 0 },
        { name: 'PVC-M Pipe 2', price: 1325, discount: 0 },
        { name: 'PVC-C Pipe 1', price: 1350, discount: 0 },
        { name: 'PVC-C Pipe 2', price: 1375, discount: 0 },
        { name: 'PVC-H Pipe 1', price: 1400, discount: 0 },
        { name: 'PVC-H Pipe 2', price: 1425, discount: 0 }


        // { name: 'Pipe', price: 15, discount: 0 },
    ];

    function displayProducts(filteredProducts = products) {
        productList.innerHTML = '';
        filteredProducts.forEach((product) => {
            const discountAmount = (product.discount / 100) * product.price;
            const total = (product.price - discountAmount) * product.quantity;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${product.discount}%</td>
                <td>${total.toFixed(2)}</td>
            `;
            productList.appendChild(row);
        });
    }

    // Auto-suggest for product names
    productNameInput.addEventListener('input', function () {
        const searchTerm = productNameInput.value.toLowerCase();
        suggestionsBox.innerHTML = '';
        if (searchTerm) {
            const suggestions = predefinedProducts.filter(product =>
                product.name.toLowerCase().startsWith(searchTerm)
            );
            suggestions.forEach(product => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.textContent = product.name;
                suggestionItem.addEventListener('click', function () {
                    productNameInput.value = product.name;
                    priceInput.value = product.price;
                    discountInput.value = product.discount;
                    quantityInput.value = 1;
                    suggestionsBox.innerHTML = '';
                });
                suggestionsBox.appendChild(suggestionItem);
            });
            suggestionsBox.style.display = 'block';
        } else {
            suggestionsBox.style.display = 'none';
        }
    });

    productForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = productNameInput.value;
        const quantity = parseInt(quantityInput.value);
        const price = parseFloat(priceInput.value);
        const discount = parseFloat(discountInput.value);

        products.push({ name, quantity, price, discount });
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        productForm.reset();
        priceInput.value = '';
        discountInput.value = 0;
        quantityInput.value = 1;
    });

    searchBar.addEventListener('input', function () {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

    printButton.addEventListener('click', function () {
        const customerName = customerNameInput.value;
        const customerMobile = customerMobileInput.value;

        if (customerName && customerMobile) {
            const queryParams = new URLSearchParams({
                customerName,
                customerMobile,
                products: encodeURIComponent(JSON.stringify(products))
            }).toString();

            window.location.href = `billing.html?${queryParams}`;
            localStorage.removeItem('products');
        } else {
            alert("Please enter customer details.");
        }
    });

    displayProducts();
});