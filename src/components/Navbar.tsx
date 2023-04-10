import React, { useEffect, useMemo, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import NavLink from "./NavLink";
import { useShoppingCart } from "../context/ShoppingCartContext";
 
export default function MainNavBar() {
  const [openNav, setOpenNav] = useState(false);
  const { openCart, cartQuantity } = useShoppingCart();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const viewCartButtonContent = useMemo(() =>{
    return (
      <div className="flex items-center">
        <span className="pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
          </svg>
        </span>
        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-800 rounded-xl">{cartQuantity}</span>
      </div> 
    )
  }, [cartQuantity])

  
  const viewCartButton = useMemo(() => {
    return (
      cartQuantity > 0 ? 
      <Button variant="gradient" size="sm" className="hidden lg:inline-block" onClick={openCart}>
       {viewCartButtonContent}
      </Button> : <></>
    );
  }, [cartQuantity])
  
  const viewCartButtonMobile = useMemo(() => {
    return (
      cartQuantity > 0 ? 
      <Button variant="gradient" size="sm" fullWidth className="mb-2 flex flex-row justify-items-center" onClick={openCart}>
       {viewCartButtonContent}
      </Button> : <></>
    );
  }, [cartQuantity])

  const navList = useMemo(() => {
    return (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <NavLink page='Store' url='/store' />
        <NavLink page='About' url='/about' />
      </ul>
    );
  }, [])
 
  return (
    <>
      <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-semibold"
          >
            BuyMe.com
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {viewCartButton}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          {viewCartButtonMobile}
        </MobileNav>
      </Navbar>
    </>
  );
}