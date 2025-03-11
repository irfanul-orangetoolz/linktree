import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { getSocialAccounts, connectSocialMedia } from "@/services/api"
import Navbar from "@/components/Navbar"
import FacebookLogin from "react-facebook-login"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
	Twitter,
	Instagram,
	Github,
	Youtube,
	Linkedin,
	Facebook,
	ExternalLink,
	X
} from "lucide-react"
import { toast } from "sonner"



const SocialIntegration = () => {
	const { user } = useAuth()
	const [connectedAccounts, setConnectedAccounts] = useState([])
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate("/login")
			return
		}

		const fetchSocialAccounts = async () => {
			try {
				const data = await getSocialAccounts()
				setConnectedAccounts(data)
			} catch (err) {
				toast.error("Failed to load analytics data.")
			} finally {
				setLoading(false)
			}
		}

		fetchSocialAccounts()
	}, [user, navigate])

	const isConnected = (platformId) => {
		return connectedAccounts.some(
			(account) => account.platform === platformId
		)
	}

	const getConnectedAccount = (platformId) => {
		return connectedAccounts.find(
			(account) => account.platform === platformId
		)
	}

	const handleConnect = async (platform) => {
		// In a real app, this would redirect to OAuth flow
		// For demo purposes, we'll simulate a successful connection
		try {
			toast.success(`Starting OAuth flow for ${platform.name}...`)

			// Simulate API delay
			await new Promise((resolve) => setTimeout(resolve, 1500))

			// Simulate successful connection
			const mockConnection = {
				platform: platform.id,
				username: `${platform.id.toLowerCase()}user`,
				followerCount: Math.floor(Math.random() * 10000),
				connected: true
			}

			// Update state with new connection (remove old one if exists)
			setConnectedAccounts((prev) => [
				...prev.filter((acc) => acc.platform !== platform.id),
				mockConnection
			])

			toast.success(`Successfully connected ${platform.name}`)
		} catch (err) {
			toast.error(`Failed to connect ${platform.name}`)
		}
	}
	const handleFBConnect = (data) => {
		console.log(data)
	}
	const handleDisconnect = async (platform) => {
		try {
			toast.info(`Disconnecting ${platform.name}...`)

			// Simulate API delay
			await new Promise((resolve) => setTimeout(resolve, 1000))

			// Update state to remove connection
			setConnectedAccounts((prev) =>
				prev.filter(
					(acc) => !(acc.platform === platform.id && acc.connected)
				)
			)

			toast.success(`Disconnected from ${platform.name}`)
		} catch (err) {
			toast.error(`Failed to disconnect ${platform.name}`)
		}
	}

	if (!user) return null
const socialPlatforms = [
	{
		id: "twitter",
		name: "Twitter",
		icon: <Twitter className="h-5 w-5" />,
		color: "#1DA1F2",
		description:
			"Connect your Twitter account to display your tweets and follower count"
	},
	{
		id: "instagram",
		name: "Instagram",
		icon: <Instagram className="h-5 w-5" />,
		color: "#E1306C",
		description:
			"Display your Instagram posts and followers on your profile"
	},
	{
		id: "github",
		name: "GitHub",
		icon: <Github className="h-5 w-5" />,
		color: "#333333",
		description: "Showcase your repositories and contributions from GitHub"
	},
	{
		id: "youtube",
		name: "YouTube",
		icon: <Youtube className="h-5 w-5" />,
		color: "#FF0000",
		description:
			"Share your latest videos and subscriber count from YouTube"
	},
	{
		id: "linkedin",
		name: "LinkedIn",
		icon: <Linkedin className="h-5 w-5" />,
		color: "#0077B5",
		description: "Connect your professional profile from LinkedIn"
	},
	{
		id: "facebook",
		name: "Facebook",
		icon: <Facebook className="h-5 w-5" />,
		color: "#1877F2",
		description: "Display your Facebook page and follower stats",
		button: (
			<FacebookLogin
				appId="2119871098435513"
				autoLoad
				onClick={(data) => console.log(data)}
				callback={(data) => handleFBConnect(data)}
				fields="id,name,about,link,location,significant_other,website,friends{friends{name}}"
				cssClass=""
				render={(renderProps) => (
					<Button
						className="w-full"
						onClick={() => renderProps.onClick()}
						style={{
							backgroundColor: "#1877F2",
							color: "#ffffff",
							borderColor: "#1877F2"
						}}
					>Login with Facebook</Button>
				)}
			/>
		)
	}
]
	  const facebookLogin = () => {
			const appId = "2119871098435513" // Replace with your actual App ID
			const redirectUri = encodeURIComponent(
				"https://localhost:7070/social-integration"
			)
			const scope = "public_profile"

			// Construct Facebook OAuth URL
			const facebookAuthUrl = `https://graph.facebook.com/v22.0/oauth/access_token?&auth_type=request&client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&client_secret=cf6c114c029393f09ae00e1634cff394`

			// Open a new window for authentication
			window.location.href = facebookAuthUrl
	  }
	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const token = params.get("token")

		if (token) {
			console.log(token, "token")
		}
	}, [])
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
				<div className="mb-6">
					<h1 className="text-3xl font-bold">
						Social Media Integration
					</h1>
					<p className="text-muted-foreground">
						Connect your social media accounts to enhance your
						profile
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{socialPlatforms.map((platform) => {
						const connected = isConnected(platform.id)
						const account = getConnectedAccount(platform.id)

						return (
							<Card
								key={platform.id}
								className={
									connected ? "border-primary-500/20" : ""
								}
							>
								<CardHeader>
									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<div
												className="h-10 w-10 rounded-full flex items-center justify-center mr-3"
												style={{
													backgroundColor: `${platform.color}20`,
													color: platform.color
												}}
											>
												{platform?.icon}
											</div>
											<div>
												<CardTitle className="text-lg">
													{platform.name}
												</CardTitle>
												{connected && (
													<CardDescription className="text-xs">
														{account?.username}
													</CardDescription>
												)}
											</div>
										</div>
										{connected && (
											<div className="text-sm font-medium text-green-500 flex items-center">
												<span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
												Connected
											</div>
										)}
									</div>
								</CardHeader>
								<CardContent>
									{connected ? (
										<div className="text-sm">
											<div className="font-medium">
												{account.follower_count.toLocaleString()}{" "}
												followers
											</div>
											<p className="text-muted-foreground mt-1">
												Your {platform.name} account is
												connected and visible on your
												profile.
											</p>
										</div>
									) : (
										<p className="text-sm text-muted-foreground">
											{platform?.description}
										</p>
									)}
								</CardContent>
								<CardFooter>
									{connected ? (
										<div className="flex space-x-2 w-full">
											<Button
												variant="outline"
												size="sm"
												className="flex-1"
												onClick={() =>
													window.open(
														`https://${platform.id}.com`,
														"_blank"
													)
												}
											>
												<ExternalLink className="h-4 w-4 mr-2" />{" "}
												View Profile
											</Button>
											<Button
												variant="ghost"
												size="sm"
												className="text-destructive hover:text-destructive"
												onClick={() =>
													handleDisconnect(platform)
												}
											>
												<X className="h-4 w-4 mr-2" />{" "}
												Disconnect
											</Button>
										</div>
									) : (
										<Button
											className="w-full"
											// onClick={facebookLogin}
											style={{
												backgroundColor: platform.color,
												color: "#ffffff",
												borderColor: platform.color
											}}
										>
											Connect {platform.name}
										</Button>
										// platform?.button
									)}
								</CardFooter>
							</Card>
						)
					})}
				</div>
			</main>
		</div>
	)
}

export default SocialIntegration
