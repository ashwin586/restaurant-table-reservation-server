export const createBooking = ({
  id,
  user,
  restaurant,
  cart,
  numberOfSeats,
  bookingDate,
  bookedDate,
  bookedTime,
  grandTotal,
  orderStatus,
}) => {
  return {
    id,
    user,
    restaurant,
    cart,
    numberOfSeats,
    bookingDate,
    bookedDate,
    bookedTime,
    grandTotal,
    orderStatus,

    cancelOrder() {
      this.orderStatus = "Cancelled";
    },

    isOrderCancelled() {
      return this.orderStatus === "Cancelled";
    },

    updateGrandTotal(newTotal) {
      if (typeof newTotal === "number" && newTotal >= 0) {
        this.grandTotal = newTotal;
      } else {
        throw new Error("Invalid grand total");
      }
    },

  };
};
