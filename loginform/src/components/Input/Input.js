const Input = ({ placeholder, type, errors, disabled, id, name, register }) => {
  return (
    <div className="input-container">
      <input
        required
        placeholder={placeholder}
        {...register(name)}
        type={type}
        id={id}
        errors={errors}
        disabled={disabled}
      />
      <div>{errors[name] ? <p>{errors[name].message}</p> : <div></div>}</div>
    </div>
  );
};
export default Input;
