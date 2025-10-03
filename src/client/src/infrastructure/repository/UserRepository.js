import { userApi } from "../datasource/UserApi";

export const userRepository = {
  getUsers: async () => {
    return await userApi
      .get()
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error.errorData);
      });
  },
  createUser: async ({ name, email, age, bod }) => {
    return await userApi
      .post("", { name, email, age, bod })
      .then((data) => {
        return data.data.user;
      })
      .catch((error) => {
        throw new Error(error.errorData);
      });
  },
  updateUser: async ({ id, data: { name, email, age, bod } }) => {
    return await userApi
      .put(`/${id}`, { name, email, age, bod })
      .then((data) => {
        return data.data.message;
      })
      .catch((error) => {
        throw new Error(error.errorData);
      });
  },
  deleteUser: async ({ id }) => {
    return await userApi
      .delete(`/${id}`)
      .then((data) => {
        return data.data.message;
      })
      .catch((error) => {
        throw new Error(error.errorData);
      });
  },
};
