"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { MenuIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import logo from "@/app/images/logo.png"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    const path = pathname.replace(/\/+$/, "") || "/"
    return href === "/"
      ? path === "/"
      : path === href || path.startsWith(`${href}/`)
  }

  const indicator =
    "after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-[#7c6cff]"

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1e1e1e]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20 lg:px-8">
        <Link
          href="/"
          aria-label="hireloop home"
          onClick={() => setOpen(false)}
        >
          <Image
            src={logo}
            alt="hireloop"
            className="h-8 w-auto md:h-9"
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "relative text-sm font-medium transition-colors",
                isActive(link.href)
                  ? cn("text-white", indicator)
                  : "text-neutral-200 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <span aria-hidden className="h-6 w-px bg-white/20" />
          <Link
            href="/signin"
            aria-current={isActive("/signin") ? "page" : undefined}
            className={cn(
              "relative text-sm font-medium transition-colors",
              isActive("/signin")
                ? cn("text-[#9c8fff]", indicator)
                : "text-[#7c6cff] hover:text-[#9c8fff]"
            )}
          >
            Sign In
          </Link>
          <Button
            render={<Link href="/signup" />}
            className="h-11 rounded-xl bg-[#6d5cff] px-6 text-sm font-semibold text-white shadow-none hover:bg-[#5b4be6]"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="text-neutral-200 hover:bg-white/10 hover:text-white md:hidden"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="gap-6 border-white/10 bg-[#1e1e1e] px-4 pt-16 pb-6 text-white"
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-white/10 text-white"
                      : "text-neutral-200 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 border-t border-white/10 pt-5">
              <Link
                href="/signin"
                onClick={() => setOpen(false)}
                aria-current={isActive("/signin") ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                  isActive("/signin")
                    ? "bg-white/10 text-[#9c8fff]"
                    : "text-[#7c6cff] hover:bg-white/10 hover:text-[#9c8fff]"
                )}
              >
                Sign In
              </Link>
              <Button
                render={<Link href="/signup" onClick={() => setOpen(false)} />}
                className="h-11 rounded-xl bg-[#6d5cff] px-6 text-sm font-semibold text-white shadow-none hover:bg-[#5b4be6]"
              >
                Get Started
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
