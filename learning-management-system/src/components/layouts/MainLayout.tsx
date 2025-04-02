"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BookOpenIcon,
  AcademicCapIcon,
  ChartPieIcon,
  UserIcon,
  CalendarIcon,
  ClipboardDocumentCheckIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: <ChartPieIcon className="w-5 h-5" /> },
  { label: "Courses", href: "/courses", icon: <BookOpenIcon className="w-5 h-5" /> },
  { label: "Assignments", href: "/assignments", icon: <ClipboardDocumentCheckIcon className="w-5 h-5" /> },
  { label: "Grades", href: "/grades", icon: <AcademicCapIcon className="w-5 h-5" /> },
  { label: "Calendar", href: "/calendar", icon: <CalendarIcon className="w-5 h-5" /> },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white dark:bg-background sticky top-0 z-30">
        <div className="flex h-16 items-center px-4 sm:px-6">
          {/* Mobile Sidebar Toggle */}
          <div className="md:hidden">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle menu">
                  <Bars3Icon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 sm:max-w-none p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Sidebar Header */}
                  <div className="border-b px-6 py-4 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-lg" onClick={() => setSidebarOpen(false)}>
                      <AcademicCapIcon className="h-6 w-6 text-primary" />
                      <span>LMS</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
                      <XMarkIcon className="h-5 w-5" />
                    </Button>
                  </div>
                  {/* Mobile Navigation */}
                  <nav className="p-4 space-y-1 flex-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-link ${pathname === item.href ? "active" : ""}`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Brand Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-lg ml-2 md:ml-0">
            <AcademicCapIcon className="h-6 w-6 text-primary" />
            <span className="hidden md:inline">Learning Management System</span>
            <span className="md:hidden">LMS</span>
          </Link>

          {/* Right Side Actions */}
          <div className="ml-auto flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </Button>

            {/* User Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="User menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>US</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <aside className="border-r w-64 hidden md:block">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${pathname === item.href ? "active" : ""}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="container p-6 max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
