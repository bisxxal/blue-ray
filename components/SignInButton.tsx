'use client'; 
import { signIn } from "next-auth/react"; 
const SignInButton = ({text}:{text:string}) => {
  return (
    // <div className=" flex justify-center items-center h-screen w-full">
      <button className="hover:scale-110 transition-all px-8 py-3 rounded-full buttonbg " onClick={() => signIn('google')}>{text}</button>
    // </div>
  );
};

export default SignInButton;