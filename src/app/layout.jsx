import Navbar from "@/components/Navbar";
import "./globals.css";
import { CssBaseline} from "@mui/material";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <Navbar/>
      {children}
      </body>
    </html>
  );
}
