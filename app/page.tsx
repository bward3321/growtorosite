import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Dashboard from "@/components/dashboard";
import Stations from "@/components/stations";
import Missions from "@/components/missions";
import Commander from "@/components/commander";
import FooterCTA from "@/components/footer-cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Dashboard />
        <Stations />
        <Missions />
        <Commander />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
