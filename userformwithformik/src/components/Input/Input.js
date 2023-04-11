const Input = ({ placeholder, type, id, name, value, onBlur, onChange,label }) => {
  return (
    <div className="input-container">
      <input
        required
        placeholder={placeholder}
        name={name}
        value={value}
        type={type}
        id={id}
        label={label}
        onBlur={onBlur}
        onChange={onChange}
      />
    </div>
  );
};
export default Input;