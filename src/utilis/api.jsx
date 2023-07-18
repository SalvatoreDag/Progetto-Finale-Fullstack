import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const getUser = (data) => {
  console.log(data.token);
  return api.get('/user', {
    headers: {
      Authorization: `Bearer ${data.token}`
    }
  })
}

export const login = (credentials) => {
  return api.post("/login", credentials);
};


export const registration = (credentials) => {
  return api.post("/register", credentials);
};

export const logout = (userData) => {
  return api.post("/logout", userData, {
    headers: {
      Authorization: `Bearer ${userData}`,
    },
  });
};

export const getExpenses = (accessToken) => {
  return api.get("/expenses", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const searchExpenses = (data) => {
  return api.get("/expenses", {
    headers: {
      Authorization: `Bearer ${data.accessToken}`,
    },
    params: {
      "filter[title]": data.title,
    },
  });
};

export const expensesByMonth = (data) => {
  return api.get("/expenses", {
    headers: {
      Authorization: `Bearer ${data.accessToken}`,
    },
    params: {
      "filter[month]": data.selectedMonthName,
    },
  });
};

export const destroyExpenses = async (data) => {
  const id = data.id;
  console.log(id);
  return api.delete(`/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${data.accessToken}`,
    },
  });
};

export const updateExpenses =  (data) => {
  const { id, accessToken, ...rest } = data;

   return api.put(`/expenses/${id}`, rest, {
     headers: {
       Authorization: `Bearer ${accessToken}`,
     },
   });
};

export const storeExpenses = (data) => {

  const { accessToken, ...rest } = data;

  return api.post("/expenses/", rest, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
