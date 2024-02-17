const { default: axiosClint } = require("./axiosClinte");

const createOrder = (data)=> axiosClint.post("/orders", data)

export default {
    createOrder,
}