const { default: axiosClint } = require("./axiosClinte");

const addToCard = (payload) => axiosClint.post("/carts", payload)

const getUserItem = (email)=> axiosClint.get(`carts?populate[products][populate]=img&filters[email][$eq]=${email}`)

const deletCartItem = (id) => axiosClint.delete(`/carts/${id}`)


export default {
  addToCard,
  getUserItem,
  deletCartItem
};
