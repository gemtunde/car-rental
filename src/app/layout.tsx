import ReduxProvider from "@/components/ReduxProvider";
import LayoutProvider from "../components/LayoutProvider";
import "./globals.css";
import "@/stylesheets/commonClasses.css";
import "@/stylesheets/customClasses.css";
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
  return (
    <ReduxProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </ReduxProvider>
  );
}
