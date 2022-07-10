import axios from 'axios';

const API_URL = '/api/v1/product';

// Index products
const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

// Create product
const createNewProducts = async (productData) => {
  const response = await axios.post(`${API_URL}/new`, productData);
  return response.data;
};

// // Update product
// const updateProducts = async (productData) => {
//   const response = await axios.patch(
//     `${API_URL}/${productData.productId}/edit`,
//     productData
//   );
//   return response.data;
// };

// // Delete product
// const deleteProducts = async (productID) => {
//   const response = await axios.delete(`${API_URL}/${productID}`);
//   return response.data;
// };

const productService = {
  getAllProducts,
  createNewProducts,
  //   updateProducts,
  //   deleteProducts,
};

export default productService;
