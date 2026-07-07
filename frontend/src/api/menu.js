import client from './client';

export const getCategories = () => client.get('/categories').then((r) => r.data);
export const getMenu = () => client.get('/menu').then((r) => r.data);
export const getMenuByCategory = (categoryId) => client.get(`/menu/category/${categoryId}`).then((r) => r.data);
export const searchMenu = (q) => client.get('/menu/search', { params: { q } }).then((r) => r.data);
export const getTrending = () => client.get('/menu/trending').then((r) => r.data);
export const getPopular = () => client.get('/menu/popular').then((r) => r.data);
