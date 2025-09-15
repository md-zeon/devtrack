import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Checkout - DevTrack",
  description: "Complete your subscription to DevTrack",
};

export default function CheckoutLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-background">
        {children}
      </main>
      <Footer />
    </>
  );
}