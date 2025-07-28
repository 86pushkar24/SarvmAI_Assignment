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
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   # or for development with auto-restart
   npm run dev
   ```
   You should see: `Server running on port 3000`

4. **Open the application**
   - Open `src/index.html` in your web browser
   - Or visit `http://localhost:3000` (if serving files)

## 📁 Project Structure

```
bus-boarding-assignment/
├── README.md                    # Project documentation
├── package.json                 # Node.js dependencies and scripts
├── .gitignore                   # Git ignore file
│
├── src/
│   ├── index.html              # Main frontend application
│   └── server.js               # Backend API server
│
├── assets/
│   ├── css/
│   │   └── styles.css          # Separated CSS styles
│   └── js/
│       └── app.js              # Separated JavaScript
│
├── data/
│   └── samples/
│       ├── sample_data_basic.csv
│       ├── sample_data_advanced.csv
│       ├── sample_data_large.csv
│       ├── sample_data_semicolon.csv
│       ├── sample_data_quoted.csv
│       └── sample_data_errors.csv
│
├── docs/
│   ├── API.md                  # API documentation
│   └── VALIDATION_RULES.md     # Detailed validation rules
│
└── tests/
    ├── test_data/
    │   ├── valid_data.csv
    │   └── invalid_data.csv
    └── unit_tests.js           # Unit tests
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

For detailed validation rules, see [docs/VALIDATION_RULES.md](docs/VALIDATION_RULES.md)

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

Use the provided sample files in `data/samples/`:
- `sample_data_basic.csv` - Basic valid data
- `sample_data_advanced.csv` - Complex scenarios
- `sample_data_large.csv` - Performance testing
- `sample_data_errors.csv` - Error validation testing

Run tests:
```bash
npm test
```

## 🔧 API Documentation

For detailed API documentation, see [docs/API.md](docs/API.md)

### Quick API Reference
**Endpoint**: `POST /boarding-sequence`

**Request**: Array of booking objects
**Response**: Array of sequence objects with Seq and Booking_ID

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
- **Responsive design**: Works on desktop and mobile devices

## 🛠️ Development

### Available Scripts
- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-restart
- `npm test` - Run unit tests

### Adding New Features
1. Update validation rules in both frontend and backend
2. Add corresponding tests
3. Update documentation

## 🤝 Contributing

1. Ensure all validation rules are maintained
2. Test with both valid and invalid data
3. Update documentation for any new features
4. Follow the established code structure

## 📄 License

This project is open source and available under the MIT License.