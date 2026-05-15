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
