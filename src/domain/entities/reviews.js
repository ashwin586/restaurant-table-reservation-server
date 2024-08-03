export const createReview = ({ id, user, restaurant, rating, review }) => ({
  id,
  user,
  restaurant,
  rating,
  review,

  isValidRating() {
    return this.rating >= 1 && this.rating <= 5;
  },
});
