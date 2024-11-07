import { useState, useEffect, useRef } from "react";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Settings } from "lucide-react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State voor de dropdown
    const [showModal, setShowModal] = useState(false);
    const { isAuthenticated, isLoading } = useConvexAuth();
    const menuRef = useRef<HTMLDivElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null); // Referentie voor de dropdown
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Examentraining", href: "/examentraining", hasDropdown: true },
        { name: "How it works", href: "#" },
        { name: "Validation", href: "#" },
        { name: "Contact", href: "examentraining/contact" },
    ];

    const examSubjects = [
        { name: "Wiskunde", href: "examentraining/vakken/examentraining-aardrijkskunde" },
        { name: "Nederlands", href: "/examentraining/nederlands" },
        { name: "Engels", href: "/examentraining/engels" },
        { name: "Biologie", href: "/examentraining/biologie" },
        // Voeg meer vakken toe indien nodig
    ];

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            const level = localStorage.getItem("userLevel");
            if (!level) {
                setShowModal(true);
            }
        }
    }, [isAuthenticated, isLoading]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setDropdownOpen(false); // Sluit dropdown bij klikken buiten
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleBackdropClick = (event: any) => {
        if (event.target === event.currentTarget) {
            setShowModal(false);
        }
    };

    const handleLevelSelect = async (level: any) => {
        try {
            localStorage.setItem("userLevel", level);
            const response = await axios.get(
                `/api/level/check-level?title=${encodeURIComponent(level)}`
            );
            const levelData = response.data;
            if (
                levelData &&
                levelData.subjects &&
                levelData.subjects.length > 0
            ) {
                toast.success(`Het niveau "${level}" heeft bijbehorende vakken.`);
            } else {
                toast.error(
                    `Het niveau "${level}" heeft geen bijbehorende vakken.`
                );
            }
            setShowModal(false);
        } catch (error) {
            console.error(error);
            toast.error(
                "Er is een fout opgetreden bij het controleren van vakken voor dit niveau."
            );
            setShowModal(false);
        }
    };

    return (
        <>
            <nav className="bg-white w-full z-20">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
                    <a className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img
                            src="/assets/svg/new_logo.svg"
                            className="h-8"
                            alt="Flowbite Logo"
                        />
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {isLoading && <Spinner />}
                        {!isAuthenticated && !isLoading && (
                            <SignInButton mode="modal">
                                <button
                                    type="button"
                                    className="text-white bg-gr hover:bg-green-500 font-medium rounded-full px-5 py-2 text-center"
                                >
                                    Sign in
                                </button>
                            </SignInButton>
                        )}
                        {isAuthenticated && !isLoading && (
                            <>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="mr-2 text-gray-600 hover:text-gr"
                                >
                                    <Settings className="w-6 h-6" />
                                </button>
                                <div className="lg:block hidden">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href="/vakken/subject">
                                            Ik ben leerling
                                        </Link>
                                    </Button>
                                </div>
                                <UserButton afterSignOutUrl="/" />
                            </>
                        )}
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-sticky"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        ref={menuRef}
                        className={`items-center justify-between ${
                            isOpen ? "block" : "hidden"
                        } w-full md:flex md:w-auto md:order-1`}
                        id="navbar-sticky"
                    >
                        <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:py-3 md:px-6 md:rounded-full">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    {link.hasDropdown ? (
                                        <div className="relative group">
                                            <button
                                                onMouseEnter={() => setDropdownOpen(true)}
                                                onMouseLeave={() => setDropdownOpen(false)}
                                                className={`block py-2 px-3 ${
                                                    pathname === link.href
                                                        ? "text-gr rounded"
                                                        : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gr"
                                                } md:p-0 cursor-pointer flex items-center`}
                                            >
                                                {link.name}
                                                <span className="ml-1">
                                                    {dropdownOpen ? (
                                                        <svg className="w-4 h-4 transform rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                        </svg>
                                                    )}
                                                </span>
                                            </button>
                                            {dropdownOpen && (
                                                <div
                                                    ref={dropdownRef}
                                                    className="absolute left-0 w-48 bg-white shadow-lg rounded-md z-10"
                                                    onMouseEnter={() => setDropdownOpen(true)}
                                                    onMouseLeave={() => setDropdownOpen(false)}
                                                >
                                                    <h3 className="font-bold py-2 px-4">Vakken</h3>
                                                    {examSubjects.map((subject, index) => (
                                                        <Link key={index} href={subject.href}>
                                                            <span className="block py-2 px-4 text-gray-800 hover:bg-gray-100">
                                                                {subject.name}
                                                            </span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link href={link.href}>
                                            <span
                                                className={`block py-2 px-3 ${
                                                    pathname === link.href
                                                        ? "text-gr rounded"
                                                        : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gr"
                                                } md:p-0`}
                                            >
                                                {link.name}
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
            {showModal && (
                <div
                    onClick={handleBackdropClick}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                >
                    <div className="bg-white p-5 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Selecteer je niveau</h2>
                        <button
                            onClick={() => handleLevelSelect("havo")}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md mb-2 w-full"
                        >
                            Havo
                        </button>
                        <button
                            onClick={() => handleLevelSelect("vwo")}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
                        >
                            Vwo
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
