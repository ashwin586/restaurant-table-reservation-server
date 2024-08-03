export const userRepositoryInterface = (repository) => ({
  saveUser: (user) => repository.saveUser(user),
  findByEmail: (email) => repository.findByEmail(email),
  updateUser: (userId, updatedUserData) =>
    repository.findByIdAndUpdate(userId, updatedUserData),
  // saveGoogleData: (name, email) => repository.saveGoogleData(name, email),
});
