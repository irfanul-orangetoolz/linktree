import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import {
	getSocialAccounts,
	connectSocialMedia,
	createSocialAccount,
	disconnectSocialAccount
} from "@/services/api"
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
import useFacebookLogin from "@/hooks/useFacebookLogin"
import useLinkedInLogin from "@/hooks/useLinkedin"
import useInstagramLogin from "@/hooks/useInstagramLogin"
import useGoogleLogin from "@/hooks/useGoogleLogin"
import { IIntegrationTypes } from "@/@types/types"
import { getENV } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

const SocialIntegration = () => {
	const { user } = useAuth()
	const { facebook, google, instagram, linkedin, oauth } = getENV()
	const [currentIntegration, setCurrentIntegration] =
		useState<IIntegrationTypes | null>(null)
	const [connectedAccounts, setConnectedAccounts] = useState([])
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()
	// const { login } = useFacebookLogin({
	// 	appId: facebook.client_id
	// })
	const { facebookLogin,facebookData } = useFacebookLogin({
		clientId: facebook.client_id,
		clientSecret: facebook.client_secret,
		redirectUri: oauth.redirect_url
	})
	const { linkedinLogin } = useLinkedInLogin({
		clientId: linkedin.client_id,
		redirectUri: oauth.redirect_url,
		clientSecret: linkedin.client_secret
	})
	const { instagramLogin, instagramData } = useInstagramLogin({
		clientId: instagram.client_id,
		redirectUri: oauth.redirect_url,
		clientSecret: instagram.client_secret
	})
	const { googleLogin } = useGoogleLogin({
		clientId: google.client_id,
		clientSecret: google.client_secret,
		redirectUri: oauth.redirect_url,
		scope: "https://www.googleapis.com/auth/youtube.readonly",
		currentIntegration
	})
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
	const handleFBConnect = async () => {
		localStorage.setItem("currentOAuth", "facebook")
		await facebookLogin()
		// const responses = await createSocialAccount({
		// 	...response,
		// 	platform: "facebook"
		// })
		// console.log(response, "facebook", responses)
	}
	const handleDisconnect = async (platform, id) => {
		try {
			await disconnectSocialAccount(id)
			toast.info(`Disconnecting ${platform.name}...`)

			// Simulate API delay
			await new Promise((resolve) => setTimeout(resolve, 1000))

			// Update state to remove connection
			await fetchSocialAccounts()

			toast.success(`Disconnected from ${platform.name}`)
		} catch (err) {
			toast.error(`Failed to disconnect ${platform.name}`)
		}
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
	useEffect(() => {
		if (!user) {
			navigate("/login")
			return
		}

		fetchSocialAccounts()
	}, [user, navigate, instagramData, facebookData])
	const handleInstagramConnect = async () => {
		localStorage.setItem("currentOAuth", "instagram")
		await instagramLogin()
	}
	const handleLinkedinConnect = async () => {
		localStorage.setItem("currentOAuth", "linkedin")
		await linkedinLogin()
	}
	const handleYoutubeConnect = async () => {
		const { accesstoken } = await googleLogin()
		console.log(accesstoken, "you")
	}
	const handleTwitterConnect = () => {}
	const handleGithubConnect = () => {}
	if (!user) return null
	const socialPlatforms = [
		// {
		// 	id: "twitter",
		// 	name: "Twitter",
		// 	icon: <Twitter className="h-5 w-5" />,
		// 	color: "#1DA1F2",
		// 	description:
		// 		"Connect your Twitter account to display your tweets and follower count",
		// 	onClick: () => handleTwitterConnect()
		// },
		{
			id: "instagram",
			name: "Instagram",
			icon: <Instagram className="h-5 w-5" />,
			color: "#E1306C",
			description:
				"Display your Instagram posts and followers on your profile",
			onClick: () => handleInstagramConnect()
		},
		// {
		// 	id: "github",
		// 	name: "GitHub",
		// 	icon: <Github className="h-5 w-5" />,
		// 	color: "#333333",
		// 	description:
		// 		"Showcase your repositories and contributions from GitHub",
		// 	onClick: () => handleGithubConnect()
		// },
		// {
		// 	id: "youtube",
		// 	name: "YouTube",
		// 	icon: <Youtube className="h-5 w-5" />,
		// 	color: "#FF0000",
		// 	description:
		// 		"Share your latest videos and subscriber count from YouTube",
		// 	onClick: () => handleYoutubeConnect()
		// },
		{
			id: "linkedin",
			name: "LinkedIn",
			icon: <Linkedin className="h-5 w-5" />,
			color: "#0077B5",
			description: "Connect your professional profile from LinkedIn",
			onClick: () => handleLinkedinConnect()
		},
		{
			id: "facebook",
			name: "Facebook",
			icon: <Facebook className="h-5 w-5" />,
			color: "#1877F2",
			description: "Display your Facebook page and follower stats",
			onClick: () => handleFBConnect()
		}
	]

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
												{connected ? (
													<div className=" h-8 w-8 rounded-full">
														<Avatar>
															<AvatarImage
																className="rounded-full"
																src={
																	account
																		?.meta_data
																		?.profile_picture_url
																}
																alt={
																	account
																		?.meta_data
																		?.username
																}
															/>
															<AvatarFallback>
																{account?.meta_data?.name
																	.slice(0, 2)
																	.toUpperCase()}
															</AvatarFallback>
														</Avatar>
													</div>
												) : (
													platform.icon
												)}
											</div>
											<div>
												<CardTitle className="text-lg">
													{platform.name}
												</CardTitle>
												{connected && (
													<CardDescription className="text-xs">
														{
															account?.meta_data
																?.username
														}
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
												{account?.follower_count?.toLocaleString()}{" "}
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
														`https://${platform.id}.com/${account?.meta_data?.username}`,
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
													handleDisconnect(
														platform,
														account.id
													)
												}
											>
												<X className="h-4 w-4 mr-2" />{" "}
												Disconnect
											</Button>
										</div>
									) : (
										<Button
											className="w-full"
											onClick={platform.onClick}
											style={{
												backgroundColor: platform.color,
												color: "#ffffff",
												borderColor: platform.color
											}}
										>
											{platform.icon}
											Connect {platform.name}
										</Button>
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
