export const createUser = ({
  id,
  name,
  phoneNumber,
  email,
  password,
  accountStatus = false,
  isVerified = false,
  userImage = null,
  registerDate = Date.now(),
  wallet = { balance: 0 },
}) => {
  return {
    id,
    name,
    phoneNumber,
    email,
    password,
    accountStatus,
    isVerified,
    userImage,
    registerDate,
    wallet,

    isValidEmail() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    },

    updateWallet(amount) {
      if (typeof amount === "number" && amount >= 0) {
        this.wallet.balance += amount;
      } else {
        throw new Error("Invalid amount");
      }
    },
  };
};
