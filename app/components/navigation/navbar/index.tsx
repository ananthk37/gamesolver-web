import React from "react";
import Link from "next/link"
import Logo from "./Logo"
import Button from "./Button"


const Navbar = ({ toggle }: { toggle: () => void }) => {
  return (
      <>
        <div className="w-full h-20 bg-black sticky top-0">
          <div className="container mx-auto px-4 h-full">
            <div className="flex justify-between items-center h-full">
              <Logo />
              <button
              type="button"
              className="inline-flex items-center md:hidden"
              onClick={toggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
                />
              </svg>


            </button>
              <ul className="hidden md:flex gap-x-6 text-white">
                <li>
                  <Link href="/sudoku">
                    <p>Sudoku</p>
                  </Link>
                </li>
                <li>
                  <Link href="/killer">
                    <p>Killer</p>
                  </Link>
                </li>
                <li>
                  <Link href="/kenken">
                    <p>Kenken</p>
                  </Link>
                </li>
              </ul>
              <Link href="https://www.github.com/ananthk37/gamesolver">
                <Button />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Navbar;