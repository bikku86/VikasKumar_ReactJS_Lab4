import axios from "axios";

const getDataFromServer = () => {
  return axios
    .get("http://localhost:3001/items")
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });
};

const pushDataToServer = (newExpense) => {
  return axios
    .post("http://localhost:3001/items", newExpense, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });
};

export { getDataFromServer, pushDataToServer };
