// src/App.tsx
import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@styles/globalStyles.ts";
import theme from "@styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import Sidebar from "@components/layout/Sidebar";
import Main from "@components/layout/Main";
import styled from "styled-components";

// Create a QueryClient instance
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: false,
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 5,
        },
    },
});

// Layout Container
const Layout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

// Body Container
const Body = styled.div`
    display: flex;
    flex: 1;
`;

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <GlobalStyle />
                <Layout>
                    <Header />
                    <Body>
                        <Sidebar />
                        <Main />
                    </Body>
                    <Footer />
                </Layout>
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default App;
