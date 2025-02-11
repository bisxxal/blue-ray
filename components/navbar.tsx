"use client";
import { PropsAuth } from "@/constants";
import { signOut } from "next-auth/react";
import SignInButton from "./SignInButton";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = ({ session }: { session?: PropsAuth }) => {
  const role = session?.role;
  const router = useRouter();
  useEffect(() => {
    if (role) {
      // router.push(`/${role}`);
    }
  }, [session]);
  return (
    <nav className=" w-full h-[60px] bg-zinc-900 text-white flex justify-between items-center px-4">
      <Link href="/">
        <h1 className=" textbase font-bold text-3xl ">Blue Ray </h1>
      </Link>

      <div className="flex items-center gap-9">
        {!session && session == null ? (
          <SignInButton text={"Sign in"} />
        ) : (
          <>
            <span>
              Welcome, {role === "admin" ? "Admin " : " Employee"}{" "}
              <span className=" font-semibold textbase">{session?.name} </span>
            </span>
            <Image
              src={session?.image}
              alt="profile"
              width={30}
              height={30}
              className=" rounded-full"
            />
            {session && (
              <button
                className=" flex items-center justify-between gap-2 buttonred p-6 py-2"
                onClick={() => signOut()}
              >
                {" "}
                Sign Out <FaSignOutAlt />
              </button>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
