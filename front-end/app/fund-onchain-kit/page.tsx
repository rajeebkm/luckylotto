import Header from "../components/Header";
import Footer from "../components/Footer";
import {FundOnchainKit} from "../components/FundOnchainKit/FundOnchainKit";

export default async function Page() {
  return (
    <div className=" ">
      <Header/>
      <FundOnchainKit />
      <Footer/>
    </div>
  );
}