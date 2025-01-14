import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { CssBaseline} from "@mui/material";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <Navbar/>
      {children}
        <Footer />
      </body>
    </html>
  );
}