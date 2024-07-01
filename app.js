document.addEventListener("DOMContentLoaded", function() {
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
    { name: 'Wire', price: 10, discount: 0 },
{ name: 'Light Bulb', price: 5, discount: 0 },
{ name: 'Vaibhav', price: 5, discount: 0 },
{ name: 'Shrijan', price: 5, discount: 0 },
{ name: 'Gourav', price: 5, discount: 0 },
{ name: 'Akshat', price: 5, discount: 0 },
{ name: 'Navveen', price: 5, discount: 0 },
{ name: 'Night and club', price: 5, discount: 0 },
{ name: 'Vanshika', price: 5, discount: 0 },
{ name: 'Charu', price: 5, discount: 0 },
{ name: 'Chitresh', price: 5, discount: 0 },
{ name: 'Madhu', price: 5, discount: 0 },
{ name: 'Maddy', price: 5, discount: 0 },
{ name: 'Srishti', price: 5, discount: 0 },
{ name: 'Finolex', price: 5, discount: 0 },
{ name: 'Pipe', price: 15, discount: 0 }
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
    productNameInput.addEventListener('input', function() {
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
                suggestionItem.addEventListener('click', function() {
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

    productForm.addEventListener('submit', function(event) {
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

    searchBar.addEventListener('input', function() {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

    printButton.addEventListener('click', function() {
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