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
    <nav className="z-[100] w-full h-[60px] fixed top-0 left-0 bg-[#ffffff16] backdrop-blur-[5px] text-white flex justify-between items-center px-4">
     { !session && <Link href="/">
        <h1 className=" textbase font-bold text-3xl ">Blue Ray </h1>
      </Link>}
     { session && <Link href={"/"+role}>
        <h1 className=" textbase font-bold text-3xl ">Blue Ray </h1>
      </Link>}

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
              className=" rounded-full hover:scale-110 transition-all  "
            />
            {session && (
              <button
                className=" flex hover:scale-110 transition-all   items-center justify-between gap-2 buttonred p-6 py-2"
                onClick={() => signOut()}
              >
                
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
