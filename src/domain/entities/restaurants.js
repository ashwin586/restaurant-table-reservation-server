export const createRestaurant = ({
  id,
  name,
  cuisine,
  openTime,
  closeTime,
  isBlocked,
  isApproved,
  address,
  seats,
  city,
  pinCode,
  images,
  partner,
  latitude,
  longitude,
}) => ({
  id,
  name,
  cuisine,
  openTime,
  closeTime,
  isBlocked,
  isApproved,
  address,
  seats,
  city,
  pinCode,
  images,
  partner,
  latitude,
  longitude,

  approve() {
    this.isApproved = "Approved";
  },

  reject() {
    this.isApproved = "Rejected";
  },

  block() {
    this.isBlocked = true;
  },

  unblock() {
    this.isBlocked = false;
  },
});
