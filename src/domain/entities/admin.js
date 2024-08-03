export const createAdmin = ({ id, name, email, password, revenue }) => {
  return {
    id,
    name,
    email,
    password,
    revenue,
    updateRevenue(amount) {
      if (typeof amount === "number") {
        this.revenue += amount;
      } else {
        throw new Error("Invalid amount");
      }
    },
  };
};
