// useGoogleLogin.ts
import { useState, useEffect } from "react"
import axios from "axios"
import { IIntegrationTypes } from "@/@types/types"

// Define Google OAuth types
interface GoogleAuthResponse {
	access_token: string
	expires_in: number
	token_type: string
	scope: string
	refresh_token?: string
}

interface GoogleUserData {
	sub: string // Unique identifier
	name: string
	email: string
	picture?: string
}

interface UseGoogleLoginProps {
	clientId: string // Google Client ID
	redirectUri: string // Must match the one in your Google Cloud Console
	clientSecret: string // Google Client Secret (keep secure on backend in production)
	scope?: string // e.g., 'profile email openid'
	currentIntegration: IIntegrationTypes | null
}

const useGoogleLogin = ({
	clientId,
	redirectUri,
	clientSecret,
    scope,
    currentIntegration
}: UseGoogleLoginProps) => {
	const [userData, setUserData] = useState<GoogleUserData | null>(null)
	const [accesstoken, setAccesstoken] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	// Check for code in URL after redirect
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		const code = urlParams.get("code")

		if (code && !accesstoken && currentIntegration==="google") {
			exchangeCodeForToken(code)
		}
	}, [accesstoken, currentIntegration])

	const googleLogin = async (): Promise<{ accesstoken: string | null }> => {
		if (accesstoken) {
			return { accesstoken } // Return existing token if already logged in
		}

		const state = Math.random().toString(36).substring(2) // CSRF protection
		localStorage.setItem("google_oauth_state", state)

		const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
			redirectUri
		)}&scope=${encodeURIComponent(
			scope
		)}&state=${state}&access_type=offline&prompt=consent`
		window.location.href = authUrl // Redirect to Google OAuth page

		return { accesstoken: null } // Initial return before redirect
	}

	const exchangeCodeForToken = async (code: string) => {
		setIsLoading(true)
		setError(null)

		const storedState = localStorage.getItem("google_oauth_state")
		const urlParams = new URLSearchParams(window.location.search)
		const state = urlParams.get("state")

		if (state !== storedState) {
			setError("State mismatch: Possible CSRF attack")
			setIsLoading(false)
			return { accesstoken: null }
		}

		try {
			const response = await axios.post<GoogleAuthResponse>(
				"https://oauth2.googleapis.com/token",
				new URLSearchParams({
					code,
					client_id: clientId,
					client_secret: clientSecret, // In production, move this to a backend
					redirect_uri: redirectUri,
					grant_type: "authorization_code"
				}),
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					}
				}
			)

			const { access_token } = response.data
			setAccesstoken(access_token)
			await fetchUserData(access_token)
			
			localStorage.removeItem("google_oauth_state")
			return { accesstoken: access_token }
		} catch (err) {
			setError(`Error exchanging code: ${(err as Error).message}`)
			return { accesstoken: null }
		} finally {
			setIsLoading(false)
			window.history.replaceState(
				{},
				document.title,
				window.location.pathname
			) // Clean up URL
		}
	}

	const fetchUserData = async (token: string) => {
		try {
			const response = await axios.get<GoogleUserData>(
				"https://www.googleapis.com/oauth2/v3/userinfo",
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			setUserData(response.data)
		} catch (err) {
			setError(`Error fetching user data: ${(err as Error).message}`)
		}
	}

	const logout = () => {
		setUserData(null)
		setAccesstoken(null)
		setError(null)
	}

	return {
		googleLogin,
		logout,
		userData,
		accesstoken,
		isLoading,
		error,
		isAuthenticated: !!userData
	}
}

export default useGoogleLogin
