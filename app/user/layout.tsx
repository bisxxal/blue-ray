import Navbar from "@/components/navbar";

 
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className=" w-full    min-h-screen">
        <Navbar/>
        <div className=" w-full mt-[70px]">
        {children}
        </div>
      </div>  

  );
}
