import React, { createContext, useContext, useState, useEffect } from "react"
import {
	getProfile,
	login as apiLogin,
	signup as apiSignup,
	logout as apiLogout,
	updateProfile as apiUpdateProfile
} from "../services/api"
import { toast } from "sonner"

// Define User Interface
interface User {
	id: string
	email: string
	user_name?: string
	name: string
	bio?: string
	profile_image_url?: string
	role?: string
}

// Define AuthContext Type
interface AuthContextType {
	user: User | null
	token: string | null
	loading: boolean
	login: (email: string, password: string) => Promise<void>
	register: (
		email: string,
		username: string,
		password: string,
		bio: string,
		profileImageUrl: string,
		name:string
	) => Promise<void>
	logout: () => void
	updateProfile: (data: Partial<User>) => Promise<void>
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [user, setUser] = useState<User | null>(null)
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("token")
	)
	const [loading, setLoading] = useState<boolean>(true)

	// Fetch User Data If Token Exists
	useEffect(() => {
		const storedToken = localStorage.getItem("token")
		if (storedToken) {
			setToken(storedToken)
			fetchUserData(storedToken)
		} else {
			setLoading(false)
		}
	}, [])

	// Fetch User Data from API
	const fetchUserData = async (authToken: string) => {
		try {
			const userData = await getProfile()
			setUser({
				id: userData.id,
				email: userData.email,
				name: userData.name,
				user_name: userData.user_name,
				bio: userData.bio,
				profile_image_url: userData.profile_image_url,
				role: userData.role || "user"
			})
		} catch (err) {
			localStorage.removeItem("token")
			setToken(null)
			setUser(null)
		} finally {
			setLoading(false)
		}
	}

	// Login Function
	const login = async (email: string, password: string) => {
		setLoading(true)
		try {
			const response = await apiLogin({ email, password })
			localStorage.setItem("token", response.token)
			setToken(response.token)
			fetchUserData(response.token)
			toast.success("Logged in successfully!")
		} catch (error) {
			toast.error("Invalid credentials")
			throw new Error("Invalid credentials")
		} finally {
			setLoading(false)
		}
	}

	// Register Function
	const register = async (
		email: string,
		username: string,
		password: string,
		bio: string,
		profileImageUrl: string,
		name:string
	) => {
		setLoading(true)
		try {
			const response = await apiSignup({ email, username, password,bio,profileImageUrl ,name})
			localStorage.setItem("token", response.token)
			setToken(response.token)
			fetchUserData(response.token)
			toast.success("Account created successfully!")
		} catch (error) {
			toast.error("Registration failed")
			throw new Error("Registration failed")
		} finally {
			setLoading(false)
		}
	}

	// Logout Function
	const logout = () => {
		apiLogout()
		setUser(null)
		setToken(null)
		localStorage.removeItem("token")
		toast.info("Logged out successfully")
	}

	// Update Profile Function
	const updateProfile = async (data: Partial<User>) => {
		if (!user) return
		setLoading(true)
		try {
			await apiUpdateProfile(user.id, data)
			const updatedUser = { ...user, ...data }
			setUser(updatedUser)
			localStorage.setItem("user", JSON.stringify(updatedUser))
			toast.success("Profile updated successfully!")
		} catch (error) {
			toast.error("Profile update failed")
		} finally {
			setLoading(false)
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				loading,
				login,
				register,
				logout,
				updateProfile
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

// Custom Hook to Use Auth Context
export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}
