'use client'; 
import { signIn } from "next-auth/react"; 
const SignInButton = ({text}:{text:string}) => {
  return (
      <button className=" px-8 py-3 rounded-full buttonbg " onClick={() => signIn('google')}>{text}</button>
  );
};

export default SignInButton;