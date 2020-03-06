import axios from 'axios';

export const fetchAllEvents = () => {
  return axios.get('/api/events');
}

export const postEvent = eventData => {
  return axios.post('/api/events', eventData);
}

export const patchEvent = eventData => {
  return axios.patch(`/api/events/${eventData.id}`, eventData);
}

export const deleteEvent = event => {
  return axios.delete(`/api/events/${event._id}`, {data: event});
}

export const approveEvent = eventId => {
  return axios.patch(`/api/events/${eventId}`, {approved: true});
}