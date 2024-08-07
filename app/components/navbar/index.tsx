import React from "react";
import Link from "next/link"
import Logo from "./Logo"
import Button from "./Button"


const Navbar = () => {
    return (
      <>
        <div className="w-full h-20 bg-black sticky top-0">
          <div className="container mx-auto px-4 h-full">
            <div className="flex justify-between items-center h-full">
              <Logo />
              <ul className="hidden md:flex gap-x-6 text-white">
                <li>
                  <Link href="/sudoku">
                    <p>Sudoku</p>
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