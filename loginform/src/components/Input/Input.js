const Input = ({ placeholder, type, errors, disabled, id, name, register }) => {
  return (
    <div className="input-container">
      <input
        required
        placeholder={placeholder}
        {...register(name)}
        type={type}
        id={id}
        error={errors}
        disabled={disabled}
      />
    </div>
  );
};
export default Input;
