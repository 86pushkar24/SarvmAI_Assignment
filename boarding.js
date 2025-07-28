// boarding.js
function getBoardingSequence(bookings) {
  // Validations (can be more thorough as per your backend)
  const bookingIds = new Set();
  const allSeats = new Set();
  const MAX_ROW = 40;

  for (const booking of bookings) {
    if (!booking.Booking_ID || typeof booking.Booking_ID !== "string")
      throw new Error("Invalid Booking_ID");
    if (bookingIds.has(booking.Booking_ID))
      throw new Error("Duplicate Booking_ID");
    bookingIds.add(booking.Booking_ID);

    if (!Array.isArray(booking.Seats) || booking.Seats.length === 0)
      throw new Error("Seats missing or empty");
    for (const seat of booking.Seats) {
      if (!/^[A-Za-z]+\d+$/.test(seat))
        throw new Error(`Invalid seat label: ${seat}`);
      if (allSeats.has(seat))
        throw new Error(`Seat ${seat} assigned to multiple bookings`);
      allSeats.add(seat);
      const row = parseInt(seat.match(/\d+/)[0]);
      if (isNaN(row) || row < 1 || row > MAX_ROW)
        throw new Error(`Invalid row in seat: ${seat}`);
    }
  }

  let output = bookings.map((b) => {
    let max_row = Math.max(
      ...b.Seats.map((seat) => parseInt(seat.match(/\d+/)[0]))
    );
    return { Booking_ID: b.Booking_ID, max_row };
  });

  output.sort((a, b) => {
    if (b.max_row !== a.max_row) return b.max_row - a.max_row;
    return parseInt(a.Booking_ID) - parseInt(b.Booking_ID);
  });

  return output.map((b, i) => ({
    Seq: i + 1,
    Booking_ID: b.Booking_ID,
  }));
}

module.exports = { getBoardingSequence };
