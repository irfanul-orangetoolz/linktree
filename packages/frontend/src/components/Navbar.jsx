import React, { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Navbar = () => {
	const { user, logout, token } = useContext(AuthContext)
	const [isOpen, setIsOpen] = useState(false)
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate("/login")
	}

	const toggleMenu = () => setIsOpen(!isOpen)

	return (
		<nav className="bg-blue-600 p-4 shadow-md">
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				<NavLink to="/" className="text-white text-xl font-bold">
					My Platform
				</NavLink>

				{/* Hamburger Menu for Mobile */}
				<button
					onClick={toggleMenu}
					className="md:hidden text-white focus:outline-none"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d={
								isOpen
									? "M6 18L18 6M6 6l12 12"
									: "M4 6h16M4 12h16M4 18h16"
							}
						/>
					</svg>
				</button>

				{/* Desktop Menu */}
				<div className="hidden md:flex space-x-4">
					{token ? (
						<>
							<NavLink
								to="/profile"
								className={({ isActive }) =>
									isActive
										? "text-white font-semibold underline"
										: "text-white hover:underline"
								}
							>
								Profile
							</NavLink>
							<NavLink
								to="/links"
								className={({ isActive }) =>
									isActive
										? "text-white font-semibold underline"
										: "text-white hover:underline"
								}
							>
								Links
							</NavLink>
							<NavLink
								to="/analytics"
								className={({ isActive }) =>
									isActive
										? "text-white font-semibold underline"
										: "text-white hover:underline"
								}
							>
								Analytics
							</NavLink>
							<NavLink
								to="/settings"
								className={({ isActive }) =>
									isActive
										? "text-white font-semibold underline"
										: "text-white hover:underline"
								}
							>
								Settings
							</NavLink>
							<NavLink
								to="/preview"
								className={({ isActive }) =>
									isActive
										? "text-white font-semibold underline"
										: "text-white hover:underline"
								}
							>
								Preview
							</NavLink>
							{user?.role === "admin" && (
								<>
									<NavLink
										to="/admin/users"
										className={({ isActive }) =>
											isActive
												? "text-white font-semibold underline"
												: "text-white hover:underline"
										}
									>
										Admin Users
									</NavLink>
									<NavLink
										to="/admin/analytics"
										className={({ isActive }) =>
											isActive
												? "text-white font-semibold underline"
												: "text-white hover:underline"
										}
									>
										Admin Analytics
									</NavLink>
								</>
							)}
							<button
								onClick={handleLogout}
								className="text-white hover:underline"
							>
								Logout
							</button>
						</>
					) : (
						<>
							<NavLink
								to="/login"
								className={({ isActive }) =>
									isActive
										? "text-white font-semibold underline"
										: "text-white hover:underline"
								}
							>
								Login
							</NavLink>
							<NavLink
								to="/signup"
								className={({ isActive }) =>
									isActive
										? "text-white font-semibold underline"
										: "text-white hover:underline"
								}
							>
								Sign Up
							</NavLink>
						</>
					)}
				</div>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<div className="md:hidden mt-4 flex flex-col space-y-2">
					{token ? (
						<>
							<NavLink
								to="/profile"
								onClick={toggleMenu}
								className={({ isActive }) =>
									isActive
										? "text-white font-semibold underline"
										: "text-white hover:underline"
								}
							>
								Profile
							</NavLink>
							<NavLink
								to="/links"
								onClick={toggleMenu}
								className={({ isActive }) =>
									isActive
										? "text-white font-semibold underline"
										: "text-white hover:underline"
								}
							>
								Links
							</NavLink>
							<NavLink
								to="/analytics"
								onClick={toggleMenu}
								className={({ isActive }) =>
									isActive
										? "text-white font-semibold underline"
										: "text-white hover:underline"
								}
							>
								Analytics
							</NavLink>
							<NavLink
								to="/settings"
								onClick={toggleMenu}
								className={({ isActive }) =>
									isActive
										? "text-white font-semibold underline"
										: "text-white hover:underline"
								}
							>
								Settings
							</NavLink>
							<NavLink
								to="/preview"
								onClick={toggleMenu}
								className={({ isActive }) =>
									isActive
										? "text-white font-semibold underline"
										: "text-white hover:underline"
								}
							>
								Preview
							</NavLink>
							{user?.role === "admin" && (
								<>
									<NavLink
										to="/admin/users"
										onClick={toggleMenu}
										className={({ isActive }) =>
											isActive
												? "text-white font-semibold underline"
												: "text-white hover:underline"
										}
									>
										Admin Users
									</NavLink>
									<NavLink
										to="/admin/analytics"
										onClick={toggleMenu}
										className={({ isActive }) =>
											isActive
												? "text-white font-semibold underline"
												: "text-white hover:underline"
										}
									>
										Admin Analytics
									</NavLink>
								</>
							)}
							<button
								onClick={() => {
									handleLogout()
									toggleMenu()
								}}
								className="text-white hover:underline text-left"
							>
								Logout
							</button>
						</>
					) : (
						<>
							<NavLink
								to="/login"
								onClick={toggleMenu}
								className={({ isActive }) =>
									isActive
										? "text-white font-semibold underline"
										: "text-white hover:underline"
								}
							>
								Login
							</NavLink>
							<NavLink
								to="/signup"
								onClick={toggleMenu}
								className={({ isActive }) =>
									isActive
										? "text-white font-semibold underline"
										: "text-white hover:underline"
								}
							>
								Sign Up
							</NavLink>
						</>
					)}
				</div>
			)}
		</nav>
	)
}

export default Navbar
