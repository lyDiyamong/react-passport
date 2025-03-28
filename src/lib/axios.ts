// import axios from 'axios';
// import jwtDecode from 'jwt-decode';

// // Create an Axios instance
// const api = axios.create({
//   baseURL: 'https://yourapi.com', // Replace with your API's base URL
// });

// // Function to get the current access token (from localStorage or another storage mechanism)
// function getAccessToken() {
//   return localStorage.getItem('access_token');
// }

// // Function to save the new access token
// function setAccessToken(token) {
//   localStorage.setItem('access_token', token);
// }

// // Function to refresh the token
// async function refreshAccessToken() {
//   // Adjust the refresh call according to your API
//   const refreshResponse = await axios.post('https://yourapi.com/refresh', {
//     // Include necessary refresh token or credentials here
//   });
//   const newToken = refreshResponse.data.data.access_token;
//   setAccessToken(newToken);
//   return newToken;
// }

// // Request interceptor: Check token expiration and set Authorization header
// api.interceptors.request.use(
//   async (config) => {
//     let token = getAccessToken();

//     if (token) {
//       try {
//         const { exp } = jwtDecode(token);
//         // Check if token is expired (Date.now() returns ms while exp is in seconds)
//         if (Date.now() >= exp * 1000) {
//           // Token is expired, so refresh it
//           token = await refreshAccessToken();
//         }
//       } catch (error) {
//         console.error('Failed to decode token:', error);
//         // Optionally, you might want to force a refresh or logout the user here
//       }
//       // Set the Authorization header
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor: If request fails due to 401, try to refresh the token and retry the request
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If error is due to unauthorized access and the request hasn't been retried yet
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const newToken = await refreshAccessToken();
//         originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
//         // Retry the original request with the new token
//         return api(originalRequest);
//       } catch (refreshError) {
//         // If refresh fails, reject with the refresh error
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
