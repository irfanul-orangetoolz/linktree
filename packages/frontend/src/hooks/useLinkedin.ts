// useLinkedInLogin.ts
import { useState, useEffect } from "react"
import axios from "axios"
import { linkedinOAuth } from "@/services/api"
import { IIntegrationTypes } from "@/@types/types"

// Define LinkedIn OAuth types
interface LinkedInAuthResponse {
	access_token: string
	expires_in: number
	token_type: string
	scope: string
	id_token?: string // OpenID Connect ID token
}

interface LinkedInUserData {
	sub: string // Unique identifier (subject)
	name: string
	given_name: string
	family_name: string
	email?: string
	email_verified?: boolean
	picture?: string
}

interface UseLinkedInLoginProps {
	clientId: string // LinkedIn Client ID
	redirectUri: string // Must match the one in your LinkedIn App settings
	clientSecret: string // LinkedIn Client Secret (keep secure on backend in production)
	scope?: string // e.g., 'openid profile email'
}

const useLinkedInLogin = ({
	clientId,
	redirectUri,
	clientSecret,
	scope = "openid profile email",
}: UseLinkedInLoginProps) => {
	const [userData, setUserData] = useState<LinkedInUserData | null>(null)
	const [accessToken, setAccessToken] = useState<LinkedInAuthResponse | null>(
		null
	)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	// Check for code in URL after redirect
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		const code = urlParams.get("code")
		const currentOAuth = localStorage.getItem("currentOAuth")
		if (code && !accessToken && currentOAuth === "linkedin") {
			exchangeCodeForToken(code)
		}
	}, [accessToken])

	const linkedinLogin = () => {
		const state = Math.random().toString(36).substring(2) // Generate random state for CSRF protection
		const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
			redirectUri
		)}&scope=${encodeURIComponent(scope)}&state=${state}`
		window.location.href = authUrl // Redirect to LinkedIn OAuth page
		return { accessToken }
	}

	const exchangeCodeForToken = async (code: string) => {
		setIsLoading(true)
		setError(null)

		try {
			const response = await linkedinOAuth({
				code,
				redirectUri: redirectUri
			})

			const { access_token } = response
			setAccessToken(response)
			await fetchUserData(access_token)
		} catch (err) {
			setError(`Error exchanging code: ${(err as Error).message}`)
		} finally {
			setIsLoading(false)
			window.history.replaceState(
				{},
				document.title,
				window.location.pathname
			) // Clean up URL
			
				localStorage.removeItem("currentOAuth")
		}
	}

	const fetchUserData = async (token: string) => {
		try {
			const response = await axios.get<LinkedInUserData>(
				"https://api.linkedin.com/v2/userinfo",
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
		setAccessToken(null)
		setError(null)
	}

	return {
		linkedinLogin,
		logout,
		userData,
		accessToken,
		isLoading,
		error,
		isAuthenticated: !!userData
	}
}

export default useLinkedInLogin
