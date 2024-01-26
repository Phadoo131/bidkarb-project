import { Button } from "react-bootstrap";
import "../../custom.css";

export default function CustomButton({ size, children,type }) {
  return (
    <Button type={type} size={size} className="bg-indigo">
      {children}
    </Button>
  );
}
