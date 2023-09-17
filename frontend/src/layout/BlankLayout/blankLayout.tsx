import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}
const BlankLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default BlankLayout;
