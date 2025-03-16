import React from "react"
import { Link } from "react-router-dom"
import { Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
	className?: string
	iconSize?: number
	textSize?: "sm" | "md" | "lg" | "xl" | "2xl"
	showText?: boolean
}

const Logo: React.FC<LogoProps> = ({
	className,
	iconSize = 24,
	textSize = "xl",
	showText = true
}) => {
	const textSizeClasses = {
		sm: "text-sm",
		md: "text-md",
		lg: "text-lg",
		xl: "text-xl",
		"2xl": "text-2xl"
	}

	return (
		<Link
			to="/"
			className={cn(
				"flex items-center gap-2 hover:opacity-90 transition-opacity",
				className
			)}
		>
			<div className="relative">
				<div className="bg-gradient-to-r from-primary-600 to-primary-400 p-2 rounded-lg shadow-md flex items-center justify-center">
					<Share2 size={iconSize} className="text-white" />
				</div>
				<div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary-300 rounded-full border-2 border-white animate-pulse"></div>
			</div>

			{showText && (
				<span
					className={cn(
						"font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent",
						textSizeClasses[textSize]
					)}
				>
					SocialNexus
				</span>
			)}
		</Link>
	)
}

export default Logo
