import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata = {
  title: "All State Intelligence",
  description: "Property intelligence workspace for Costa Rica real estate professionals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
