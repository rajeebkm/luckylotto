import Header from "../components/Header";
import Footer from "../components/Footer";
import {MintOnchainKit} from "../components/MintOnchainKit/MintOnchainKit";

export default async function Page() {
  return (
    <div className=" ">
      <Header/>
      <MintOnchainKit />
      <Footer/>
    </div>
  );
}