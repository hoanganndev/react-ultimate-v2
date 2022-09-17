import axiosClient from "../utils/axiosClient";

const getAllUsers = () => {
  return axiosClient.get("api/v1/participant/all");
};

const postCreateNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axiosClient.post("api/v1/participant", data);
};

const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axiosClient.put("api/v1/participant", data);
};

const deleteUser = id => {
  return axiosClient.delete("api/v1/participant", { data: { id } });
};

export { postCreateNewUser, getAllUsers, putUpdateUser, deleteUser };
