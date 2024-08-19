export const createMenu = ({
  id,
  name,
  foodCategory,
  quantity,
  category,
  price,
  imageURL,
  restaurant,
}) => {
  return {
    id,
    name,
    foodCategory,
    quantity,
    category,
    price,
    imageURL,
    restaurant,
    
    getName() {
      return this.name;
    },

    setName(newName) {
      if (typeof newName === "string" && newName.trim() !== "") {
        this.name = newName;
      } else {
        throw new Error("Invalid name");
      }
    },

  };
};
