import instance from "./axios";

export async function registerUser({ username, email, password }) {
  try {
    const response = await instance.post("/register", {
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
    const response = await instance.post('/login', {
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
     const response = await instance.get('/logout');
      return response.data;
   } catch (error) {
    console.log(error);
   }
}

export async function getUserProfile() {
  try {
     const response = await instance.get('/profile');
     return response.data;
  } catch (error) {
    console.log(error);
  }
}