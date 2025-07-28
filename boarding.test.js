const { getBoardingSequence } = require("./boarding");

// Success case
test("returns correct sequence for valid input", () => {
  const bookings = [
    { Booking_ID: "101", Seats: ["A1", "B1"] },
    { Booking_ID: "102", Seats: ["C15", "A10"] },
    { Booking_ID: "103", Seats: ["D20"] },
  ];
  expect(getBoardingSequence(bookings)).toEqual([
    { Seq: 1, Booking_ID: "103" },
    { Seq: 2, Booking_ID: "102" },
    { Seq: 3, Booking_ID: "101" },
  ]);
});

// Error: Duplicate Booking_ID
test("throws error for duplicate Booking_ID", () => {
  const bookings = [
    { Booking_ID: "101", Seats: ["A1"] },
    { Booking_ID: "101", Seats: ["B2"] },
  ];
  expect(() => getBoardingSequence(bookings)).toThrow("Duplicate Booking_ID");
});

// Error: Invalid seat label
test("throws error for invalid seat label", () => {
  const bookings = [{ Booking_ID: "105", Seats: ["BADSEAT"] }];
  expect(() => getBoardingSequence(bookings)).toThrow(
    "Invalid seat label: BADSEAT"
  );
});

// Error: Duplicate seat across bookings
test("throws error for duplicate seat assignment", () => {
  const bookings = [
    { Booking_ID: "101", Seats: ["A1", "B2"] },
    { Booking_ID: "102", Seats: ["B2"] },
  ];
  expect(() => getBoardingSequence(bookings)).toThrow(
    "Seat B2 assigned to multiple bookings"
  );
});
