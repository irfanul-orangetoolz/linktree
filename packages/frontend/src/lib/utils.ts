import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getENV = () => {
	return {
		api: {
			base_url:
				import.meta.env.REACT_APP_API_URL ||
				"http://localhost:7001/api/v1"
		},
		linkedin: {
			client_id: import.meta.env.REACT_APP_LINKEDIN_CLIENT_ID,
			client_secret: import.meta.env.REACT_APP_LINKEDIN_CLIENT_SECRET
		},
		instagram: {
			client_id: import.meta.env.REACT_APP_INSTAGRAM_CLIENT_ID,
			client_secret: import.meta.env.REACT_APP_INSTAGRAM_CLIENT_SECRET
		},
		facebook: {
			client_id: import.meta.env.REACT_APP_FACEBOOK_CLIENT_ID,
			client_secret: import.meta.env.REACT_APP_FACEBOOK_CLIENT_SECRET
		},
		google: {
			client_id: import.meta.env.REACT_APP_GOOGLE_CLIENT_ID,
			client_secret: import.meta.env.REACT_APP_GOOGLE_CLIENT_SECRET
		},
		oauth: {
			redirect_url:
				import.meta.env.REACT_APP_OAUTH_REDIRECT_URL ||
				"https://localhost:7070/social-integration"
		}
	}
}
