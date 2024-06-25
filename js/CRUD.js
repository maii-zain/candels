let products = [];

// Fetch the external JSON file 
fetch('/products.json') 
    .then(response => response.json())
    .then(data => {
        products = data.products;
    })
    .catch(error => console.error('Error loading data:', error));

function searchProduct() {
    const productId = document.getElementById('productId').value;
    const product = products.find(p => p.id === parseInt(productId));

    if (product) {
        displayProductDetails(product);
    } else {
        alert('Product not found!');
    }
}

function displayProductDetails(product) {
    const productDetailsDiv = document.getElementById('productDetails');
    productDetailsDiv.innerHTML = `
        <p>ID: ${product.id}</p>
        <p>Name: ${product.name}</p>
        <p>Price: ${product.price}</p>
        <p>Description: ${product.description}</p>
        <p>Category: ${product.category}</p>
        <p>Stock Quantity: ${product.stockQuantity}</p>
        <img src="${product.image}" alt="Product Image">
    `;
}

function createProduct() {
    const newProductId = parseInt(prompt('Enter product ID:'));
    
    if (isNaN(newProductId) || newProductId <= 0) {
        alert('Invalid ID. Please enter a valid positive number.');
        return;
    }

    if (products.some(product => product.id === newProductId)) {
        alert('Product with the specified ID already exists. Please choose a different ID.');
        return;
    }

    const productName = prompt('Enter product name:');
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(productName)) {
        alert('Invalid name. Please enter letters and spaces only.');
        return;
    }

    const productPrice = parseFloat(prompt('Enter product price:'));
    const stockQuantity = parseInt(prompt('Enter stock quantity:'));

    if (isNaN(productPrice) || isNaN(stockQuantity)) {
        alert('Invalid price or stock quantity. Please enter numbers only.');
        return;
    }

    const productDescription = prompt('Enter product description:');
    const descriptionRegex = /^[a-zA-Z\s]+$/;
    if (!descriptionRegex.test(productDescription)) {
        alert('Invalid description. Please enter letters and spaces only.');
        return;
    }

    const productCategory = prompt('Enter product category:');
    const categoryRegex = /^[a-zA-Z\s]+$/;
    if (!categoryRegex.test(productCategory)) {
        alert('Invalid category. Please enter letters and spaces only.');
        return;
    }

    const productImage = prompt('Enter product image URL:');
const urlRegex = /^(ftp|http|https):\/\/.+/;

// Allow relative paths
if (!urlRegex.test(productImage) && !productImage.startsWith('./')) {
    alert('Invalid image URL. Please enter a valid URL.');
    return;
}


    const newProduct = {
        id: newProductId,
        name: productName,
        price: productPrice,
        description: productDescription,
        category: productCategory,
        stockQuantity: stockQuantity,
        image: productImage
    };

    products.push(newProduct);
    saveData();
    alert('Product created successfully!');
}


function updateProduct() {
    const productId = document.getElementById('productId').value;
    const product = products.find(p => p.id === parseInt(productId));

    if (product) {
        const updatedID = parseInt(prompt('Enter updated product ID:', product.id));
        const updatedName = prompt('Enter updated product name:', product.name);
        const updatedDescription = prompt('Enter updated product description:', product.description);
        const updatedPrice = parseFloat(prompt('Enter updated product price:', product.price));
        const updatedCategory = prompt('Enter updated product category:', product.category);
        const updatedStockQuantity = parseInt(prompt('Enter updated product Stock Quantity:', product.stockQuantity));
        const updatedImage = prompt('Enter updated product image path:', product.image);

        product.id = !isNaN(updatedID) ? updatedID : product.id;
        product.name = updatedName || product.name;
        product.description = updatedDescription || product.description;
        product.price = !isNaN(updatedPrice) ? updatedPrice : product.price;
        product.category = updatedCategory || product.category;
        product.stockQuantity = !isNaN(updatedStockQuantity) ? updatedStockQuantity : product.stockQuantity;
        product.image = updatedImage || product.image;

        saveData();
        alert('Product updated successfully!');
        displayProductDetails(product);
    } else {
        alert('Product not found!');
    }
}

function deleteProduct() {
    const productId = document.getElementById('productId').value;
    const productIndex = products.findIndex(p => p.id === parseInt(productId));

    if (productIndex !== -1) {
        const confirmation = confirm('Are you sure you want to delete this product?');
        
        if (confirmation) {
            products.splice(productIndex, 1);
            saveData();
            alert('Product deleted successfully!');
            clearProductDetails();
        }
    } else {
        alert('Product not found!');
    }
}

function generateProductId() {
    return Math.floor(Math.random() * 1000);
}

function clearProductDetails() {
    document.getElementById('productDetails').innerHTML = '';
}

function saveData() {
    const jsonData = { products };
    const jsonString = JSON.stringify(jsonData, null, 2);

    alert('Data saved successfully:\n\n' + jsonString);
}

function Appending_Orders() {
    window.location.href = 'confirm-reject-admin.html';
}

function all_Orders() {
    window.location.href = 'allOrders.html';
}
