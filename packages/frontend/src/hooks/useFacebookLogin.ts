// useFacebookLogin.ts
import { useState, useEffect } from "react"
import axios from "axios"
import { facebookOAuth } from "@/services/api" // Your backend API service

// Define Facebook Graph API response types
interface FacebookAuthResponse {
	access_token: string
	expires_in: number // Seconds until expiration
	token_type: string
}

interface UseFacebookLoginProps {
	clientId: string // Facebook App ID
	redirectUri: string // Must match the redirect URI in your Facebook App settings
	clientSecret: string // Facebook App Secret (keep secure on backend in production)
	scope?: string // Permissions, e.g., 'pages_read_engagement'
	openFBPageSelect: boolean
	setOpenFBPageSelect:(open:boolean)=>void
}

const useFacebookLogin = ({
	clientId,
	redirectUri,
	clientSecret,
	scope = "public_profile,email,pages_read_engagement,pages_show_list", // Default scopes for follower count access
	openFBPageSelect,
	setOpenFBPageSelect
}: UseFacebookLoginProps) => {
	const [facebookData, setFacebookData] =
		useState<any | null>(null)

	// Check for code in URL after redirect
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		const code = urlParams.get("code")

		const currentOAuth = localStorage.getItem("currentOAuth")
		if (code && !facebookData && currentOAuth === "facebook") {
			exchangeCodeForToken(code)
		}
	}, [facebookData])

	// Initiate Facebook login
	const facebookLogin = async (): Promise<{
		facebookData: FacebookAuthResponse | null
	}> => {
		if (facebookData) {
			return { facebookData } // Return existing token if already logged in
		}

		const baseUrl = "https://www.facebook.com/v19.0/dialog/oauth"
		const params = new URLSearchParams({
			client_id: clientId,
			redirect_uri: redirectUri,
			response_type: "code",
			scope
		}).toString()

		const url = `${baseUrl}?${params}`
		localStorage.setItem("currentOAuth", "facebook") // Track OAuth flow
		window.location.href = url // Redirect to Facebook OAuth page

		return { facebookData: null } // Initial return before redirect
	}

	// Exchange authorization code for access token
	const exchangeCodeForToken = async (code: string) => {
		try {
			// Call your backend to exchange the code for an access token
			const response = await facebookOAuth({ code, redirectUri })
			if (response) {
				setOpenFBPageSelect(true)
				console.log("Facebook OAuth response:", response)
				setFacebookData(response)
				localStorage.removeItem("currentOAuth") // Clean up
			}
		} catch (err) {
			console.error("Error exchanging code for token:", err)
		} finally {
			// Clean up URL parameters
			window.history.replaceState(
				{},
				document.title,
				window.location.pathname
			)
		}
	}

	return {
		facebookLogin,
		facebookData
	}
}

export default useFacebookLogin
