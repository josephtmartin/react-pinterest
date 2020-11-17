// import axios from 'axios';

// const baseUrl = 'https://fir-pinterest.firebaseio.com/';

// const patchBoards = () => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/boards.json`).then((response) => {
//     const keys = Object.keys(response.data);
//     keys.forEach((key) => {
//       axios.patch(`${baseUrl}/boards/${key}.json`, { firebaseKey: key });
//     });
//   }).catch((error) => reject(error));
// });

// const patchPins = () => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/pins.json`).then((response) => {
//     const keys = Object.keys(response.data);
//     keys.forEach((key) => {
//       axios.patch(`${baseUrl}/pins/${key}.json`, { firebaseKey: key });
//     });
//   }).catch((error) => reject(error));
// });

// export { patchBoards, patchPins };
