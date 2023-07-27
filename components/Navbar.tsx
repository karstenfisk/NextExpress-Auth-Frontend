"use client";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

// export default function Navbar() {
//   const { data: session, status } = useSession();
//   return (
//     <div className="shadow-sm w-screen h-14 flex items-center justify-between">
//       <Link href="/">
//         <h5 className="text-2xl font-sans font-main pl-5">Placeholder</h5>
//       </Link>

//       <div className="pr-10">
//         {status === "loading" ? null : session?.user ? (
//           <>
//             <button
//               onClick={() => signOut()}
//               className="underline underline-offset-2 hover:text-red-500 px-4"
//             >
//               Sign Out
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={() => signIn()}
//               className="underline underline-offset-2 hover:text-sky-600 px-4"
//             >
//               Login
//             </button>
//             <Link
//               href="/register"
//               className="underline underline-offset-2 hover:text-sky-600  px-4"
//             >
//               Sign Up
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { stat } from "fs";

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <h1 className="text-2xl font-semibold">Boiler</h1>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8"></div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {status === "loading" ? null : session?.user ? (
                  <>
                    <button
                      onClick={() => signOut()}
                      className="underline underline-offset-2 hover:text-red-500 px-4"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => signIn()}
                      className="underline underline-offset-2 hover:text-sky-600 px-4"
                    >
                      Login
                    </button>
                    <Link
                      href="/register"
                      className="underline underline-offset-2 hover:text-sky-600  px-4"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-1000 hover:text-gray-500 focus:outline-none">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {status === "loading" ? null : session?.user ? (
                <>
                  <button
                    onClick={() => signOut()}
                    className="underline underline-offset-2 hover:text-red-500 block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => signIn()}
                    className="underline underline-offset-2 hover:text-sky-600 px-4 block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium"
                  >
                    Login
                  </button>
                  <Link
                    href="/register"
                    className="underline underline-offset-2 hover:text-sky-600  px-4 block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
