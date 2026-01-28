"use client"
import { Menu} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "motion/react";
import HeaderSearch from "./search";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/clients";


function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, y: -100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 2 }}
      className="sticky top-0 z-50"
    >
      <div className="w-[100%] h-[10%] backdrop-blur-xl bg-gradient-to-r from-purple-600/20 via-violet-500/15 to-fuchsia-600/20 border-b border-white/10  p-3 lg:px-10 flex justify-between items-center">
        <Link href="/storepages/home">
          <Image
            src="/images/logo.png"
            alt="Total Grace Comm Logo"
            width={40}
            height={40}
            className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] rounded-full"
          />
        </Link>

        <div className="flex bg-white rounded-[15px] w-[65vw] lg:w-[40vw] xl:w-[50vw] border-b-2 border-purple-500 justify-between">
          <HeaderSearch />
        </div>
        {/* desktop view */}
        <div className=" hidden lg:flex space-x-[15px] text-purple-900 font-semibold">
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:text-purple-500 hover:cursor-pointer outline-none">
              Categories
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator className="border-b-1 border-b-purple-400" />
                <DropdownMenuItem className="focus:bg-purple-500 focus:text-white text-purple-900 cursor-pointer">
                  <Link href={"/storepages/categories/laptops"}>
                    Laptop
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-purple-500 focus:text-white text-purple-900 cursor-pointer">
                  <Link href={"/storepages/categories/phones"}>
                    Phone
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-purple-500 focus:text-white cursor-pointer text-purple-900">
                  <Link href={"/storepages/categories/laptop-accessories"}>
                    Laptop Accessories
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-purple-500 focus:text-white cursor-pointer text-purple-900">
                  <Link href={"/storepages/categories/phone-accessories"}>
                    Phone Accessories
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <Link
              href={"/storepages/home"}
              className="hover:text-purple-500"
            >
              Products
            </Link>
          </div>
          <div>
            <Link
              href={"/storepages/about"}
              className="hover:text-purple-500"
            >
              About Us
            </Link>
          </div>
          <div>
            <Link
              href="/storepages/contact"
              className="hover:text-purple-500"
            >
              Contact Us
            </Link>
          </div>
          <div>
            {user ? (
              <Link
                href={"/storepages/home"}
                onClick={handleLogout}
                className="hover:bg-purple-500  bg-purple-600 text-white rounded-full p-2 px-3 text-[14px]"
              >
                Logout
              </Link>
            ) : (
              <Link
                href="/storepages/seller/login"
                className="hover:bg-purple-500  bg-purple-600 text-white rounded-full p-2 px-3 text-[14px]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger><Menu className="text-purple-900" /></SheetTrigger>
            <SheetContent className="bg-gray-100">
              <div className="bg-purple-700 text-white p-3 font-bold">
                Welcome To TGC Stores!!!
              </div>
              <div className="text-purple-900 font-semibold">
                <div className="hover:text-purple-500 hover:cursor-pointer p-2  border-b-2 border-b-purple-700">  <DropdownMenu>
            <DropdownMenuTrigger className="hover:text-purple-500 hover:cursor-pointer outline-none">
              Categories
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem className="focus:bg-purple-500 focus:text-white text-purple-900 cursor-pointer">
                  <Link href={"/storepages/categories/laptops"}>
                    Laptop
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-purple-500 focus:text-white text-purple-900 cursor-pointer">
                  <Link href={"/storepages/categories/phones"}>
                    Phone
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-purple-500 focus:text-white cursor-pointer text-purple-900">
                  <Link href={"/storepages/categories/laptop-accessories"}>
                    Laptop Accessories
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-purple-500 focus:text-white cursor-pointer text-purple-900">
                  <Link href={"/storepages/categories/phone-accessories"}>
                    Phone Accessories
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu></div>
                <div className="p-2  border-b-2 border-b-purple-700">
                  <Link
                    href={"/storepages/home"}
                    className="hover:text-purple-500 "
                  >
                    Products
                  </Link>
                </div>
                <div className="p-2  border-b-2 border-b-purple-700">
                  <Link
                    href={"/storepages/about"}
                    className="hover:text-purple-500 "
                  >
                    About Us
                  </Link>
                </div>
                <div className="p-2  border-b-2 border-b-purple-700">
                  <Link
                    href="/storepages/contact"
                    className="hover:text-purple-500"
                  >
                    Contact Us
                  </Link>
                </div>
                <div className="p-2  border-b-2 border-b-purple-700">
                  {user ? (
                    <Link
                    href={"/storepages/home"}
                      onClick={handleLogout}
                      className="hover:text-purple-500 text-[14px]"
                    >
                      Logout
                    </Link>
                  ) : (
                    <Link
                      href="/storepages/seller/login"
                      className="hover:text-purple-500"
                    >
                      Login
                    </Link>
                  )}
                </div>
                <div className="mt-[20vw] text-center text-purple-400">
                  <h3 className="text-bold text-[20px]"> TGC STORES</h3>
                  <p>Where Technologies meets Accountability and reliability!!!</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.div>
  )
}

export default Header
