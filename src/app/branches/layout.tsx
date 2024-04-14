import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col items-stretch justify-between min-h-screen">
        <Navbar />
        <div className="text grow"> {children}</div>
        <Footer />
      </body>
    </html>
  );
}
