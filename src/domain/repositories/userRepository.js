export const userRepositoryInterface = (repository) => ({
  saveUser: (user) => repository.saveUser(user),
  findByEmail: (email) => repository.findByEmail(email),
  // saveGoogleData: (name, email) => repository.saveGoogleData(name, email),
});
