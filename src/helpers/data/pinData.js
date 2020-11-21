import axios from 'axios';

const baseUrl = 'https://fir-pinterest.firebaseio.com/';

const getUserPins = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="userId"&equalTo="${userId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

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

const getAllPins = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`).then((response) => {
    const nonPrivateArray = Object.values(response.data).filter((resp) => resp.private === 'Public' || resp.userId === userId);
    resolve(nonPrivateArray);
  }).catch((error) => reject(error));
});

const searchPins = (uid, term) => new Promise((resolve, reject) => {
  getAllPins().then((response) => {
    const filteredArray = response.filter((resp) => resp.userId === uid || resp.private === 'Public');
    const searchResults = filteredArray.filter((resp) => resp.name.toLowerCase().includes(term) || resp.description.toLowerCase().includes(term));
    resolve(searchResults);
  }).catch((error) => reject(error));
});

const createPin = (data) => axios.post(`${baseUrl}/pins.json`, data).then((response) => {
  const update = { firebaseKey: response.data.name };
  axios.patch(`${baseUrl}/pins/${response.data.name}.json`, update)
    .catch((error) => console.warn(error));
});

const updatePin = (dataObject) => axios.patch(`${baseUrl}/pins/${dataObject.firebaseKey}.json`, dataObject);

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

export {
  getBoardPins,
  getPin,
  getAllPins,
  searchPins,
  getUserPins,
  createPin,
  updatePin,
  deletePin,
};
