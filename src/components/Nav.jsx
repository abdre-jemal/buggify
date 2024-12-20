// <!-- component -->

import { useState } from "react";
import { Link } from "react-router";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="z-50 border-gray-700 px-2 sm:px-4 py-2.5 rounded bg-gray-800 shadow">
      <div className="z-50 container flex flex-wrap justify-between items-center mx-auto px-8">
        <a href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-p1 ml-12 ">
            Buggify
          </span>
        </a>
        <div className="flex items-center">
          <button
            id="menu-toggle"
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          >
            <span className="sr-only">Open main menu</span>
            {/* <!-- Hamburger icon --> */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div
          className={`w-full md:block md:w-auto hidden z-50 ${
            isMenuOpen ? "" : "hidden"
          }`}
          id="mobile-menu"
        >
          <div className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <Link
              to="/challenges"
              className="block py-2 pr-4 pl-3 rounded md:bg-transparent md:text-blue-500 md:p-0 text-white cursor-pointer"
            >
              Challengs
            </Link>
            {/* <Link to="#about" className="text-white ">
              About
            </Link> */}
            {/* <Link to="#" className="text-white ">
              Services
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;

{
  //    <script>
  //   const menuToggle = document.getElementById('menu-toggle');
  //   const mobileMenu = document.getElementById('mobile-menu');
  //   menuToggle.addEventListener('click', function () {
  //     mobileMenu.classList.toggle('hidden');
  //   });
  // </script>
}
