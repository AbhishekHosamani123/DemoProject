const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(process.cwd(), 'Data Set', 'Sales Data.xlsx');
const outputDir = path.join(process.cwd(), 'src', 'data');
const outputFilePath = path.join(outputDir, 'sales-data.json');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

try {
    console.log(`Reading file from ${inputFilePath}...`);
    const workbook = XLSX.readFile(inputFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Get raw data
    const rawData = XLSX.utils.sheet_to_json(worksheet);

    console.log(`Found ${rawData.length} rows.`);

    // Process data
    // Expected columns based on inspection: Order ID, Order Date, Customer Name, State, City, Amount, Profit, Quantity, Category, Sub-Category
    // Note: Actual column names might vary slightly, so we'll inspect the first row keys dynamically if needed, 
    // but for now relying on standard naming or inspected keys.

    // Let's look at the first row to map keys
    if (rawData.length > 0) {
        const firstRow = rawData[0];
        console.log('First row keys:', Object.keys(firstRow));
    }

    const categories = ['Technology', 'Furniture', 'Office Supplies'];
    const subCategories = ['Phones', 'Chairs', 'Binders', 'Storage', 'Accessories', 'Tables'];

    const processedData = rawData.map(row => {
        // Generate mock data for missing columns
        const amount = Math.floor(Math.random() * 5000) + 100;
        const profit = Math.floor(amount * (Math.random() * 0.3)); // 0-30% profit
        const quantity = Math.floor(Math.random() * 10) + 1;
        const category = categories[Math.floor(Math.random() * categories.length)];
        const subCategory = subCategories[Math.floor(Math.random() * subCategories.length)];

        return {
            orderId: row['Order ID'],
            orderDate: row['Order Date'], // Might need parsing if it's a serial number
            customerName: row['CustomerName'], // Corrected key
            state: row['State'],
            city: row['City'],
            category: category, // Mocked
            subCategory: subCategory, // Mocked
            amount: amount, // Mocked
            profit: profit, // Mocked
            quantity: quantity // Mocked
        };
    });

    // Aggregations for Dashboard
    const kpis = {
        totalSales: processedData.reduce((sum, item) => sum + (item.amount || 0), 0),
        totalProfit: processedData.reduce((sum, item) => sum + (item.profit || 0), 0),
        totalOrders: processedData.length,
        totalQuantity: processedData.reduce((sum, item) => sum + (item.quantity || 0), 0)
    };

    // Group by Category
    const salesByCategory = processedData.reduce((acc, item) => {
        const cat = item.category || 'Unknown';
        if (!acc[cat]) acc[cat] = 0;
        acc[cat] += item.amount || 0;
        return acc;
    }, {});

    // Group by State (Top 10)
    const salesByState = processedData.reduce((acc, item) => {
        const state = item.state || 'Unknown';
        if (!acc[state]) acc[state] = 0;
        acc[state] += item.amount;
        return acc;
    }, {});

    // Sort and take top 10 states
    const topStates = Object.entries(salesByState)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([name, value]) => ({ name, value }));

    // Group by Sub-Category (Top 5)
    const salesBySubCategory = processedData.reduce((acc, item) => {
        const sub = item.subCategory || 'Unknown';
        if (!acc[sub]) acc[sub] = 0;
        acc[sub] += item.amount;
        return acc;
    }, {});

    const topSubCategories = Object.entries(salesBySubCategory)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, value]) => ({ name, value }));

    // Monthly Sales Trend
    const salesByMonth = processedData.reduce((acc, item) => {
        // Excel serial date conversion (approximate, assuming 1900 start)
        const date = new Date(Math.round((item.orderDate - 25569) * 86400 * 1000));
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (!acc[monthYear]) acc[monthYear] = 0;
        acc[monthYear] += item.amount;
        return acc;
    }, {});

    const monthlyTrend = Object.entries(salesByMonth)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => a.name.localeCompare(b.name));


    // Prepare final JSON structure
    const dashboardData = {
        kpis,
        charts: {
            salesByCategory: Object.entries(salesByCategory).map(([name, value]) => ({ name, value })),
            topStates: topStates,
            topSubCategories: topSubCategories,
            monthlyTrend: monthlyTrend
        },
        rawData: processedData // Include raw data if we need to do detailed listing or filtering on client
    };

    fs.writeFileSync(outputFilePath, JSON.stringify(dashboardData, null, 2));
    console.log(`Successfully wrote processed data to ${outputFilePath}`);

} catch (error) {
    console.error('Error processing sales data:', error);
    process.exit(1);
}
