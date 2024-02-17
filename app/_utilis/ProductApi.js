const { default: axiosClint } = require("./axiosClinte");

const getProducts = () => axiosClint.get("/products?populate=*");
const getProductsByID = (id) => axiosClint.get(`/products/${id}?populate=*`);
const getProductByCateg = (categ) => axiosClint.get(`/products?filters[categ][$eq]=${categ}&populate=*`)

export default {
  getProducts,
  getProductsByID,
  getProductByCateg,
};
