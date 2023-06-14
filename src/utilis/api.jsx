import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // L'URL di base dell'API del tuo backend Laravel
});

export const login = (credentials) => {
  return api.post("/login", credentials);
};

export const registration = (credentials) => {
  return api.post("/register", credentials);
}

export const getExpenses = (data) => {
  return api.get("/expenses", data);
}