import React, { useState, useEffect } from 'react';

function App() {
  const [foods, setFoods] = useState([]);
  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodAmount, setNewFoodAmount] = useState('');
  const [newFoodCalories, setNewFoodCalories] = useState('');

  useEffect(() => {
    loadFoodsFromLocalStorage();
  }, []);

  const loadFoodsFromLocalStorage = () => {
    const savedFoods = localStorage.getItem('foods');
    if (savedFoods) {
      setFoods(JSON.parse(savedFoods));
    }
  };

  const saveFoodsToLocalStorage = () => {
    localStorage.setItem('foods', JSON.stringify(foods));
  };

  const renderFoods = () => {
    console.log("Rendering foods...");
  };

  const sortBy = (key) => {
    console.log(`Sorting foods by ${key}...`);
  };

  const addFood = () => {
    console.log("Adding new food...");
    if (!newFoodName || !newFoodAmount || !newFoodCalories) {
      alert("Please enter all fields.");
      return;
    }
    const newFood = {
      id: foods.length + 1,
      name: newFoodName,
      amount: newFoodAmount,
      calories: newFoodCalories
    };
    setFoods([...foods, newFood]);
    setNewFoodName('');
    setNewFoodAmount('');
    setNewFoodCalories('');
    saveFoodsToLocalStorage();
  };

  const deleteFood = (id) => {
    console.log(`Deleting food with ID ${id}...`);
    const updatedFoods = foods.filter(food => food.id !== id);
    setFoods(updatedFoods);
    saveFoodsToLocalStorage();
  };

  return (
      <div>
        <h1>Food List</h1>

        {/* Input fields for adding a new food item */}
        <div>
          <label htmlFor="newFoodName">Name:</label>
          <input type="text" id="newFoodName" value={newFoodName} onChange={(e) => setNewFoodName(e.target.value)} />
          <label htmlFor="newFoodAmount">Amount:</label>
          <input type="text" id="newFoodAmount" value={newFoodAmount} onChange={(e) => setNewFoodAmount(e.target.value)} />
          <label htmlFor="newFoodCalories">Calories:</label>
          <input type="text" id="newFoodCalories" value={newFoodCalories} onChange={(e) => setNewFoodCalories(e.target.value)} />
          <button onClick={addFood}>Add Food</button>
        </div>

        {/* Food list */}
        <ul className="food-list">
          {foods.map(food => (
              <li key={food.id} className="food-item">
                <div className="food-details">
                  <div className="name">{food.name}</div>
                  <div>Grams: {food.amount}</div>
                  <div>{food.calories} calories</div>
                </div>
                <button onClick={() => deleteFood(food.id)} className="delete-button">Delete</button>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default App;
