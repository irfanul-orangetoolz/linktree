// useInstagramLogin.ts
import { useState, useEffect } from "react"
import axios from "axios"
import { instagramOAuth } from "@/services/api"
import { IIntegrationTypes } from "@/@types/types"

// Define Instagram Basic Display API types
interface InstagramAuthResponse {
	access_token: string
	user_id: number
}


interface UseInstagramLoginProps {
	clientId: string // Instagram Client ID
	redirectUri: string // Must match the one in your Instagram App settings
	clientSecret: string // Instagram Client Secret (keep secure on backend in production)
	scope?: string // e.g., 'user_profile,user_media'
}

const useInstagramLogin = ({
	clientId,
	redirectUri,
	clientSecret,
	scope = "instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights",
}: UseInstagramLoginProps) => {
	const [instagramData, setInstagramDta] = useState<any | null>(null)
	

	// Check for code in URL after redirect
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		const code = urlParams.get("code")
		
		const currentOAuth = localStorage.getItem("currentOAuth")
		if (code && !instagramData && currentOAuth === "instagram") {
			exchangeCodeForToken(code)
		}
	}, [instagramData])

	const instagramLogin = async (): Promise<{
		instagramData: any | null
	}> => {
		if (instagramData) {
			return { instagramData } // Return existing token if already logged in
		}
		const baseUrl = "https://www.instagram.com/oauth/authorize"
		const params = new URLSearchParams({
			enable_fb_login: "0",
			force_authentication: "1",
			client_id: clientId,
			redirect_uri: redirectUri,
			response_type: "code",
			scope
		}).toString()

		const url = `${baseUrl}?${params}`
		window.location.href = url // Redirect to Instagram OAuth page

		return { instagramData: null } // Initial return before redirect
	}

	const exchangeCodeForToken = async (code: string) => {
		
		try {
			// Call your backend to exchange the code for an access token
			const response = await instagramOAuth({ code, redirectUri })
			if (response) {
				console.log(response, "final")
				setInstagramDta(response)
				localStorage.removeItem("currentOAuth")
			}
		} catch (err) {
		} finally {
			window.history.replaceState(
				{},
				document.title,
				window.location.pathname
			)
		}
	}

	

	return {
		instagramLogin,
		instagramData
		
	}
}

export default useInstagramLogin
