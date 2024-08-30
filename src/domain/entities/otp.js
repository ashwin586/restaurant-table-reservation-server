export const createOtp = ({ id, email, otp, expiresAt }) => {
  return {
    id,
    email,
    otp,
    expiresAt,
  };
};
