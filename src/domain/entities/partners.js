export const createPartner = ({
  id,
  name,
  email,
  phoneNumber,
  password,
  accountStatus,
  imageURL,
  verified,
  revenue,
}) => {
  return {
    id,
    name,
    email,
    phoneNumber,
    password,
    accountStatus,
    imageURL,
    verified,
    revenue,

    updateProfile(newDetails) {
      if (newDetails.name) this.name = newDetails.name;
      if (newDetails.email) this.email = newDetails.email;
      if (newDetails.phoneNumber) this.phoneNumber = newDetails.phoneNumber;
      if (newDetails.imageURL) this.imageURL = newDetails.imageURL;
      if (newDetails.revenue) this.revenue = newDetails.revenue;
    },

    verify() {
      this.verified = true;
    },

    block() {
      this.accountStatus = true;
    },

  };
};

