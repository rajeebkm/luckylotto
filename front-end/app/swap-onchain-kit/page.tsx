import Header from "../components/Header";
import Footer from "../components/Footer";
import {SwapOnchainKit} from "../components/SwapOnchainKit/SwapOnchainKit";

export default async function Page() {
  return (
    <div className=" ">
      <Header/>
      <SwapOnchainKit />
      <Footer/>
    </div>
  );
}