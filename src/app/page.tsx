import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Issues from "@/components/Issues";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className=" px-4 sm:px-6 lg:px-8">
      <Nav />
      <Header />
      <Issues />
      <Footer />
    </main>
  );
}
