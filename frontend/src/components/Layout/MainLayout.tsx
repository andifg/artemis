import "./mainLayout.scss";
import { ReactNode, useEffect } from "react";
// import { useState } from "react";

const MainLayout = ({
  header,
  mainArea,
  footer,
}: {
  header: ReactNode;
  mainArea: ReactNode;
  footer: ReactNode;
}) => {
  // const [height, setHeight] = useState(window.innerHeight)
  // const [mainLayoutHeight, setMainLayoutHeight] = useState(document.getElementById("main-layout-root")?.clientHeight)

  useEffect(() => {
    document
      .getElementById("main-layout-root")
      ?.style.setProperty("height", `${window.innerHeight}px`);
    document
      .getElementById("main-layout-root")
      ?.style.setProperty("max-height", `${window.innerHeight}px`);
    // setMainLayoutHeight(document.getElementById("main-layout-root")?.clientHeight)

    addEventListener("resize", () => {
      console.log("resize");
      // setHeight(window.innerHeight);
      // setMainLayoutHeight(document.getElementById("main-layout-root")?.clientHeight)
      document
        .getElementById("main-layout-root")
        ?.style.setProperty("height", `${window.innerHeight}px`);
      document
        .getElementById("main-layout-root")
        ?.style.setProperty("max-height", `${window.innerHeight}px`);
    });
    return () => {
      removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <div className="main-layout-root" id="main-layout-root">
      <header className="main-layout-header">{header}</header>
      <main className="main-layout-main">
        {/* <div>Inner height: {height} Main height {mainLayoutHeight}</div> */}
        {mainArea}
      </main>
      <footer className="main-layout-footer">{footer}</footer>
    </div>
  );
};

export { MainLayout };
