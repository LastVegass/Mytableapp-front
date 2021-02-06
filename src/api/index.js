import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:3000/api/version1/'
})

export function getWorkers() {
	return instance.get('users')
}

export function showWorker(id) {
	return instance.get(`users/${id}`)
}

export function updateWorkerData({id, name, birthdate}) {
	return instance.put(`users/${id}`, {name, birthdate})
}

export function deleteWorker(id) {
	return instance.delete(`users/${id}`)
}

export function createWorker({name, birthdate}) {
	return instance.post(`users`, {name, birthdate})
}

export function sortWorkersByName(){
	return instance.get('sorting/sort_by_name')
}

export function sortWorkersByBirthdate(){
	return instance.get('sorting/sort_by_birthdate')
}