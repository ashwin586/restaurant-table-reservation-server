export const createCategory = ({ id, category }) => {
  return {
    id,
    category,
    getCategoryName() {
      return this.category;
    },

    setCategoryName(newCategoryName) {
      if (
        typeof newCategoryName === "string" &&
        newCategoryName.trim() !== ""
      ) {
        this.category = newCategoryName;
      } else {
        throw new Error("Invalid Categoryname");
      }
    },
  };
};
