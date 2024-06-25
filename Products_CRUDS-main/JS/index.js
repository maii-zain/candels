let currentIndex = 0;
let currentId = 0;
let candles = [];

let inputID = document.getElementById("inputID");
let inputName = document.getElementById("inputName");
let inputDescription = document.getElementById("inputDescription");
let inputPrice = document.getElementById("inputPrice");
let inputCategory = document.getElementById("inputCategory");
let inputImage = document.getElementById("inputImage");
let btnAdd = document.getElementById("btnAdd");
let btnClear = document.getElementById("btnClear");
let tableBody = document.getElementById("tableBody");
let inputSearch = document.getElementById("inputSearch");
let btnSearch = document.getElementById("btnSearch");
let alertName = document.getElementById("alertName");
let alertPrice = document.getElementById("alertPrice");
let alertCondition = document.getElementById("alertCondition");

// Load existing products from localStorage
loadProducts();

function loadProducts() {
    if (localStorage.getItem("candles") !== null) {
        candles = JSON.parse(localStorage.getItem("candles"));
        currentId = Math.max(...candles.map(candle => candle.id), 0) + 1;
        displayProducts();
        updateCurrentIdField();
    }
}

btnClear.addEventListener("click", clearForm);

btnAdd.addEventListener("click", () => {
    if (validName() && validPrice() && validCondition()) {
        if (btnAdd.innerHTML === "Add Product") {
            addProduct();
        } else if (btnAdd.innerHTML === "Update Product") {
            updateProduct();
        }
        localStorage.setItem("candles", JSON.stringify(candles));
        displayProducts();
        updateCurrentIdField();
        clearForm();
    }
});

btnSearch.addEventListener("click", searchProduct);

function addProduct() {
    let product = {
        id: parseInt(inputID.value),
        name: inputName.value,
        description: inputDescription.value,
        price: inputPrice.value,
        category: inputCategory.value,
        image: inputImage.value
    };
    candles.push(product);
}

function updateProduct() {
    let updatedProduct = {
        id: parseInt(inputID.value),
        name: inputName.value,
        description: inputDescription.value,
        price: inputPrice.value,
        category: inputCategory.value,
        image: inputImage.value
    };

    candles[currentIndex] = updatedProduct;
}


function generateUniqueID() {
    let newId = parseInt(inputID.value);
    while (candles.some(product => product.id === newId)) {
        newId++;
    }
    return newId;
}

function updateCurrentIdField() {
    inputID.value = currentId;
}

function displayProducts() {
    let temp = "";
    for (let i = 0; i < candles.length; i++) {
        temp += `
        <tr>
            <td>${candles[i].id}</td>
            <td>${candles[i].name}</td>
            <td>${candles[i].description}</td>
            <td>${candles[i].price}</td>
            <td>${candles[i].category}</td>
            <td><img src="${candles[i].image}" alt="Product Image" style="max-width: 100px; max-height: 100px;"></td>
            <td>
                <i onclick="getProductInformation(${i})" title="Update" class="fa-solid me-2 text-warning fa-pen"></i>
                <i onclick="deleteProduct(${i})" title="Delete" class="fa-solid text-danger fa-trash"></i>
            </td>
        </tr>`;
    }
    tableBody.innerHTML = temp;
}

function clearForm() {
    inputID.value = "";
    inputName.value = "";
    inputDescription.value = "";
    inputPrice.value = "";
    inputCategory.value = "";
    inputImage.value = "";

    inputID.classList.remove("is-valid");
    inputID.classList.remove("is-invalid");
    inputName.classList.remove("is-valid");
    inputName.classList.remove("is-invalid");
    alertName.classList.replace("d-block", "d-none");
    inputPrice.classList.remove("is-valid");
    inputPrice.classList.remove("is-invalid");
    alertPrice.classList.replace("d-block", "d-none");
    inputCondition.classList.remove("is-valid");
    inputCondition.classList.remove("is-invalid");
    alertCondition.classList.replace("d-block", "d-none");

    alertName.classList.replace("d-block", "d-none");
    alertPrice.classList.replace("d-block", "d-none");
    alertCondition.classList.replace("d-block", "d-none");

    btnAdd.classList.replace("btn-warning", "btn-success");
    btnAdd.innerHTML = "Add Product";
}

function getProductInformation(index) {
    currentIndex = index;
    inputID.value = candles[currentIndex].id;
    inputName.value = candles[currentIndex].name;
    inputDescription.value = candles[currentIndex].description;
    inputPrice.value = candles[currentIndex].price;
    inputCategory.value = candles[currentIndex].category;
    inputImage.value = candles[currentIndex].image;

    btnAdd.classList.replace("btn-success", "btn-warning");
    btnAdd.innerHTML = "Update Product";

    inputID.classList.remove("is-invalid");
    inputName.classList.remove("is-invalid");
    alertName.classList.replace("d-block", "d-none");
    inputPrice.classList.remove("is-invalid");
    alertPrice.classList.replace("d-block", "d-none");
    inputCondition.classList.remove("is-invalid");
    alertCondition.classList.replace("d-block", "d-none");
}

function searchProduct() {
    let searchValue = inputSearch.value.trim().toLowerCase();
    let temp = "";

    for (let i = 0; i < candles.length; i++) {
        if (candles[i].id.toString().includes(searchValue)) {
            temp += `
            <tr>
                <td>${candles[i].id}</td>
                <td>${candles[i].name}</td>
                <td>${candles[i].description}</td>
                <td>${candles[i].price}</td>
                <td>${candles[i].category}</td>
                <td><img src="${candles[i].image}" alt="Product Image" style="max-width: 100px; max-height: 100px;"></td>
                <td>
                    <i onclick="getProductInformation(${i})" title="Update" class="fa-solid me-2 text-warning fa-pen"></i>
                    <i onclick="deleteProduct(${i})" title="Delete" class="fa-solid text-danger fa-trash"></i>
                </td>
            </tr>`;
        }
    }
    tableBody.innerHTML = temp;
}
function deleteProduct(index) {
    candles.splice(index, 1);
    displayProducts();
    localStorage.setItem("candles", JSON.stringify(candles));
}

inputSearch.addEventListener("keyup", searchProduct);

inputName.addEventListener("keyup", validName);
inputPrice.addEventListener("keyup", validPrice);
inputCondition.addEventListener("change", validCondition);

function validName() {
    let regex = /^[A-Za-z]{3,}$/;
    if (regex.test(inputName.value)) {
        inputName.classList.add("is-valid");
        inputName.classList.remove("is-invalid");
        alertName.classList.replace("d-block", "d-none");
        return true;
    } else {
        inputName.classList.add("is-invalid");
        inputName.classList.remove("is-valid");
        alertName.classList.replace("d-none", "d-block");
        return false;
    }
}

function validPrice() {
    let regex = /^[1-9][0-9]{2,}$/;
    if (regex.test(inputPrice.value)) {
        inputPrice.classList.add("is-valid");
        inputPrice.classList.remove("is-invalid");
        alertPrice.classList.replace("d-block", "d-none");
        return true;
    } else {
        inputPrice.classList.add("is-invalid");
        inputPrice.classList.remove("is-valid");
        alertPrice.classList.replace("d-none", "d-block");
        return false;
    }
}

function validCondition() {
    if (inputCondition.value === "") {
        inputCondition.classList.add("is-invalid");
        inputCondition.classList.remove("is-valid");
        alertCondition.classList.replace("d-none", "d-block");
        return false;
    } else {
        inputCondition.classList.add("is-valid");
        inputCondition.classList.remove("is-invalid");
        alertCondition.classList.replace("d-block", "d-none");
        return true;
    }
}
