import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header/Header";
interface LayoutProps {
  children: React.ReactNode;
}
const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
