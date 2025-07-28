# Validation Rules

## Overview
This document outlines all validation rules implemented in the Bus Boarding Sequence Generator.

## Frontend Validation

### Input Processing
- Empty input is rejected
- Empty lines are filtered out
- Both comma (`,`) and semicolon (`;`) separators are supported
- Quoted values are automatically cleaned

### Booking_ID Validation
- **Pattern**: `/^[A-Za-z0-9_-]+$/`
- **Examples**: 
  - ✅ Valid: `101`, `BOOK001`, `USER_123`, `TRIP-456`
  - ❌ Invalid: `101@`, `BOOK#001`, `USER 123`, `TRIP.456`

### Seat Label Validation
- **Pattern**: `/^[A-Za-z]+\d+$/`
- **Examples**:
  - ✅ Valid: `A1`, `B20`, `AA15`, `ABC123`
  - ❌ Invalid: `1A`, `A`, `123`, `A-1`, `A1B`

### Row Number Validation
- **Range**: 1 to 40 (configurable)
- Extracted from seat label using regex
- **Examples**:
  - ✅ Valid: `A1` (row 1), `B40` (row 40), `C25` (row 25)
  - ❌ Invalid: `A0` (row 0), `B50` (row 50), `C-5` (negative)

### Duplicate Prevention
1. **Booking_ID Duplicates**: No two bookings can have the same ID
2. **Seat Duplicates (Within Booking)**: No duplicate seats in same booking
3. **Seat Duplicates (Across Bookings)**: No seat assigned to multiple bookings

### Limits
- **Maximum Bookings**: 100 (configurable)
- **Maximum Seats per Booking**: 20 (configurable)
- **Maximum Row Number**: 40 (configurable)

## Backend Validation

### Input Type Validation
- Request body must be an array
- Array cannot be empty

### Booking Structure Validation
```javascript
{
  "Booking_ID": "string",    // Required, non-empty
  "Seats": ["string", ...]   // Required, non-empty array
}
```

### Validation Sequence
1. Check if input is array
2. For each booking:
   - Validate Booking_ID exists and is string
   - Check for duplicate Booking_IDs
   - Validate Seats array exists and not empty
   - For each seat:
     - Validate seat label format
     - Check for duplicate seats
     - Validate row number range

### Error Handling
- **Fail-Fast**: Returns first error encountered
- **Detailed Messages**: Includes specific field and value causing error
- **HTTP Status Codes**: 400 for validation errors

## Configuration Constants

### Frontend (JavaScript)
```javascript
const MAX_BOOKINGS = 100;
const MAX_SEATS_PER_BOOKING = 20;
const MAX_ROW_NUMBER = 20;
const VALID_SEAT_COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F'];
```

### Backend (Node.js)
```javascript
const MAX_ROW = 40;
```

## Error Messages

### Frontend Error Examples
- `"Input cannot be empty. Please enter booking data."`
- `"Line 2: Missing Booking_ID"`
- `"Line 3: Invalid Booking_ID format. Expected alphanumeric characters, underscores, or hyphens only."`
- `"Line 4: Invalid seat format: 1A. Expected format like A1, B20, etc."`
- `"Line 5: Duplicate seat A1 in booking 101"`
- `"Line 6: Seat A1 already assigned to another booking"`
- `"Too many bookings. Maximum allowed: 100"`

### Backend Error Examples
- `"Input should be an array of bookings."`
- `"Booking_ID missing or not a string at index 0"`
- `"Duplicate Booking_ID: 101"`
- `"Seats missing or empty for Booking_ID 101"`
- `"Invalid seat label '1A' in Booking_ID 101"`
- `"Seat 'A1' assigned to multiple bookings"`
- `"Seat row out of range (A50) in Booking_ID 101"`

## Best Practices

1. **Input Sanitization**: Clean and validate all user input
2. **Early Validation**: Catch errors before processing
3. **Clear Feedback**: Provide specific, actionable error messages
4. **Graceful Degradation**: Continue processing valid data when possible
5. **Consistent Rules**: Maintain same validation logic across frontend and backend