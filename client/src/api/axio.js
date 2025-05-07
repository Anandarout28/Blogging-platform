// filepath: c:\Users\routp\Downloads\Blogging-platform\client\src\api\axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

const savePost = async (content) => {
  try {
    const res = await axios.post('http://localhost:8000/api/posts', { content });
    console.log("Post saved:", res.data);
  } catch (error) {
    console.error("Error saving post", error);
  }
};

export default axiosInstance;