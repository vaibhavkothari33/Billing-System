function goBack() {
    localStorage.removeItem('customerName');
    localStorage.removeItem('customerMobile');
    window.location.href = 'index.html';
}

function printBill() {
    window.print();
}

document.addEventListener("DOMContentLoaded", function() {
    const shopMobile = "123-456-7890";
    const shopGSTIN = "22AAAAA0000A1Z5";
    document.getElementById("shopMobile").textContent = shopMobile;
    document.getElementById("shopGSTIN").textContent = shopGSTIN;

    const urlParams = new URLSearchParams(window.location.search);
    const customerName = urlParams.get('customerName');
    const customerMobile = urlParams.get('customerMobile');
    const products = JSON.parse(decodeURIComponent(urlParams.get('products')));

    document.getElementById("customerName").textContent = customerName;
    document.getElementById("customerMobile").textContent = customerMobile;

    const billingItems = document.getElementById("billingItems");
    let totalAmount = 0;

    products.forEach(product => {
        const discountAmount = (product.discount / 100) * product.price;
        const total = (product.price - discountAmount) * product.quantity;
        totalAmount += total;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>${product.discount}%</td>
            <td>${total.toFixed(2)}</td>
        `;
        billingItems.appendChild(row);
    });

    document.getElementById("totalAmount").textContent = totalAmount.toFixed(2);

    // Reset local storage after printing
    localStorage.removeItem('customerName');
    localStorage.removeItem('customerMobile');
});