import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:3000";

export default {
  getAllKategoria() {
    return Axios.get("/kategoriak")
      .then((resp) => {
        //console.log(resp.data);
        return resp.data;
      })
      .catch((err) => {
        //console.log(err);
        return Promise.reject(err);
      });
  },
  getAllValami() {
    return Axios.get("/valamik")
      .then((resp) => {
        //console.log(resp.data);
        return resp.data;
      })
      .catch((err) => {
        //console.log(err);
        return Promise.reject(err);
      });
  },
  getValamiById(id) {
    return Axios.get(`/valamik/${id}`)
      .then((resp) => {
        //console.log(resp.data);
        return resp.data;
      })
      .catch((err) => {
        //console.log(err);
        return Promise.reject(err);
      });
  },
  saveUser(újobjektum) {
    return Axios.post("/valamik", újobjektum).then(() => {});
  },
  updateUser(módosítottObjektum, id) {
    return Axios.put(`/valamik/${id}`, módosítottObjektum).then(() => {});
  },
};
