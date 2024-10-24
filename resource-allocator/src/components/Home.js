import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Import your CSS styles

const categories = [
  { label: "Electronics", multiplier: 1.5 },
  { label: "Clothing", multiplier: 1.2 },
  { label: "Food", multiplier: 1.0 },
  { label: "Furniture", multiplier: 0.8 },
];

const Home = () => {
  const [items, setItems] = useState([
    { value: "", weight: "", category: "Food" },
  ]);
  const [canDivide, setCanDivide] = useState(true);
  const [maxWeight, setMaxWeight] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [budget, setBudget] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();

  const handleAddItem = () => {
    setItems([...items, { value: "", weight: "", category: "Food" }]);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    if (value < 0) return; // Prevent negative values

    const newItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setItems(newItems);
  };

  const handleCategoryChange = (index, e) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, category: e.target.value };
      }
      return item;
    });
    setItems(newItems);
  };

  const handleDeleteItem = (index) => {
    setShowDeleteConfirm(true);
    setItemToDelete(index);
  };

  const confirmDelete = () => {
    const newItems = items.filter((_, index) => index !== itemToDelete);
    setItems(newItems);
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const algorithm = canDivide ? "fractional" : "zeroone";
    navigate(`/${algorithm}`, {
      state: { items, maxWeight, maxValue, budget },
    });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="app-container">
      <h1>Advanced Resource Allocation Tool</h1>
      <div className="home-container">
        <form onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <div>
              <table className={"item-table"}>
                <thead>
                  <tr>
                    <th>Item Weight</th>
                    <th>Item Value</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="item-input">
                    <td>
                      <input
                        type="number"
                        name="weight"
                        placeholder="Enter the weight"
                        value={item.weight}
                        onChange={(e) => handleInputChange(index, e)}
                        required
                      />
                    </td>
                      <td>
                        <input
                          type="number"
                          name="value"
                          placeholder="Enter the value"
                          value={item.value}
                          onChange={(e) => handleInputChange(index, e)}
                          required
                        />
                      </td>
                      <td className="cat" >
                        <select 
                          value={item.category}
                          onChange={(e) => handleCategoryChange(index, e)}
                        >
                          {categories.map((cat, i) => (
                            <option key={i} value={cat.label}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(index)}
                          className="del"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" onClick={handleAddItem}>
                Add Another Item
              </button>
              {items.every((item) => item.value && item.weight) && (
                <button type="button" onClick={nextStep} className="next">
                  Next
                </button>
              )}
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <p>Can the items be divided?</p>
              <label>
                <input
                  type="radio"
                  name="divide"
                  value="yes"
                  checked={canDivide}
                  onChange={() => setCanDivide(true)}
                  required
                />
                Yes, items can be divided (Fractional Knapsack)
              </label>
              <label>
                <input
                  type="radio"
                  name="divide"
                  value="no"
                  checked={!canDivide}
                  onChange={() => setCanDivide(false)}
                  required
                />
                No, items cannot be divided (0/1 Knapsack)
              </label>
              <button type="button" onClick={previousStep} className="back">
                Back
              </button>
              <button type="button" onClick={nextStep} className="next">
                Next
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3>Additional Constraints</h3>
              <label>
                Maximum Weight:
                <input
                  type="number"
                  placeholder="Max weight limit"
                  value={maxWeight}
                  onChange={(e) => setMaxWeight(e.target.value)}
                  required
                />
              </label>
              <label>
                Maximum Value:
                <input
                  type="number"
                  placeholder="Max value limit"
                  value={maxValue}
                  onChange={(e) => setMaxValue(e.target.value)}
                />
              </label>
              <label>
                Budget:
                <input
                  type="number"
                  placeholder="Total budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </label>
              <button type="button" onClick={previousStep} className="back">
                Back
              </button>
              <button type="submit" className="next">
                Calculate
              </button>
            </div>
          )}
        </form>

        {showDeleteConfirm && (
          <div className="delete-confirmation">
            <p>Are you sure you want to delete this item?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button className="next" onClick={() => setShowDeleteConfirm(false)}>No</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
