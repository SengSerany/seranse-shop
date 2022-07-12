import axios from 'axios';

const getCart = async () => {
  const response = await fetch(`/api/v1/users/cart/`);
  const data = await response.json();
  return data;
};

const changeProduct = async (linkObj) => {
  const response = await axios.post(`/api/v1/products/cart/update`, linkObj);
  return response.data;
};

const cartService = {
  getCart,
  changeProduct,
};

export default cartService;
