import Header from "../components/Header";
import Footer from "../components/Footer";
import RollDice from "../components/RollDice/RollDice";

export default async function Page() {
  return (
    <div className=" ">
      <Header/>
      <RollDice />
      <Footer/>
    </div>
  );
}