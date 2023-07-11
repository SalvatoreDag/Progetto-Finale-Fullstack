import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // L'URL di base dell'API del tuo backend Laravel
});

export const login = (credentials) => {
  return api.post("/login", credentials);
};

const getCsrfToken = async () => {
  const response = await api.get('/csrf-token');
  return response.data.csrf_token;
};

export const registration = (credentials) => {
  return api.post("/register", credentials);
};

export const logout = (userData) => {
  return api.post("/logout", userData, {
    headers: {
      Authorization: `Bearer ${userData}`,
      // "X-CSRF-TOKEN": userData.csrfToken,
    },
  });
};

export const getExpenses = (accessToken) => {
  return api.get("/expenses", {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
};

export const searchExpenses = (data) => {
  return api.get("/expenses",{
    headers: {
      'Authorization': `Bearer ${data.accessToken}`,
    },
    params: {
      'filter[title]': data.title,
    },
  });
};


export const expensesByMonth = (data) => {
  return api.get("/expenses",{
    headers: {
      'Authorization': `Bearer ${data.accessToken}`,
    },
    params: {
      'filter[month]': data.selectedMonthName,
    },
  });
};

export const destroyExpenses = async (data) => {
//  const csrfToken = await getCsrfToken();
//  console.log(csrfToken)
  const id = data.id;
  console.log(id);
  return api.delete(`/expenses/${id}`, {
    headers: {
      'Authorization': `Bearer ${data.accessToken}`,
      // 'X-CSRF-TOKEN': csrfToken,
    },
  })
}

export const updateExpenses = (data) => {
//  const csrfToken = await getCsrfToken();
//  console.log(csrfToken)
console.log(data);
const { id, accessToken, ...rest } = data;
console.log(id, accessToken, rest)
  
   return api.put(`/expenses/${id}`, rest,{
     headers: {
       'Authorization': `Bearer ${accessToken}`,
       // 'X-CSRF-TOKEN': csrfToken,
     },
   })
}
export const storeExpenses = (data) => {
//  const csrfToken = await getCsrfToken();
//  console.log(csrfToken)
const {accessToken, ...rest } = data;

  
    return api.post('/expenses/', rest,{
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        // 'X-CSRF-TOKEN': csrfToken,
      },
    })
}

