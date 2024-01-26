import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LeftArrowSvg() {

  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    if (navigate(-1) == navigate("/")){
      navigate(0);
    } else {
      navigate(-1);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <svg
      style={{
        width: 54,
        height: 54,
        stroke: isHovered ? '#007BFF' : '#000000',
      }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleBack}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}

    >
      <g id="SVGRepo_bgCarrier" strokeWidth="{0}"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M6 12H18M6 12L11 7M6 12L11 17"
          strokeWidth="{2}"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
}
