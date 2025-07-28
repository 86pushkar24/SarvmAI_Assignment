# Bus Boarding Sequence Generator

A web-based application that generates optimal bus boarding sequences based on seat assignments. The system prioritizes passengers with seats in the back rows to board first, minimizing aisle congestion and improving boarding efficiency.

## 🚌 Features

- **File Upload Support**: Upload CSV, TXT files with booking data
- **Manual Input**: Direct text input for smaller datasets
- **Data Validation**: Comprehensive frontend and backend validation
- **Error Handling**: Visual error highlighting with detailed feedback
- **Partial Processing**: Process valid data while ignoring invalid entries
- **Real-time Preview**: Table view of uploaded data with validation status

## 📋 How It Works

The system sorts bookings based on:
1. **Primary**: Highest row number first (back to front)
2. **Secondary**: Booking ID (ascending order for tie-breaking)

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or download the project**
   ```bash
   cd bus-boarding-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install express cors
   ```

3. **Start the server**
   ```bash
   node server.js
   ```
   You should see: `Server running on port 3000`

4. **Open the application**
   - Open `index.html` in your web browser
   - Or visit `http://localhost:3000` (if serving files)

## 📁 Project Structure

```
bus-boarding-assignment/
├── index.html          # Frontend application
├── server.js          # Backend API server
├── sample_data_*.csv  # Test CSV files
└── README.md          # This file
```

## 📊 Input Format

### CSV/TXT File Format
```csv
Booking_ID,Seat1,Seat2,Seat3
101,A1,B1
102,C15,A10
103,D20
104,B5,C5,D5
```

### Manual Input Format
```
101,A1,B1
102,C15,A10
103,D20
104,B5,C5,D5
```

## ✅ Validation Rules

### Booking ID
- Must be alphanumeric (letters, numbers, underscore, hyphen only)
- Cannot be empty or duplicate

### Seat Labels
- Format: `[Letters][Numbers]` (e.g., A1, B20, AA15)
- Row numbers must be between 1-40
- No duplicate seats within or across bookings

### Data Integrity
- Each booking must have at least one seat
- No empty lines or malformed entries

## 🎯 Usage Examples

### Example Input
```csv
101,A1,B1
102,C25,D25
103,A15,B15
```

### Expected Output
```json
[
  {"Seq": 1, "Booking_ID": "102"},  // Row 25 (highest)
  {"Seq": 2, "Booking_ID": "103"},  // Row 15
  {"Seq": 3, "Booking_ID": "101"}   // Row 1 (lowest)
]
```

## 🧪 Testing

Use the provided sample files:
- `sample_data_basic.csv` - Basic valid data
- `sample_data_advanced.csv` - Complex scenarios
- `sample_data_large.csv` - Performance testing
- `sample_data_errors.csv` - Error validation testing

## 🔧 API Endpoints

### POST `/boarding-sequence`
**Request Body:**
```json
[
  {"Booking_ID": "101", "Seats": ["A1", "B1"]},
  {"Booking_ID": "102", "Seats": ["C25"]}
]
```

**Response:**
```json
[
  {"Seq": 1, "Booking_ID": "102"},
  {"Seq": 2, "Booking_ID": "101"}
]
```

## 🚨 Error Handling

The system provides detailed error messages for:
- Invalid file formats
- Malformed data entries
- Duplicate bookings or seats
- Out-of-range seat numbers
- Missing required fields

## 🎨 UI Features

- **Color-coded validation**: Green for valid rows, red for errors
- **Data preview table**: Shows all data before processing
- **Error details**: Specific error messages per row
- **Partial processing**: Continue with valid data only
- **File upload feedback**: Clear status messages

## 🤝 Contributing

1. Ensure all validation rules are maintained
2. Test with both valid and invalid data
3. Update documentation for any new features

## 📄 License

This project is open source and available under the MIT License.