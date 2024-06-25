// Separate JavaScript code goes here

let items = [];
let currentItem; // Added to store the current item during search

function displayItems() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    items.forEach(item => {
        const row = tableBody.insertRow();
        for (const key in item) {
            const cell = row.insertCell();
            cell.textContent = item[key];
        }

        // Add a button in each row to update the item
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = function () {
            currentItem = item;
            showUpdateForm();
        };
        row.appendChild(updateButton);

        // Add a button in each row to delete the item
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            deleteItem(item.id);
        };
        row.appendChild(deleteButton);
    });
}

function showAddForm() {
    document.getElementById('addForm').style.display = 'block';
    document.getElementById('searchForm').style.display = 'none';
    document.getElementById('updateForm').style.display = 'none';
}

function showSearchForm() {
    document.getElementById('addForm').style.display = 'none';
    document.getElementById('searchForm').style.display = 'block';
    document.getElementById('updateForm').style.display = 'none';
}

function showUpdateForm() {
    document.getElementById('addForm').style.display = 'none';
    document.getElementById('searchForm').style.display = 'none';
    document.getElementById('updateForm').style.display = 'block';

    // Populate the update form with the data from the current item
    document.getElementById('updateId').value = currentItem.id;
    document.getElementById('updateName').value = currentItem.name;
    document.getElementById('updateDescription').value = currentItem.description;
    document.getElementById('updatePrice').value = currentItem.price;
    document.getElementById('updateCategory').value = currentItem.category;
    document.getElementById('updateStockQuantity').value = currentItem.StockQuantity;
    document.getElementById('updateImage').value = currentItem.image;
}

function addItem() {
    const newItem = {
        id: getValue('id'),
        name: getValue('name'),
        description: getValue('description'),
        price: getValue('price'),
        category: getValue('category'),
        StockQuantity: getValue('StockQuantity'),
        image: getValue('image'),
    };

    items.push(newItem);
    displayItems();
}

function getValue(elementId) {
    const element = document.getElementById(elementId);
    return element ? element.value : ''; // Return an empty string if the element is not found
}

function searchItem() {
    const searchId = document.getElementById('searchId').value;

    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;

            if (Array.isArray(products)) {
                const foundItem = products.find(item => item.id === parseInt(searchId));

                if (foundItem) {
                    // Store the current item for later use in the update form
                    currentItem = foundItem;

                    // Clear the existing items and display the found item
                    items = [foundItem];
                    displayItems();
                } else {
                    alert('Item not found.');
                }
            } else {
                console.error('Error: Products data is not an array.');
                alert('Error fetching data. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching data. Please try again.');
        });
}

function updateItem() {
    const updateId = document.getElementById('updateId').value;
    const index = items.findIndex(item => item.id === updateId);

    if (index !== -1) {
        // Update only the fields that are changed in the update form
        items[index] = {
            ...items[index],
            name: document.getElementById('updateName').value,
            description: document.getElementById('updateDescription').value,
            price: document.getElementById('updatePrice').value,
            category: document.getElementById('updateCategory').value,
            StockQuantity: document.getElementById('updateStockQuantity').value,
            image: document.getElementById('updateImage').value,
        };

        displayItems();
    } else {
        alert('Item not found for update.');
    }
}

function deleteItem(deleteId) {
    const index = items.findIndex(item => item.id === deleteId);

    if (index !== -1) {
        items.splice(index, 1);
        displayItems();
    } else {
        alert('Item not found for deletion.');
    }
}

// Initial display of items
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data.products)) {
            items = data.products;
            displayItems();
        } else {
            console.error('Error: Products data is not an array.');
            alert('Error fetching data. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please try again.');
    });
