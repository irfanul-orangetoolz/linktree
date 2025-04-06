import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import { Link,useLocation,useRoutes } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Sun, Moon, User, Settings, LogOut, Home, MenuIcon, BarChart, LinkIcon, WifiHighIcon } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import Logo from "./logo/Logo"

const Navbar = () => {
	const { user, logout } = useAuth()
	const { theme, setTheme } = useTheme()
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768)
		}

		checkMobile()
		window.addEventListener("resize", checkMobile)

		return () => {
			window.removeEventListener("resize", checkMobile)
		}
	}, [])
	const ThemeToggle = () => (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
			aria-label="Toggle theme"
		>
			{theme === "light" ? (
				<Moon className="h-5 w-5" />
			) : (
				<Sun className="h-5 w-5" />
			)}
		</Button>
	)

	const MobileMenu = () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden">
					<MenuIcon className="h-5 w-5" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<div className="flex flex-col gap-4 py-4">
					{user ? (
						<>
							<div className="flex items-center gap-4 p-4">
								<Avatar>
									<AvatarImage
										src={user.profile_image_url}
										alt={user.name}
									/>
									<AvatarFallback>
										{user.name.slice(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm font-medium">
										{user.name}
									</p>
									<p className="text-xs text-muted-foreground">
										@{user.user_name}
									</p>
								</div>
							</div>
							<Link
								to="/dashboard"
								className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md"
							>
								<Home className="h-4 w-4" />
								Dashboard
							</Link>
							<Link
								to="/analytics"
								className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md"
							>
								<BarChart className="h-4 w-4" />
								Analytics
							</Link>
							<Link
								to="/manage-links"
								className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md"
							>
								<LinkIcon className="h-4 w-4" />
								Manage Links
							</Link>
							<Link
								to="/social-integration"
								className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md"
							>
								<WifiHighIcon className="h-4 w-4" />
								Social Integrations
							</Link>
							<Link
								to="/profile"
								className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md"
							>
								<User className="h-4 w-4" />
								View Profile
							</Link>
							<Link
								to="/edit-profile"
								className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md"
							>
								<Settings className="h-4 w-4" />
								Edit Profile
							</Link>
							<button
								onClick={logout}
								className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md text-left text-red-500"
							>
								<LogOut className="h-4 w-4" />
								Logout
							</button>
						</>
					) : (
						<>
							<Link
								to="/"
								className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md"
							>
								<Home className="h-4 w-4" />
								Home
							</Link>
							<Link
								to="/login"
								className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md"
							>
								Login
							</Link>
							<Link
								to="/register"
								className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md"
							>
								Register
							</Link>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
	const routes = useLocation()
	return (
		<nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
			<div className="container flex h-16 items-center justify-between px-4">
				<div className="flex items-center gap-4">
					{isMobile && <MobileMenu />}
					<Link to="/" className="flex items-center gap-2">
						<span className="font-bold text-xl bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
							
							<Logo showText={isMobile ? false : true}  iconSize={30}/>
						</span>
					</Link>
				</div>

				<div className="hidden md:flex items-center gap-8">
					{user ? (
						<>
							<Link
								to="/dashboard"
								className={`text-sm font-medium hover:text-primary-500 ${
									routes.pathname === "/dashboard"
										? "text-primary-500"
										: ""
								}`}
							>
								Dashboard
							</Link>
							<Link
								to="/analytics"
								className={`text-sm font-medium hover:text-primary-500 ${
									routes.pathname === "/analytics"
										? "text-primary-500"
										: ""
								}`}
							>
								Analytics
							</Link>
							<Link
								to="/social-integration"
								className={`text-sm font-medium hover:text-primary-500 ${
									routes.pathname === "/social-integration"
										? "text-primary-500"
										: ""
								}`}
							>
								Social Integrations
							</Link>
							<Link
								to="/manage-links"
								className={`text-sm font-medium hover:text-primary-500 ${
									routes.pathname === "/manage-links"
										? "text-primary-500"
										: ""
								}`}
							>
								Manage Links
							</Link>
						</>
					) : (
						<>
							<Link
								to="/"
								className={`text-sm font-medium hover:text-primary-500 ${
									routes.pathname === "/"
										? "text-primary-500"
										: ""
								}`}
							>
								Home
							</Link>
						</>
					)}
				</div>

				<div className="flex items-center gap-4">
					<ThemeToggle />

					{user ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="relative h-8 w-8 rounded-full"
								>
									<Avatar className="h-8 w-8">
										<AvatarImage
											src={user.profile_image_url}
											alt={user.name}
										/>
										<AvatarFallback>
											{user.name
												.slice(0, 2)
												.toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<div className="flex items-center justify-start gap-2 p-2">
									<div className="flex flex-col space-y-1 leading-none">
										<p className="font-medium">
											{user.name}
										</p>
										<p className="text-xs text-muted-foreground">
											@{user.user_name}
										</p>
									</div>
								</div>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link
										to="/profile"
										className="cursor-pointer"
									>
										<User className="mr-2 h-4 w-4" />
										<span>View Profile</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link
										to="/edit-profile"
										className="cursor-pointer"
									>
										<Settings className="mr-2 h-4 w-4" />
										<span>Edit Profile</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={logout}
									className="text-red-500 focus:text-red-500 cursor-pointer"
								>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Logout</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<div className="flex items-center gap-2">
							<Button variant="ghost" asChild>
								<Link to="/login">Login</Link>
							</Button>
							<Button asChild>
								<Link to="/register">Sign Up</Link>
							</Button>
						</div>
					)}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
