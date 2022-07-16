import axios from 'axios';

const API_URL = '/api/v1/order';

const getAllorders = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

// const createOrder = async (formDataOrder) => {
//   const response = await axios.post(`${API_URL}/create`, formDataOrder);
//   return response.data;
// };

const updateOrder = async (orderInfos) => {
  const response = await axios.patch(`${API_URL}/update`, orderInfos);
  return response.data;
};

const orderService = {
  getAllorders,
  //   createOrder,
  updateOrder,
};

export default orderService;
