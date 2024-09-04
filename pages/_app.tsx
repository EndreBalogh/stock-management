import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { GlobalStyles } from "../styles/GlobalStyles";
import store from "../store/configureStore";
import { AppProps } from "next/app";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default MyApp;
