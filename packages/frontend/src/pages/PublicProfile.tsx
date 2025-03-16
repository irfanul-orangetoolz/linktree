import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LinkItem } from "@/components/LinkCard"
import { ExternalLink, Globe } from "lucide-react"
import { toast } from "sonner"
import { getPublicProfile, countClicksAndViews } from "@/services/api"

// A mock database of users for demonstration
const mockUsers = [
	{
		id: "1",
		email: "demo@example.com",
		username: "imirfanul",
		name: "Demo User",
		bio: "This is a demo profile for the social showcase platform.",
		profileImage: "https://source.unsplash.com/random/300x300/?portrait"
	}
]

const PublicProfile = () => {
	const { username } = useParams<{ username: string }>()
	const [user, setUser] = useState<any | null>(null)
	const [links, setLinks] = useState<LinkItem[]>([])
	const [loading, setLoading] = useState(true)
	const linkRefs = useRef({})
	useEffect(() => {
		const loadData = async () => {
			try {
				const data = await getPublicProfile(username)
				setUser(data)
			} catch (err) {
				toast.error("Failed to load analytics data.")
			} finally {
				setLoading(false)
			}
		}

		loadData()
	}, [username])
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const linkId = entry.target.getAttribute("data-id")
						const userId = entry.target.getAttribute("ref-id")
						if (linkId && userId) {
							countClicksAndViews({
								linkId,
								userId,
								eventType: "view"
							})
						}
					}
				})
			},
			{ threshold: 1.0 } // Fires when fully visible
		)
		user?.Links?.forEach((link) => {
			if (linkRefs.current[link.id]) {
				observer.observe(linkRefs.current[link.id])
			}
		})

		return () => {
			user?.Links?.forEach((link) => {
				if (linkRefs.current[link.id]) {
					observer.unobserve(linkRefs.current[link.id])
				}
			})
		}
	}, [user])

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-accent">
				<div className="animate-pulse flex flex-col items-center">
					<div className="h-24 w-24 bg-accent rounded-full mb-4"></div>
					<div className="h-6 w-40 bg-accent rounded mb-2"></div>
					<div className="h-4 w-24 bg-accent rounded"></div>
				</div>
			</div>
		)
	}

	if (!user) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-accent p-4">
				<div className="text-center max-w-md">
					<h1 className="text-2xl font-bold mb-4">
						Profile Not Found
					</h1>
					<p className="text-muted-foreground mb-6">
						Sorry, the profile @{username} doesn't exist or has been
						removed.
					</p>
					<Button asChild>
						<a href="/">Return Home</a>
					</Button>
				</div>
			</div>
		)
	}

	const copyProfileLink = () => {
		navigator.clipboard.writeText(window.location.href)
		toast.success("Profile link copied to clipboard!")
	}
	const handleClick = async (linkId, userId) => {
		await countClicksAndViews({ linkId, userId, eventType: "click" })
	}
	return (
		<div className="min-h-screen flex justify-center bg-gradient-to-b from-background to-accent p-4 pb-20">
			<div className="w-full max-w-md">
				<div className="flex flex-col items-center text-center pt-12 pb-8">
					<div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-background shadow-lg">
						<img
							src={user.profile_image_url}
							alt={user.name}
							className="w-full h-full object-cover"
						/>
					</div>
					<h1 className="text-2xl font-bold mb-1">{user.name}</h1>
					<p className="text-muted-foreground mb-4">
						@{user.user_name}
					</p>

					{user.bio && <p className="mb-8 max-w-sm">{user.bio}</p>}

					{/* Links Section */}
					{user?.Links?.length > 0 ? (
						<div className="w-full space-y-3">
							{user?.Links?.map((link) => (
								<a
									key={link.id}
									href={link.url}
									target="_blank"
									ref-id={user.id}
									rel="noopener noreferrer"
									data-id={link.id}
									ref={(el) => {
										if (el) linkRefs.current[link.id] = el
									}}
									onClick={() =>
										handleClick(link.id, user.id)
									}
									className="flex items-center justify-center w-full p-3 bg-card hover:bg-accent rounded-lg border shadow-sm transition-colors"
								>
									<Globe className="mr-2 h-4 w-4" />
									<span>{link.title}</span>
									<ExternalLink className="ml-2 h-3 w-3 opacity-70" />
								</a>
							))}
						</div>
					) : (
						<div className="w-full p-4 bg-card rounded-lg border text-center">
							<p className="text-muted-foreground">
								No links added yet.
							</p>
						</div>
					)}

					{/* Share Button */}
					<div className="mt-8">
						<Button
							variant="outline"
							size="sm"
							onClick={copyProfileLink}
						>
							Share Profile
						</Button>
					</div>

					{/* Footer */}
					<div className="mt-12 pt-4 border-t w-full text-center">
						<p className="text-xs text-muted-foreground">
							Powered by{" "}
							<span className="font-medium">SocialNexus</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PublicProfile
