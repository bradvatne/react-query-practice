import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Issues from "@/components/Issues";

export default function Home() {
  return (
    <main className=" px-4 sm:px-6 lg:px-8">
      <Nav />
      <Issues />
      <Footer />
    </main>
  );
}
