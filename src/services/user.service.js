import api from "./api";

const getStocks = () => {
  return api.get("/stocks?populate=*");
};


const UserService = {
  getStocks,
};

export default UserService;