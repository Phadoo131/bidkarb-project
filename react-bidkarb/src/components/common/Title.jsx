// import { Link } from "react-router-dom";

import { Container } from "react-bootstrap";
import LeftArrowSvg from "./LeftArrowSvg";

{
  /* <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
<g id="SVGRepo_iconCarrier"> <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g>
</svg> */
}
export default function Title({ children, title }) {
  return (
    <Container fluid="lg">
      <div className="d-flex gap-2 my-4">
        {/* wrap this component with link */}
        <LeftArrowSvg />
        {/*  */}
        <h1>{title}</h1>
      </div>
      {children}
    </Container>
  );
}
