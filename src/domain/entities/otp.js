export const createOtp = ({ id, email, otp, createdAt }) => {
  return {
    id,
    email,
    otp,
    createdAt,
  };
};
