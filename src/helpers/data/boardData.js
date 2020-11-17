import axios from 'axios';

const baseUrl = 'https://fir-pinterest.firebaseio.com/';

const getBoards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json`).then((response) => {
    const boards = Object.values(response.data);
    resolve(boards);
  }).catch((error) => reject(error));
});

const getSingleBoard = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards/${boardId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export { getBoards, getSingleBoard };
