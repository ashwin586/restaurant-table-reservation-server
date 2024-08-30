export const createToken = ({ userId, token, expiresAt }) => {
  return { userId, token, expiresAt };
};
