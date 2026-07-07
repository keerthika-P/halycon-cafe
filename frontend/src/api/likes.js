import client from './client';

export const getLikedItems = () => client.get('/likes').then((r) => r.data);
export const likeItem = (menuItemId) => client.post(`/likes/${menuItemId}`);
export const unlikeItem = (menuItemId) => client.delete(`/likes/${menuItemId}`);
