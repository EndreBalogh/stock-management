import React from "react";
import Head from "next/head";
import Menu from "../components/Common/Menu";
import { Flex, Heading, Stack, Text, Box, Image } from "@chakra-ui/react";

const About: React.FC = () => {
  return (
    <>
      <Head>
        <title>About Inventory Management</title>
      </Head>
      <Flex h="100vh" flexDir="row" overflow="hidden" maxW="2000px">
        <Menu />
        <Flex
          w="85%"
          p="3%"
          flexDir="column"
          overflow="auto"
          minH="100vh"
          background="#fff"
        >
          <Heading
            textAlign="center"
            fontWeight="normal"
            mb={12}
            letterSpacing="tight"
          >
            About this Project 🚀
          </Heading>
          <Stack textAlign="center" alignItems="center" mt={30}>
            <Text fontSize={18} color="gray.500" maxW="3xl">
              Product inventory system created with <strong>Next.js</strong> and{" "}
              <strong>Redux</strong>. <br />
              Project created for studies, so feel free to download the code on
              Github and use it in the best way you find 😄
            </Text>
            <Flex w="full" alignItems="center" justifyContent="center">
              <Box boxSize="sm" mt={30}>
                <Image src="/about.svg" alt="Project Image" />
              </Box>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};

export default About;
