"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Heart,
  X,
  RotateCcw,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
  BadgeCheck,
  ExternalLink,
} from "lucide-react"

interface ShitPost {
  id: number
  username: string
  handle: string
  avatar: string
  content: string
  timestamp: string
  verified?: boolean
  likes: number
  retweets: number
  replies: number
}

const shitposts: ShitPost[] = [
  {
    id: 1,
    username: "Elon Musk",
    handle: "@elonmusk",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Just bought Twitter for $44B. Might delete later idk 🤷‍♂️",
    timestamp: "2h",
    verified: true,
    likes: 420690,
    retweets: 69420,
    replies: 12345,
  },
  {
    id: 2,
    username: "Doge",
    handle: "@dogecoin",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "much wow. very crypto. such moon. 🚀🐕",
    timestamp: "4h",
    verified: true,
    likes: 88888,
    retweets: 33333,
    replies: 5555,
  },
  {
    id: 3,
    username: "Gen Z Boss",
    handle: "@genzvibes",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "POV: You're explaining NFTs to your boomer parents and they think you're in a pyramid scheme (they're not wrong) 💀",
    timestamp: "6h",
    likes: 15420,
    retweets: 3210,
    replies: 890,
  },
  {
    id: 4,
    username: "Millennial Crisis",
    handle: "@millennialvibes",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Me: I should save money\nAlso me: *orders $30 worth of DoorDash for a single meal*\nThe duality of man 🤡",
    timestamp: "8h",
    likes: 25600,
    retweets: 8900,
    replies: 1200,
  },
  {
    id: 5,
    username: "Tech Bro",
    handle: "@techoptimist",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Just disrupted the breakfast industry by eating cereal with a fork. VCs are already sliding into my DMs 📈",
    timestamp: "12h",
    likes: 9876,
    retweets: 2345,
    replies: 567,
  },
  {
    id: 6,
    username: "Crypto Degen",
    handle: "@cryptodegen",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Sold my house to buy more Bitcoin. Currently living in a Wendy's parking lot but my portfolio is up 0.3% 📊💎🙌",
    timestamp: "1d",
    likes: 45123,
    retweets: 12890,
    replies: 3456,
  },
]

export function ShitpostSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [trashedPosts, setTrashedPosts] = useState<number[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const currentPost = shitposts[currentIndex]
  const nextPost = shitposts[(currentIndex + 1) % shitposts.length]

  const handleSwipe = (direction: "left" | "right") => {
    if (isAnimating) return

    setIsAnimating(true)
    const finalOffset = direction === "right" ? 1200 : -1200
    setDragOffset(finalOffset)

    if (direction === "right") {
      setLikedPosts((prev) => [...prev, currentPost.id])
    } else {
      setTrashedPosts((prev) => [...prev, currentPost.id])
    }

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % shitposts.length)
      setDragOffset(0)
      setIsAnimating(false)
    }, 400)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isAnimating) return
    setIsDragging(true)
    const startX = e.clientX

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - startX
      setDragOffset(Math.max(-400, Math.min(400, deltaX)))
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)

      if (Math.abs(dragOffset) > 60) {
        handleSwipe(dragOffset > 0 ? "right" : "left")
      } else {
        setDragOffset(0)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return
    setIsDragging(true)
    const startX = e.touches[0].clientX

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      const deltaX = e.touches[0].clientX - startX
      setDragOffset(Math.max(-400, Math.min(400, deltaX)))
    }

    const handleTouchEnd = () => {
      setIsDragging(false)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)

      if (Math.abs(dragOffset) > 60) {
        handleSwipe(dragOffset > 0 ? "right" : "left")
      } else {
        setDragOffset(0)
      }
    }

    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleTouchEnd)
  }

  const rotation = dragOffset * 0.06
  const opacity = isAnimating ? 0 : Math.max(0.85, 1 - Math.abs(dragOffset) * 0.0008)
  const scale = isDragging ? 0.98 : 1

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getLikedPostsData = () => {
    return shitposts.filter((post) => likedPosts.includes(post.id))
  }

  const publishToTwitter = (content: string) => {
    const tweetText = encodeURIComponent(content)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`
    window.open(twitterUrl, "_blank")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      {/* Header */}
      <div className="w-full max-w-sm mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <h1 className="text-2xl font-bold text-black">Tinder for shitposting</h1>
        </div>
        <p className="text-center text-gray-600 text-sm">Swipe right to save • Swipe left to trash</p>
      </div>

      {/* Card Stack */}
      <div className="relative w-full max-w-sm h-[500px] mb-6">
        {/* Background card (next post) */}
        <Card className="absolute inset-0 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl transform scale-95 opacity-50 transition-all duration-300 ease-out">
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={nextPost?.avatar || "/placeholder.svg"} alt={nextPost?.username} />
                <AvatarFallback className="bg-gray-700 text-white">{nextPost?.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-1">
                  <h3 className="font-bold text-white text-sm">{nextPost?.username}</h3>
                  {nextPost?.verified && <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500" />}
                </div>
                <p className="text-xs text-gray-500">{nextPost?.handle}</p>
              </div>
            </div>
            <p className="text-white text-sm opacity-60 line-clamp-4">{nextPost?.content}</p>
          </div>
        </Card>

        {/* Main card (current post) */}
        <Card
          ref={cardRef}
          className="absolute inset-0 bg-black border border-gray-800 rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing overflow-hidden"
          style={{
            transform: `translateX(${dragOffset}px) rotate(${rotation}deg) scale(${scale})`,
            opacity: opacity,
            transition: isDragging
              ? "none"
              : isAnimating
                ? "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                : "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="p-4 h-full flex flex-col">
            {/* User header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={currentPost.avatar || "/placeholder.svg"} alt={currentPost.username} />
                  <AvatarFallback className="bg-gray-700 text-white">{currentPost.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-1">
                    <h3 className="font-bold text-white">{currentPost.username}</h3>
                    {currentPost.verified && <BadgeCheck className="w-5 h-5 text-blue-500 fill-blue-500" />}
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <span>{currentPost.handle}</span>
                    <span>•</span>
                    <span>{currentPost.timestamp}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:bg-gray-800 p-1">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>

            {/* Post content */}
            <div className="flex-1 flex items-center justify-center py-4">
              <p className="text-white text-lg leading-relaxed whitespace-pre-line">{currentPost.content}</p>
            </div>

            {/* Twitter-style interaction bar */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-800 mt-auto">
              <div className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 cursor-pointer">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{formatNumber(currentPost.replies)}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500 hover:text-green-500 cursor-pointer">
                <Repeat2 className="w-5 h-5" />
                <span className="text-sm">{formatNumber(currentPost.retweets)}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500 hover:text-red-500 cursor-pointer">
                <Heart className="w-5 h-5" />
                <span className="text-sm">{formatNumber(currentPost.likes)}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 cursor-pointer">
                <Share className="w-5 h-5" />
              </div>
            </div>
          </div>

          {dragOffset > 40 && (
            <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg border-4 border-green-400 transition-all duration-200 ease-out transform scale-110">
              LIKE
            </div>
          )}
          {dragOffset < -40 && (
            <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg border-4 border-red-400 transition-all duration-200 ease-out transform scale-110">
              NOPE
            </div>
          )}
        </Card>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <Button
          size="lg"
          className="w-16 h-16 rounded-full bg-white border-4 border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-200 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={() => handleSwipe("left")}
          disabled={isAnimating}
        >
          <X className="w-7 h-7" />
        </Button>

        <Button
          size="lg"
          className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 text-blue-500 hover:bg-blue-50 hover:border-blue-200 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={() => {
            if (!isAnimating) {
              setCurrentIndex((prev) => (prev - 1 + shitposts.length) % shitposts.length)
              setDragOffset(0)
            }
          }}
          disabled={isAnimating}
        >
          <RotateCcw className="w-5 h-5" />
        </Button>

        <Button
          size="lg"
          className="w-16 h-16 rounded-full bg-white border-4 border-gray-200 text-green-500 hover:bg-green-50 hover:border-green-200 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={() => handleSwipe("right")}
          disabled={isAnimating}
        >
          <Heart className="w-7 h-7" />
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-6 flex items-center space-x-6 text-sm text-gray-600">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center space-x-2 bg-green-50 hover:bg-green-100 border border-green-200 hover:border-green-300 rounded-full px-4 py-2 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md group">
              <Heart className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-green-700 font-medium">{likedPosts.length} liked</span>
              <div className="w-1 h-1 bg-green-400 rounded-full opacity-60 group-hover:opacity-100 animate-pulse"></div>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-green-500" />
                <span>Liked Shitposts ({likedPosts.length})</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {getLikedPostsData().length === 0 ? (
                <p className="text-center text-gray-500 py-8">No liked posts yet. Start swiping!</p>
              ) : (
                getLikedPostsData().map((post) => (
                  <Card key={post.id} className="p-4 bg-black border border-gray-800">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.username} />
                          <AvatarFallback className="bg-gray-700 text-white">{post.username[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-1">
                            <h3 className="font-bold text-white text-sm">{post.username}</h3>
                            {post.verified && <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500" />}
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500 text-xs">
                            <span>{post.handle}</span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => publishToTwitter(post.content)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 h-auto"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Publish
                      </Button>
                    </div>
                    <p className="text-white text-sm mb-3 whitespace-pre-line">{post.content}</p>
                    <div className="flex items-center justify-between text-gray-500 text-xs">
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{formatNumber(post.replies)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Repeat2 className="w-4 h-4" />
                        <span>{formatNumber(post.retweets)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{formatNumber(post.likes)}</span>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
        <div className="flex items-center space-x-1">
          <X className="w-4 h-4 text-red-500" />
          <span>{trashedPosts.length} passed</span>
        </div>
      </div>
    </div>
  )
}
