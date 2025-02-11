 
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className=" w-full  flex min-h-screen">
        {children}
      </div>  

  );
}
