import axiosClient from "../utils/axiosClient";

const getAllUsers = () => {
  return axiosClient.get("api/v1/participant/all");
};
const getUsersWithPaginate = (page, limit) => {
  return axiosClient.get(`api/v1/participant?page=${page}&limit=${limit}`);
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

const postLogin = (email, password) => {
  return axiosClient.post("api/v1/login", { email, password });
};

const postRegister = (email, username, password) => {
  return axiosClient.post("api/v1/register", { email, username, password });
};

const getQuizByUser = () => {
  return axiosClient.get("api/v1/quiz-by-participant");
};

const getDataQuiz = id => {
  return axiosClient.get(`/api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = data => {
  return axiosClient.post(`/api/v1/quiz-submit`, { ...data }); // raw data
};

export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getUsersWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
};
