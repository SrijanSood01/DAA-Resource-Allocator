import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './styles.css'; // Import the CSS file

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ZeroOneKnapsack = () => {
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

  // Knapsack algorithm
  const zeroOneKnapsack = (items, capacity, n) => {
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

    // Fill the dp array
    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        if (items[i - 1].weight <= w) {
          dp[i][w] = Math.max(
            dp[i - 1][w],
            dp[i - 1][w - items[i - 1].weight] + items[i - 1].value
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    // Identify which items were selected, ensuring total weight is <= capacity
    let selectedItems = [];
    let w = capacity;
    let totalWeight = 0;  // Keep track of the total weight of selected items

    for (let i = n; i > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w] && totalWeight + items[i - 1].weight <= capacity) {
        selectedItems.push({ ...items[i - 1], originalIndex: i - 1 });
        totalWeight += items[i - 1].weight;
        w -= items[i - 1].weight;
      }
    }

    return { totalValue: dp[n][capacity], totalWeight, selectedItems };
  };

  // Extract weights and values for knapsack calculation
  const n = parsedItems.length;

  const { totalValue, totalWeight, selectedItems } = zeroOneKnapsack(parsedItems, maxWeight, n);

  // Prepare chart data for selected items, using their original indices for labels
  const chartData = {
    labels: selectedItems.map(item => `Item ${item.originalIndex + 1}`),  // Correctly label based on original index
    datasets: [
      {
        label: 'Selected Items Value',
        data: selectedItems.map(item => item.value),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className='app-container'>
      <h1 className="title">Results</h1>
      <div className="container">
        <div className="infoBox">
          <p>Maximum weight capacity: <strong>{maxWeight}</strong></p>
          <p>Maximum value you can carry (Total Profit): <strong>{totalValue.toFixed(2)}</strong></p>
          <p>Total weight used: <strong>{totalWeight}</strong></p>
        </div>
        <div className="chartContainer">
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>

        {/* Display the items in a table */}
        <h3 className="itemsTableTitle">All Items:</h3>
        <table className="itemsTable">
          <thead>
            <tr>
              <th>Item</th>
              <th>Value</th>
              <th>Weight</th>
              <th>Selected</th>
            </tr>
          </thead>
          <tbody>
            {parsedItems.map((item, index) => (
              <tr
                key={index}
                className={selectedItems.some(
                  selected => selected.value === item.value && selected.weight === item.weight
                ) ? 'selected-item' : ''}
              >
                <td>{`Item ${index + 1}`}</td>
                <td>{item.value.toFixed(2)}</td>
                <td>{item.weight}</td>
                <td>{selectedItems.some(
                  selected => selected.value === item.value && selected.weight === item.weight
                ) ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ZeroOneKnapsack;
