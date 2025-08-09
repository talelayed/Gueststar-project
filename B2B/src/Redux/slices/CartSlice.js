import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  total: 0,
  discount: 0,
  quantity: 0,
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.total += parseFloat(action.payload.price * action.payload.quantity);
      state.quantity ++;
    },
    removeProduct: (state, action) => {
      const product = state.products.find(
        (elt) => elt._id === action.payload._id
      );
      state.products.splice(state.products.indexOf(product), 1);
      state.total -= action.payload.price * action.payload.qte;
      state.quantity--
    },
    increaseQuantity: (state, action) => {
      const product = state.products.find(
        (elt) => elt._id === action.payload._id
      );
      product.quantity++;
      state.total+=product.price; 
      state.quantity ++;
    },
    decreaseQuantity: (state, action) => {
      const product = state.products.find(
        (elt) => elt._id === action.payload._id
      );
      product.quantity--;
      state.total-=product.price; 
      state.quantity--
    },
    updateTotal: (state, action) => {
      const product = state.products.find(
        (elt) => elt._id === action.payload._id
      );
        state.total += action.payload.price;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    emptyCart: (state) => {
      state.products = [];
      state.total = 0;
      state.quantity = 0;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  updateTotal,
  setDiscount,
  emptyCart,
} = CartSlice.actions;

export default CartSlice.reducer;
