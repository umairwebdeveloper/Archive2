"use client"

import { UserButton, useAuth } from "@clerk/clerk-react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { SearchInput } from "./search-input"

import { isTeacher } from "@/lib/teacher"

export const NavbarRoutes = () => {
    const {userId} = useAuth();
    const pathname = usePathname();


    const isTeacherPage = pathname?.startsWith("/vakken/teacher")
    const isCoursePage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/vakken/search";

    return(
        <>
        {isSearchPage && (
            <div className="hidden md:block">
                <SearchInput />
            </div>
        )}
        <div className="flex gap-x-2 ml-auto">
            {isTeacher(userId) && !isTeacherPage && (
                <Link href="/vakken/teacher/courses">
                    <Button size="sm" variant="ghost">
                        Teacher Mode
                    </Button>

                </Link>)}
            {isTeacherPage || isCoursePage ? (
            <Link href="/vakken/search">
              <Button  size="sm" variant="ghost">
                <LogOut className="h-4 w-4 mr-2"/>
                Exit
              </Button>  
            </Link>
            ) : null}
            <UserButton 
            afterSignOutUrl="/"
            />
        </div>
        </>
    )
}
