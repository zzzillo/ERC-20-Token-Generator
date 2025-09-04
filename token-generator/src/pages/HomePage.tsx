import Navbar from "../components/Navbar";
import DarkVeil from "../components/DarkVeil";
import Chaincard from "../components/Chaincard";
import EthLogo from "../assets/ethereum.svg";
import { useNavigate } from "react-router-dom";
export default function HomePage() {

    const navigate = useNavigate();

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm">
                <Navbar/>
            </div>
            <div className="relative w-full h-screen">
                {/* Background effect */}
                <DarkVeil hueShift={25} />
                {/* Text overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-5xl font-bold text-white drop-shadow-lg">
                    Generate ERC-20 Token
                </h2>
                <p className="mt-4 text-xl text-gray-200 max-w-2xl">
                    Easily create your own ERC-20 token with full configuration options.
                </p>
                <button onClick={() => navigate("/create")} className="mt-8 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white text-lg font-semibold rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
                    Create a Token
                </button>
            </div>

            <div className="w-full h-1/2 bg-black flex flex-col md:flex-row pt-10 p-8 items-top gap-8">
            {/* Left side - About ERC-20 */}
                <div className="flex-1 text-gray-200">
                    <h2 className="text-3xl font-bold mb-4">What is ERC-20?</h2>
                    <p className="text-lg leading-relaxed mb-4">
                    ERC-20 is the <strong>Ethereum token standard</strong> that defines how
                    fungible tokens behave on the blockchain. It ensures that all ERC-20
                    tokens are <strong>interoperable</strong> and can be easily transferred,
                    tracked, and integrated into wallets, exchanges, and dApps.
                    </p>
                </div>

                {/* Right side - Token Config/Features */}
                <div className="flex-1 text-gray-200">
                    <h2 className="text-3xl font-bold mb-4">Configure Your Token</h2>
                    <p className="text-lg leading-relaxed mb-4">
                    Set your token parameters: <strong>Name, Symbol, Decimals, and Total Supply</strong>.
                    </p>
                    <p className="text-lg leading-relaxed">
                    Add advanced features: <strong>Mintable, Burnable, Pausable, Ownable</strong>.
                    Choose what your token can do and make it fit your use case.
                    </p>
                </div>
            </div>

                <div className="w-full pb-40 bg-black flex flex-col items-center justify-center">
                    <h2 className="text-3xl mb-6 text-gray-200 font-bold leading-relaxed">
                        Networks Supported
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mt-5">
                        <Chaincard image={EthLogo} name="Ethereum Sepolia (Testnet)" />
                    </div>
                </div>
            </div>
        </>
    );
};