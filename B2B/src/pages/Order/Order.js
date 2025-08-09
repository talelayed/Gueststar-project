import React, { useEffect, useState } from "react";
import "./Order.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { publicRequest } from "../../RequestMethods";

export const Order = () => {
  const [orderData, setOrderData] = useState({
    name: "",
    email: "",
    number: "",
    company: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    notes: "",
    products: [],
    total: 0
  });

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    setOrderData(prev => ({
        ...prev,
        products: cart.products,
        total: cart.total
    }))
  }, [cart])
  
useEffect(() => {
  console.log(orderData);

}, [orderData])

  const navigate = useNavigate()

  const handleSubmit = async () => {
  try {
    const res = await publicRequest.post(
      "orders", 
      orderData,
    );
    console.log("comm ajouté :", res.data);
      await toast('Commande passé avec succées!',{
      style: { marginTop: '70px', height: '70px' },
      theme: "light",
      autoClose: 2000, // Close after 2 seconds
      hideProgressBar: false, // Show the progress bar
      closeOnClick: true, // Close the toast on click
      pauseOnHover: true, // Pause the countdown on hover
      draggable: true, // Allow dragging to dismiss
      progress: undefined, // Use the default progress bar
      // Add other customization options as needed
    });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  } catch (err) {
    console.error("Erreur lors de l'ajout du produit :", err);
    alert("Erreur lors de la sauvegarde !");
  }
  };

  return (
    <div>
      <h1 className="order-title">Passer une commande</h1>
      <div className="order-container">
        <form className="order-form" onSubmit={()=>handleSubmit()}>
          <input
            type="text"
            name="name"
            placeholder="Nom complet*"
            value={orderData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            value={orderData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="number"
            placeholder="Numéro de téléphone*"
            value={orderData.number}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Nom de l'entreprise*"
            value={orderData.company}
            onChange={handleChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Département*"
            value={orderData.country}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="Ville*"
            value={orderData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Adresse éxacte*"
            value={orderData.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Code postal"
            value={orderData.postalCode}
            onChange={handleChange}
            required
          />
          <textarea
            name="notes"
            placeholder="Notes supplémentaires (optionnel)"
            value={orderData.notes}
            onChange={handleChange}
            rows="4"
          />
          <button type="submit">Valider la commande</button>
        </form>
      </div>
    </div>
  );
};
