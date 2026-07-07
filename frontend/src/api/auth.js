import client from './client';

export const signup = (payload) => client.post('/auth/signup', payload).then((r) => r.data);
export const login = (payload) => client.post('/auth/login', payload).then((r) => r.data);
