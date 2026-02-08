const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(process.cwd(), 'Data Set', 'Sales Data.xlsx');
try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    // Use default sheet_to_json which uses first row as header
    const data = XLSX.utils.sheet_to_json(worksheet, { limit: 1 });
    if (data.length > 0) {
        console.log('Columns:', JSON.stringify(Object.keys(data[0])));
    } else {
        console.log('No data found');
    }
} catch (error) {
    console.error('Error reading file:', error);
}
