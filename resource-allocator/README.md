# Advanced Resource Allocation Tool

# Overview
The Advanced Resource Allocation Tool is a React-based web application that implements both Fractional and 0/1 Knapsack algorithms for optimizing resource allocation. This tool allows users to input various items with weights, values, and categories, specify maximum constraints, and calculate the optimal selection of items under given conditions.

## Features
- **Item Input Form**: Add, categorize, and input values and weights for items.
- **Algorithm Selection**: Choose between Fractional Knapsack (items can be divided) or 0/1 Knapsack (items cannot be divided).
- **Constraints**: Specify maximum weight, value limits, and budget.
- **Optimal Selection Calculation**: Calculates maximum possible value within weight constraints, based on selected algorithm.
- **Data Visualization**: Uses Chart.js to display selected items’ values in a bar chart.
- **Table Views**: Detailed tables show all items, selected items, weights, values, and selection status.
- **Item Categories**: Apply multipliers based on categories for more tailored allocation.

## Dependencies
- **React**: For building the application interface.
- **react-chartjs-2** & **Chart.js**: For data visualization in bar chart format.
- **React Router**: For page navigation.
- **CSS**: For styling the application.

## Project Structure
```plaintext
src/
│
├── components/
│   ├── Home.js                    # Home page component for item input and settings
│   ├── FractionalKnapsack.js       # Component for Fractional Knapsack algorithm results
│   ├── ZeroOneKnapsack.js          # Component for 0/1 Knapsack algorithm results
│
├── App.js                          # Main app component for routing
├── styles.css                      # Consolidated CSS for styling
└── index.js                        # Entry point
```

## Usage

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/advanced-resource-allocation-tool.git
   cd advanced-resource-allocation-tool
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the App**:
   ```bash
   npm start
   ```

4. **Interact with the Tool**:
   - **Add Items**: Input item details (weight, value, category).
   - **Choose Algorithm**: Select either Fractional or 0/1 Knapsack.
   - **Set Constraints**: Define maximum weight, max value, and budget.
   - **Calculate**: View optimal results, selected items, and data visualization.

# Components

# Home Component
- Renders the form for item entry and selection criteria.
- Allows toggling between Fractional and 0/1 Knapsack algorithms.
- Submits data to the appropriate knapsack component based on the selection.

# ZeroOneKnapsack Component
- Executes the 0/1 Knapsack algorithm, maximizing value without exceeding weight.
- Displays a chart of selected items’ values and a table of all items with selection status.

### FractionalKnapsack Component
- Executes the Fractional Knapsack algorithm, allowing fractional item selection.
- Renders a bar chart for selected items and tables for all items and selected items.

# Category Multipliers
Each category applies a multiplier to item value:
- **Electronics**: 1.5
- **Clothing**: 1.2
- **Food**: 1.0
- **Furniture**: 0.8

# Customization
Adjust category multipliers or add more categories by modifying the `categories` array in `Home.js` and `getCategoryMultiplier` function in the respective algorithm components.
