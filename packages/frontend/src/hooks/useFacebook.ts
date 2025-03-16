// useFacebookLogin.ts
import { useState, useEffect } from "react"
import axios from "axios"

// Define Facebook SDK types
interface FacebookAuthResponse {
	accessToken: string
	expiresIn: number
	signedRequest: string
	userID: string
	grantedScopes?: string
}

interface FacebookUserData {
	id: string
	name: string
	email?: string
	picture?: {
		data: {
			url: string
		}
	}
}

interface FacebookLoginResponse {
	authResponse: FacebookAuthResponse | null
	status: "connected" | "not_authorized" | "unknown"
}

declare global {
	interface Window {
		FB: {
			init: (params: {
				appId: string
				cookie: boolean
				xfbml: boolean
				version: string
			}) => void
			login: (
				callback: (response: FacebookLoginResponse) => void,
				options?: { scope: string; return_scopes: boolean }
			) => void
			logout: (callback: () => void) => void
		}
		fbAsyncInit: () => void
	}
}

interface UseFacebookLoginProps {
	appId: string
	scope?: string
}

interface LoginResult {
	response: FacebookLoginResponse
	accessToken: string | null
}

const useFacebookLogin = ({
	appId,
	scope = "public_profile,email"
}: UseFacebookLoginProps) => {
	const [userData, setUserData] = useState<FacebookUserData | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [isSdkLoaded, setIsSdkLoaded] = useState<boolean>(false)
    const [loginResponse, setLoginResponse] = useState<FacebookLoginResponse>()
	useEffect(() => {
		if (typeof window.FB !== "undefined") {
			setIsSdkLoaded(true)
			return
		}

		window.fbAsyncInit = function () {
			window.FB.init({
				appId,
				cookie: true,
				xfbml: true,
				version: "v19.0"
			})
			setIsSdkLoaded(true)
		}

		const script = document.createElement("script")
		script.id = "facebook-jssdk"
		script.src = "https://connect.facebook.net/en_US/sdk.js"
		script.async = true
		script.onload = () => setIsSdkLoaded(true)
		document.body.appendChild(script)

		return () => {
			document.body.removeChild(script)
		}
	}, [appId])

	const login = async (): Promise<LoginResult> => {
		if (!isSdkLoaded || !window.FB) {
			setError("Facebook SDK not loaded yet")
			return {
				response: { authResponse: null, status: "unknown" },
				accessToken: null
			}
		}

		setIsLoading(true)
		setError(null)

		try {
			const response = await new Promise<FacebookLoginResponse>(
				(resolve) => {
					window.FB.login(resolve, {
						scope,
						return_scopes: true
					})
				}
			)

            if (response.authResponse) {
                setLoginResponse(response)
				const accessToken = response.authResponse.accessToken
				await fetchUserData(accessToken)
				return {
					response,
					accessToken
				}
			} else {
				setError("Login cancelled or failed")
				return {
					response,
					accessToken: null
				}
			}
		} catch (err) {
			setError(`Login error: ${(err as Error).message}`)
			return {
				response: { authResponse: null, status: "unknown" },
				accessToken: null
			}
		} finally {
			setIsLoading(false)
		}
	}

	const fetchUserData = async (
		accessToken: string
	): Promise<FacebookUserData> => {
		try {
			const response = await axios.get<FacebookUserData>(
				"https://graph.facebook.com/me",
				{
					params: {
						fields: "id,name,email,picture",
						access_token: accessToken
					}
				}
			)
			setUserData(response.data)
			return response.data
		} catch (err) {
			const errorMessage = `Error fetching user data: ${
				(err as Error).message
			}`
			setError(errorMessage)
			throw new Error(errorMessage)
		}
	}

	const logout = (): void => {
		if (!isSdkLoaded || !window.FB) return

		window.FB.logout(() => {
			setUserData(null)
			setError(null)
		})
	}

	return {
		login,
		logout,
		userData,
		isLoading,
		error,
		isAuthenticated: !!userData,
        isSdkLoaded,
        loginResponse
	}
}

export default useFacebookLogin
