import instance from "./axios";

export async function registerUser({ username, email, password }) {
  try {
    const response = await instance.post("/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}


export async function loginUser({email, password}) {
  try {
    const response = await instance.post('/auth/login', {
      email,
      password,
    })
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function logOutUser(){
   try {
    const response = await instance.get('/auth/logout');
      return response.data;
   } catch (error) {
    console.log(error);
   }
}

export async function getUserProfile() {
  try {
    const response = await instance.get('/auth/profile');
     return response.data;
  } catch (error) {
    console.log(error);
  }
}