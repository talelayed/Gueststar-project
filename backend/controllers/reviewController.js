const Review = require("../models/reviewModel");

// Ajouter un nouvel avis
addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const newReview = new Review({
      client: req.client.id, // Assure-toi que l'utilisateur est authentifié
      product: productId,
      rating,
      comment,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l’ajout de l’avis", error });
  }
};

// Obtenir tous les avis d’un produit
getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId })
      .populate("client", "name") // Pour afficher le nom de l'utilisateur
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des avis", error });
  }
};

// Supprimer un avis
deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) return res.status(404).json({ message: "Avis introuvable" });

    if (review.client.toString() !== req.client.id && !req.client.isAdmin)
      return res.status(403).json({ message: "Action non autorisée" });

    await Review.findByIdAndDelete(req.params.reviewId);
    res.status(200).json({ message: "Avis supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l’avis", error });
  }
};

// Mettre à jour un avis
updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findById(req.params.reviewId);

    if (!review) return res.status(404).json({ message: "Avis introuvable" });

    if (review.client.toString() !== req.client.id && !req.client.isAdmin)
      return res.status(403).json({ message: "Action non autorisée" });

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    const updated = await review.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l’avis", error });
  }
};

module.exports = {
    addReview,
    getProductReviews,
    deleteReview,
    updateReview
}