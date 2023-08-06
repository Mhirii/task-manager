import axios from "axios";

const accessToken = "";
// const accessToken = useSelector((state) => state.auth.accessToken)

export default axios.create({
  baseURL: "http://localhost:5000",
  // withCredentials: true,
  headers: {
    Authorization: accessToken,
    "Access-Control-Allow-Origin": "*",
  },
});


