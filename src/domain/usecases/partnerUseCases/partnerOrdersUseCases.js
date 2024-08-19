export const partnerOrderUseCases = (partnerRepository) => ({
  fetchRestOrders: async (restId) => {
    try {
        return await partnerRepository.fetchRestOrders(restId)
    } catch (error) {
      throw new Error(error);
    }
  },
});
