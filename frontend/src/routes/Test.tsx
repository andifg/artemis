import { useEffect, useState } from "react";

const FadeOutComponent = ({ remove }) => {
  const [isFading, setIsFading] = useState(false);


  const preRemove = () => {
    console.log("Pre Remove");
    setIsFading(true);
    setTimeout(remove, 1000); // Delay unmounting until animation finishes
  }


  return (
    <>
    <div className={`transition-opacity duration-1000 ${isFading ? "opacity-0" : "opacity-100"}`}>
    <button onClick={preRemove}>Remove Component</button>
      <p>Fades out before unmounting!</p>
    </div>
    </>
  );
};

export default FadeOutComponent;