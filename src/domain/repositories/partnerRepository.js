export const partnerRepositoryInterface = (repository) => ({
  savePartner: (data) => repository.savePartner(data),
  findPartner: (phoneNumber) => repository.findPartner(phoneNumber),
});
 