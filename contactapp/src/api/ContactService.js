import axios from "axios";


const API_URL = 'http://localhost:8081/contacts'

export async function saveContact(contact) {
    return await axios.post(API_URL, contact);
}

export async function getContactsByPageQuery(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getContact(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function updateContact(contact) {
    return await axios.post(API_URL, contact);
}

export async function deleteContact(id) {
    return await axios.post(`${API_URL}/${id}`);
}

export async function updatePhoto(formData) {
    return await axios.post(`${API_URL}/photo`, formData);
}
