const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // Allow frontend requests
app.use(express.json());

function isValidSeatLabel(seat) {
  return /^[A-Za-z]+\d+$/.test(seat);
}

const MAX_ROW = 40;

app.post("/boarding-sequence", (req, res) => {
  const data = req.body;

  // Validate input is array
  if (!Array.isArray(data)) {
    return res
      .status(400)
      .json({ error: "Input should be an array of bookings." });
  }

  if (data.length === 0) {
    return res.status(400).json({ error: 'No booking data provided.' });
  }

  const bookingIds = new Set();
  const allSeats = new Set();
  const validBookings = [];
  const errors = [];

  for (const [i, booking] of data.entries()) {
    let hasError = false;
    const bookingErrors = [];

    // Booking_ID checks
    if (!booking.Booking_ID || typeof booking.Booking_ID !== "string") {
      bookingErrors.push('Booking_ID missing or not a string');
      hasError = true;
    } else {
      if (bookingIds.has(booking.Booking_ID)) {
        bookingErrors.push(`Duplicate Booking_ID: ${booking.Booking_ID}`);
        hasError = true;
      }
    }

    // Seats array checks
    if (!Array.isArray(booking.Seats) || booking.Seats.length === 0) {
      bookingErrors.push('Seats missing or empty');
      hasError = true;
    } else {
      for (const seat of booking.Seats) {
        if (!isValidSeatLabel(seat)) {
          bookingErrors.push(`Invalid seat label '${seat}'`);
          hasError = true;
          continue;
        }
        
        if (allSeats.has(seat)) {
          bookingErrors.push(`Seat '${seat}' assigned to multiple bookings`);
          hasError = true;
          continue;
        }

        const rowNum = parseInt(seat.match(/\d+/)[0]);
        if (isNaN(rowNum) || rowNum < 1 || rowNum > MAX_ROW) {
          bookingErrors.push(`Seat row out of range (${seat})`);
          hasError = true;
          continue;
        }
      }
    }

    if (hasError) {
      errors.push({
        index: i,
        Booking_ID: booking.Booking_ID || 'Unknown',
        errors: bookingErrors
      });
    } else {
      // Add to valid bookings and tracking sets
      validBookings.push(booking);
      bookingIds.add(booking.Booking_ID);
      booking.Seats.forEach(seat => allSeats.add(seat));
    }
  }

  // If no valid bookings, return error with details
  if (validBookings.length === 0) {
    return res.status(400).json({ 
      error: 'No valid bookings found.',
      details: errors,
      totalReceived: data.length,
      validCount: 0
    });
  }

  // Main logic: extract max row, sort
  let bookings = validBookings.map((b) => {
    let max_row = Math.max(
      ...b.Seats.map((seat) => parseInt(seat.match(/\d+/)[0]))
    );
    return { Booking_ID: b.Booking_ID, max_row };
  });

  bookings.sort((a, b) => {
    if (b.max_row !== a.max_row) return b.max_row - a.max_row;
    return parseInt(a.Booking_ID) - parseInt(b.Booking_ID);
  });

  let output = bookings.map((b, i) => ({
    Seq: i + 1,
    Booking_ID: b.Booking_ID,
  }));

  res.json(output);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 4 a1 a2 b1 b2
