import Button from 'react-bootstrap/Button';

function MyButton({ children }) {
  return (
    <Button variant="primary">
      {children}
    </Button>
  );
}


export default MyButton;

