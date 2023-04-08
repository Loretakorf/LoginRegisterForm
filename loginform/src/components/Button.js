const Button = ({ onClick, label, type, disable }) => {
  return (
    <button onClick={onClick} type={type} disabled={disable}>
      {label}
    </button>
  );
};
export default Button;
