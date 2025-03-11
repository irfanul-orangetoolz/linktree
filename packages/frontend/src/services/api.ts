import axios from "axios"

// Base URL for your backend (update this based on your deployed backend URL)
const API_BASE_URL = import.meta.env.REACT_APP_API_URL
	? import.meta.env.REACT_APP_API_URL
	: "http://localhost:7001/api/v1"

const api = axios.create({
	baseURL: "http://localhost:7001/api/v1",
	headers: {
		"Content-Type": "application/json"
	}
})

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token")
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		console.log(config)
		return config
	},
	(error) => Promise.reject(error)
)
console.log(API_BASE_URL, api)
export const signup = (data) =>
	api.post("/auth/signup", data).then((response) => response.data)

export const login = (data) =>
	api.post("/auth/login", data).then((response) => response.data)

export const getProfile = () =>
	api.get("/auth/me").then((response) => response.data)

export const logout = () =>
	api.post("/auth/logout").then((response) => response.data)

export const updateProfile = (userId, data) =>
	api.put(`/users/${userId}`, data).then((response) => response.data)

export const getLinks = () =>
	api.get("/links").then((response) => response.data)

export const addLink = (data) =>
	api.post("/links", data).then((response) => response.data)

export const updateLink = (linkId, data) =>
	api.put(`/links/${linkId}`, data).then((response) => response.data)

export const deleteLink = (linkId) =>
	api.delete(`/links/${linkId}`).then((response) => response.data)

export const setLinkPriority = (linkId, priority) =>
	api.put(`/links/${linkId}`, { priority }).then((response) => response.data)

export const archiveLink = (linkId, isArchived) =>
	api
		.put(`/links/${linkId}`, { isArchived })
		.then((response) => response.data)

export const getProfileViews = () =>
	api.get("/analytics/views").then((response) => response.data)

export const getLinkClicks = () =>
	api.get("/analytics/clicks").then((response) => response.data)

export const getTopLinks = () =>
	api.get("/analytics/top-links").then((response) => response.data)

export const getSettings = () =>
	api.get("/settings").then((response) => response.data)

export const updateSettings = (data) =>
	api.put("/settings", data).then((response) => response.data)

export const getProfilePreview = () =>
	api.get("/profiles/preview/mode").then((response) => response.data)

export const getPublicProfile = (username) =>
	axios
		.get(`${API_BASE_URL}/profiles/userName/${username}`)
		.then((response) => response.data)

export const getAllUsers = () =>
	api.get("/admin/users").then((response) => response.data)

export const getAdminAnalytics = () =>
	api.get("/admin/analytics").then((response) => response.data)

export const connectSocialMedia = (data) =>
	api.post("/social/connect", data).then((response) => response.data)
export const getSocialAccounts = () =>
	api.get("/social/accounts").then((response) => response.data)
export const validateMedia = (url) =>
	api.post("/media/validate", { url }).then((response) => response.data)


export const countClicksAndViews = (data) =>
	api.post("/analytics/count-click-view", data).then((response) => response.data)

export default api
