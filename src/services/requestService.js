import axios from 'axios';

export const request = (method, url, data) => axios({ method, url, data });
