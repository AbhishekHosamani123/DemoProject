const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(process.cwd(), 'Data Set', 'Sales Data.xlsx');
try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    console.log('Range:', worksheet['!ref']);
    const data = XLSX.utils.sheet_to_json(worksheet, { limit: 10 }); // Read more rows to see if columns appear later
    if (data.length > 0) {
        console.log('Row 0 keys:', Object.keys(data[0]));
    }
} catch (error) {
    console.error('Error reading file:', error);
}
