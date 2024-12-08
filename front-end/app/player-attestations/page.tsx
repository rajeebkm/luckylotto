import Header from "../components/Header";
import Footer from "../components/Footer";
import PlayerAttestations from "../components/PlayerAttestations/PlayerAttestations";

export default async function Page() {
  return (
    <div className=" ">
      <Header/>
      <PlayerAttestations />
      <Footer/>
    </div>
  );
}