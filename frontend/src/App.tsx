// src/App.tsx
import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@styles/globalStyles";
import theme from "@styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    ElliWallet,
    EthosWallet,
    FrontierWallet,
    GlassWallet,
    SuietWallet,
    SuiWallet,
    WalletProvider,
} from "@suiet/wallet-kit";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import Sidebar from "@components/layout/Sidebar";
import Home from "@pages/Home";
import PointMarket from "@pages/PointMarket";
import OTCMarket from "@pages/OTCMarket";
import Analytics from "@pages/Analytics";
import Settings from "@pages/Settings";
import styled from "styled-components";

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

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    height: 100vh;
    padding: 30px;
    background-color: ${({ theme }) => theme.colors.bg};
`;

const Body = styled.div`
    display: flex;
    flex: 1;
    gap: 20px;
    width: 100%;
`;

const MainContent = styled.main`
    flex: 1;
    overflow-y: auto;
`;

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <GlobalStyle />
                <WalletProvider
                    defaultWallets={[
                        SuietWallet,
                        SuiWallet,
                        EthosWallet,
                        ElliWallet,
                        FrontierWallet,
                        GlassWallet,
                    ]}
                >
                    <Router>
                        <Layout>
                            <Header />
                            <Body>
                                <Sidebar />
                                <MainContent>
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route
                                            path="/point-market"
                                            element={<PointMarket />}
                                        />
                                        <Route
                                            path="/otc-market"
                                            element={<OTCMarket />}
                                        />
                                        <Route
                                            path="/analytics"
                                            element={<Analytics />}
                                        />
                                        <Route
                                            path="/settings"
                                            element={<Settings />}
                                        />
                                    </Routes>
                                </MainContent>
                            </Body>
                        </Layout>
                        <Footer />
                    </Router>
                </WalletProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default App;
