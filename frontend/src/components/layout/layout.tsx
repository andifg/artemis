import React from "react";
import "./layout.scss";

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="root-layout">{children}</div>;
}

export { Layout };
