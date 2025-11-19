
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon, LogIn } from "lucide-react"
import { cn } from "../../lib/utils"
import { useLocation, useNavigate } from "react-router-dom"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

import { User } from "@supabase/supabase-js"

interface NavBarProps {
  items: NavItem[]
  className?: string
  onLoginClick?: () => void
  user?: User | null
  profile?: any
  onProfileClick?: () => void
}

export function NavBar({ items, className, onLoginClick, user, profile, onProfileClick }: NavBarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    // Update active tab based on current path
    if (location.pathname === '/docs') {
      setActiveTab('Docs')
    } else if (location.pathname === '/') {
      if (location.hash === '#features') setActiveTab('Features')
      else if (location.hash === '#pricing') setActiveTab('Pricing')
      else setActiveTab('Home')
    }
  }, [location])

  const handleNavigation = (item: NavItem) => {
    if (item.url.startsWith('/#')) {
      const hash = item.url.substring(1); // #features
      if (location.pathname === '/') {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', hash);
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(item.url);
      if (item.url === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setActiveTab(item.name);
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6 w-full sm:w-auto",
        className,
      )}
    >
      <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 bg-background/5 border border-white/5 backdrop-blur-lg py-1 px-2 sm:px-2 rounded-full shadow-lg mx-auto max-w-[95%] sm:max-w-none overflow-x-auto scrollbar-hide">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 sm:px-6 py-2 rounded-full transition-colors shrink-0",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </button>
          )
        })}

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block"></div>

        {/* Login Button or User Profile */}
        {user ? (
          <button
            onClick={onProfileClick}
            className="relative cursor-pointer p-1 rounded-full transition-all shrink-0 border border-white/10 hover:border-indigo-500/50 group"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-800">
              {profile?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture ? (
                <img
                  src={profile?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs font-bold">
                  {profile?.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </button>
        ) : (
          <button
            onClick={onLoginClick}
            className="relative cursor-pointer text-sm font-semibold px-4 sm:px-6 py-2 rounded-full transition-all shrink-0 text-white bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/30 group"
          >
            <span className="hidden md:inline group-hover:text-indigo-300 transition-colors">Sign In</span>
            <span className="md:hidden">
              <LogIn size={18} strokeWidth={2.5} />
            </span>
          </button>
        )}

      </div>
    </div>
  )
}
