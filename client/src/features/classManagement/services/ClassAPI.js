import api from '../../../shared/api';

export const fetchClassDocs = async () => {
  const { data } = await api.get('/api/classes');
  return data.data || [];
};

export const createClass = async (clevel) => {
  const { data } = await api.post('/api/classes', { clevel });
  return data;
};

export const createSection = async (payload) => {
  const { data } = await api.post('/api/sections', payload);
  return data;
};

export const fetchSectionsByClass = async (cId) => {
  const { data } = await api.get('/api/sections', { params: { cId } });
  return (data.data || []).map((s) => (typeof s === 'string' ? s : s.name));
};