export const partnerRepositoryInterface = (repository) => ({
  savePartner: (data) => repository.savePartner(data),
  findPartner: (phoneNumber) => repository.findPartner(phoneNumber),
  fetchAllPartnerRestaurants: (id) => repository.fetchAllPartnerRestaurants(id),
  fetchRestsTotalReviews: (ids) => repository.fetchRestsTotalReviews(ids),
  fetchRestsTotalBooking: (ids) => repository.fetchRestsTotalBooking(ids),
  fetchRestsChartData: (ids) => repository.fetchRestsChartData(ids),
  fetchAllCategories: () => repository.fetchAllCategories(),
  addMenu: (createdMenu) => repository.addMenu(createdMenu),
  fetchAllRestMenus: (restId) => repository.fetchAllRestMenus(restId),
  editMenu: (data, id) => repository.editMenu(data, id),
  findMenuById: (id) => repository.findMenuById(id)
});
