import Button from "./Button";
import { useNavigate } from "react-router-dom";

const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <Button
      classes="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      <span style={{ display: "inline-block", transform: "translateY(-2px)" }}>
        &larr;
      </span>{" "}
      Voltar
    </Button>
  );
};

export default ButtonBack;
