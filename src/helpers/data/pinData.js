import axios from 'axios';

const baseUrl = 'https://fir-pinterest.firebaseio.com/';

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getPin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getAllPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`).then((response) => {
    const nonPrivateArray = Object.values(response.data).filter((resp) => resp.private === false);
    resolve(nonPrivateArray);
  }).catch((error) => reject(error));
});

const searchPins = (uid, term) => new Promise((resolve, reject) => {
  getAllPins().then((response) => {
    const filteredArray = response.filter((resp) => resp.userId === uid || resp.private === false);
    const searchResults = filteredArray.filter((resp) => resp.name.toLowerCase().includes(term) || resp.description.toLowerCase().includes(term));
    resolve(searchResults);
  }).catch((error) => reject(error));
});

export {
  getBoardPins,
  getPin,
  getAllPins,
  searchPins,
};
