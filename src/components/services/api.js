import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
const REACT_APP_API_KEY = '30684915-fe8dd6b315723ac3e389ee96a';

export const getImagesViaApi = async ({ query, page }) => {
const options = {
    params: {
    q: query,
    page,
    key: REACT_APP_API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    },
};
    const response = await axios.get('/', options);
    return response.data
};