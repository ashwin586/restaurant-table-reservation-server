export const adminRepositoryInterface = (repository) => ({
  findAdmin: (email) => repository.findAdmin(email),
  usersCount: () => repository.usersCount(),
  restaurantsCount: () => repository.restaurantsCount(),
  partnersCount: () => repository.partnersCount(),
  saveCategory: (data) => repository.saveCategory(data),
  fetchAllCategory: () => repository.fetchAllCategory(),
  deleteCategory: (id) => repository.deleteCategory(id),
  findCuisine: (cuisine) => repository.findCuisine(cuisine),
  saveCuisine: (newCuisine) => repository.saveCuisine(newCuisine),
  fetchAllCuisines: () => repository.fetchAllCuisines(),
  deleteCuisine: (id) => repository.deleteCuisine(id),
});
