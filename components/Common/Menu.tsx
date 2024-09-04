import React, { useState } from "react";
import Link from "next/link";
import {
  Flex,
  Heading,
  Avatar,
  Text,
  Icon,
  IconButton,
  Collapse,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiHome, FiCoffee, FiGithub, FiMenu, FiX } from "react-icons/fi";

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Flex
      w={isMobile ? "full" : "15%"}
      flexDir="column"
      alignItems="center"
      backgroundColor="#020202"
      color="#fff"
      paddingX={16}
      position={isMobile ? "fixed" : "relative"}
      zIndex={1000}
    >
      {isMobile && (
        <IconButton
          aria-label="Toggle Menu"
          icon={isOpen ? <FiX /> : <FiMenu />}
          onClick={toggleMenu}
          position="absolute"
          top={4}
          right={4}
          colorScheme="teal"
        />
      )}

      <Collapse in={!isMobile || isOpen} animateOpacity>
        <Flex flexDir="column" justifyContent="space-between" h="100vh">
          <Flex flexDir="column" as="nav">
            <Heading mt={50} mb={50} fontSize="4xl" letterSpacing="tight">
              Stock.
            </Heading>
            <Flex
              flexDir="column"
              align="flex-start"
              justifyContent="center"
              gap={{ base: 4, md: 0 }}
            >
              <Flex className="sidebar-items">
                <Link href="/">
                  <Flex>
                    <Icon as={FiHome} fontSize="2xl" />
                    <Text color="#fff" cursor={"pointer"}>
                      Home
                    </Text>
                  </Flex>
                </Link>
              </Flex>
              <Flex className="sidebar-items">
                <Link href="/about">
                  <Flex>
                    <Icon as={FiCoffee} fontSize="2xl" />
                    <Text color="#fff" cursor={"pointer"}>
                      About
                    </Text>
                  </Flex>
                </Link>
              </Flex>
              <a
                href="https://github.com/EndreBalogh/stock-management"
                target="_blank"
                rel="noreferrer"
              >
                <Flex className="sidebar-items">
                  <Icon as={FiGithub} fontSize="2xl" />
                  <Text color="#fff">Github</Text>
                </Flex>
              </a>
            </Flex>
          </Flex>
          <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
            <Avatar my={3} src="/profile.png" />
            <Text textAlign="center">
              Developed by{" "}
              <Text as="span" fontWeight="bold">
                Endre Balogh
              </Text>
            </Text>
          </Flex>
        </Flex>
      </Collapse>
    </Flex>
  );
};

export default Menu;
