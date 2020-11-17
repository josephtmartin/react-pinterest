import axios from 'axios';

const baseUrl = 'https://fir-pinterest.firebaseio.com/';

const getAllUserBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSingleBoard = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards/${boardId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const createBoard = (data) => axios.post(`${baseUrl}/boards.json`, data).then((response) => {
  const update = { firebaseKey: response.data.name };
  axios.patch(`${baseUrl}/boards/${response.data.name}.json`, update)
    .catch((error) => console.warn(error));
});

const updateBoard = (firebaseKey, dataObject) => axios.patch(`${baseUrl}/boards/${firebaseKey}.json`, dataObject);

export {
  getAllUserBoards,
  getSingleBoard,
  createBoard,
  updateBoard,
};
