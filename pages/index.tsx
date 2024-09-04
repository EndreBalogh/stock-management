import React from "react";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import Menu from "../components/Common/Menu";
import ContentArea from "../components/Layout/ContentArea";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Inventory Management</title>
      </Head>
      <Flex flexDir="row" overflow="hidden" maxW="2000px">
        <Menu />
        <ContentArea />
      </Flex>
    </>
  );
};

export default Home;
