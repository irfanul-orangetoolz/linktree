import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Home = () => {
	const { token } = useContext(AuthContext)

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
			<div className="max-w-2xl w-full text-center">
				<h1 className="text-4xl font-bold text-gray-800 mb-6">
					Welcome to My Platform
				</h1>
				<p className="text-lg text-gray-600 mb-8">
					Showcase your social media presence, manage your links, and
					track your analytics all in one place.
				</p>
				{token ? (
					<div className="space-y-4">
						<Link
							to="/profile"
							className="inline-block bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
						>
							Go to Profile
						</Link>
						<Link
							to="/links"
							className="inline-block bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
						>
							Manage Links
						</Link>
						<Link
							to="/analytics"
							className="inline-block bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-600"
						>
							View Analytics
						</Link>
					</div>
				) : (
					<div className="space-y-4">
						<Link
							to="/signup"
							className="inline-block bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
						>
							Sign Up
						</Link>
						<Link
							to="/login"
							className="inline-block bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600"
						>
							Login
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}

export default Home
