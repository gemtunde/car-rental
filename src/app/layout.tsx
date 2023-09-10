import LayoutProvider from "../components/LayoutProvider";
import "./globals.css";
import "../stylesheets/commonClassess.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gemtunde-Car Rental App",
  description: "Exciting car rental services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutProvider>{children}</LayoutProvider>;
}
