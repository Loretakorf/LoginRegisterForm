const Input = ({ placeholder, type, errors, disabled, id, name, register, label }) => {
  return (
    <div className="input-container">
      <input
        label={label}
        placeholder={placeholder}
        {...register(name)}
        type={type}
        id={id}
        disabled={disabled}
      />

      {errors[name] ? <p className="red">{errors[name]?.message}</p> : <></>}
    </div>
  );
};
export default Input;
