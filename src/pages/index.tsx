import type { NextPage } from "next";

import { useAccount } from "wagmi";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const { isConnected } = useAccount();

  return (
    <Layout>
      <p>Hello this is the home page!!</p>
    </Layout>
  );
};

export default Home;
