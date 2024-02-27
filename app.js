// Load foods from local storage
function loadFoodsFromLocalStorage() {
    const savedFoods = localStorage.getItem('foods');
    if (savedFoods) {
        foods = JSON.parse(savedFoods);
        renderFoods();
    }
}

// Save foods to local storage
function saveFoodsToLocalStorage() {
    localStorage.setItem('foods', JSON.stringify(foods));
}

// Initial loading of foods from local storage
loadFoodsFromLocalStorage();

// Function to render food items
function renderFoods() {
    console.log("Rendering foods...");
    const foodList = document.querySelector(".food-list");
    foodList.innerHTML = "";

    foods.forEach(food => {
        const listItem = document.createElement("li");
        listItem.classList.add("food-item");
        listItem.innerHTML = `
      <div class="food-details">
        <div class="name">${food.name}</div>
        <div>Grams: ${food.amount}</div>
        <div>${food.calories} calories</div>
      </div>
      <button onclick="deleteFood(${food.id})" class="delete-button">Delete</button>
    `;
        foodList.appendChild(listItem);
    });
}

// Function to sort foods by name or calories
function sortBy(key) {
    console.log(`Sorting foods by ${key}...`);
    if (key === "calories" || key === "amount") {
        foods.sort((a, b) => (parseFloat(b[key]) - parseFloat(a[key])));
    } else {
        foods.sort((a, b) => (a[key] < b[key] ? -1 : 1));
    }
    renderFoods();
}

function debug() {

}

// Function to add a new food item
function addFood() {
    console.log("Adding new food...");
    const newName = document.getElementById("newFoodName").value;
    const newAmount = document.getElementById("newFoodAmount").value;
    const newCalories = document.getElementById("newFoodCalories").value;

    // Validate input
    if (!newName || !newAmount || !newCalories) {
        alert("Please enter all fields.");
        return;
    }

    // Add new food item
    const newFood = {
        id: foods.length + 1,
        name: newName,
        amount: newAmount,
        calories: newCalories
    };
    foods.push(newFood);

    // Clear input fields and re-render foods
    document.getElementById("newFoodName").value = "";
    document.getElementById("newFoodAmount").value = "";
    document.getElementById("newFoodCalories").value = "";
    renderFoods();
    saveFoodsToLocalStorage(); // Save foods to local storage

    console.log("New food added:", newFood);
}

// Function to delete a food item
function deleteFood(id) {
    console.log(`Deleting food with ID ${id}...`);
    foods = foods.filter(food => food.id !== id);
    renderFoods();
    saveFoodsToLocalStorage(); // Save foods to local storage
}

// Initial rendering
console.log("Initializing...");
renderFoods();
