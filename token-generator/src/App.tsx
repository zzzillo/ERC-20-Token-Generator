import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreateTokenPage from "./pages/CreateTokenPage"
import ViewTokenPage from "./pages/ViewTokenPage"
import InteractTokenPage from "./pages/InteractTokenPage"
import { WalletProvider } from "./context/WalletContext"

export default function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateTokenPage />} />
          <Route path="/viewtokens" element={<ViewTokenPage />} />
          <Route path="/tokens" element={<InteractTokenPage />} />
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  );
}
