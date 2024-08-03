export const createCuisine = ({ id, cuisine }) => {
  return {
    id,
    cuisine,
    getCuisineName() {
      return this.cuisine;
    },

    setCuisineName(newCuisineName) {
      if (typeof newCuisineName === "string" && newCuisineName.trim() !== "") {
        this.cuisine = newCuisineName;
      } else {
        throw new Error("Invalid cuisine name");
      }
    },
  };
};
