# API Documentation

## Overview
The Bus Boarding Sequence Generator API provides endpoints to generate optimal boarding sequences based on seat assignments.

## Base URL
```
http://localhost:3000
```

## Endpoints

### POST `/boarding-sequence`

Generates an optimal boarding sequence for the given booking data.

#### Request
- **Content-Type**: `application/json`
- **Body**: Array of booking objects

```json
[
  {
    "Booking_ID": "string",
    "Seats": ["string", "string", ...]
  }
]
```

#### Request Example
```json
[
  {"Booking_ID": "101", "Seats": ["A1", "B1"]},
  {"Booking_ID": "102", "Seats": ["C25", "D25"]},
  {"Booking_ID": "103", "Seats": ["A15"]}
]
```

#### Response
- **Content-Type**: `application/json`
- **Body**: Array of sequence objects

```json
[
  {
    "Seq": number,
    "Booking_ID": "string"
  }
]
```

#### Success Response Example
```json
[
  {"Seq": 1, "Booking_ID": "102"},
  {"Seq": 2, "Booking_ID": "103"},
  {"Seq": 3, "Booking_ID": "101"}
]
```

#### Error Responses

##### 400 Bad Request
```json
{
  "error": "Error description",
  "details": [...],
  "validCount": number,
  "totalReceived": number
}
```

##### Common Error Messages
- `"Input should be an array of bookings."`
- `"Booking_ID missing or not a string at index X"`
- `"Duplicate Booking_ID: XXX"`
- `"Seats missing or empty for Booking_ID XXX"`
- `"Invalid seat label 'XXX' in Booking_ID XXX"`
- `"Seat 'XXX' assigned to multiple bookings"`
- `"Seat row out of range (XXX) in Booking_ID XXX"`

## Validation Rules

### Booking_ID
- Must be a non-empty string
- Must contain only alphanumeric characters, underscores, and hyphens
- Must be unique across all bookings

### Seats
- Must be an array with at least one seat
- Each seat must follow format: `[Letters][Numbers]` (e.g., A1, B20, AA15)
- Row numbers must be between 1 and 40
- No duplicate seats within the same booking
- No duplicate seats across different bookings

## Algorithm

The boarding sequence is determined by:
1. **Primary Sort**: Highest row number first (passengers in back rows board first)
2. **Secondary Sort**: Booking_ID in ascending order (for tie-breaking)

## Rate Limits
Currently no rate limits are implemented.

## CORS
CORS is enabled for all origins to support frontend applications.