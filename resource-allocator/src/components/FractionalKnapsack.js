import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import './styles.css'; // Import your consolidated CSS file

const FractionalKnapsack = () => {
  const { state } = useLocation();
  const { items, maxWeight } = state;

  if (maxWeight <= 0 || items.length === 0) {
    return <p>Please provide a valid maximum weight and at least one item.</p>;
  }

  const getCategoryMultiplier = (category) => {
    const categories = {
      Electronics: 1.5,
      Clothing: 1.2,
      Food: 1.0,
      Furniture: 0.8,
    };
    return categories[category] || 1;
  };

  const parsedItems = items.map(item => ({
    value: Number(item.value) * getCategoryMultiplier(item.category),
    weight: Number(item.weight),
  }));

  const fractionalKnapsack = (items, maxWeight) => {
    items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
    let totalValue = 0;
    const selectedItems = [];
    
    for (let item of items) {
      if (maxWeight <= 0) break;
      if (item.weight <= maxWeight) {
        totalValue += item.value;
        maxWeight -= item.weight;
        selectedItems.push({ ...item, fraction: 1 });
      } else {
        const fraction = maxWeight / item.weight;
        totalValue += item.value * fraction;
        selectedItems.push({ ...item, fraction });
        break;
      }
    }
    return { totalValue, selectedItems };
  };

  const { totalValue, selectedItems } = fractionalKnapsack(parsedItems, maxWeight);
  
  const chartData = {
    labels: selectedItems.map(item => `Item (Value: ${item.value.toFixed(2)}${item.fraction < 1 ? ' (Fraction: ' + item.fraction.toFixed(2) + ')' : ''})`),
    datasets: [
      {
        label: 'Selected Items Value',
        data: selectedItems.map(item => item.fraction < 1 ? item.value * item.fraction : item.value),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="app-container">
      <h1>Fractional Knapsack Results</h1>
      <div className="container">
        <div className="infoBox">
          <p>Maximum weight capacity: <strong>{maxWeight}</strong></p>
          <p>Maximum value you can carry: <strong>{totalValue.toFixed(2)}</strong></p>
        </div>
        
        <div className="chartContainer">
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
        <div className="tablesContainer">
          <div className="tableWrapper">
            <h4>Given Items</h4>
            <table className="itemsTable">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Value</th>
                  <th>Weight</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{`Item ${index + 1}`}</td>
                    <td>{item.value}</td>
                    <td>{item.weight}</td>
                    <td>{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="tableWrapper">
            <h4>Selected Items</h4>
            <table className="itemsTable">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Value</th>
                  <th>Weight</th>
                  <th>Fraction</th>
                </tr>
              </thead>
              <tbody>
                {selectedItems.map((item, index) => (
                  <tr key={index}>
                    <td>{`Item ${index + 1}`}</td>
                    <td>{item.fraction < 1 ? (item.value * item.fraction).toFixed(2) : item.value.toFixed(2)}</td>
                    <td>{item.weight}</td>
                    <td>{item.fraction < 1 ? item.fraction.toFixed(2) : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FractionalKnapsack;
