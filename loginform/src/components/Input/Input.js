const Input = ({
  id,
  name,
  type,
  placeholder,
  register,
  required,
  disabled,
  errors,
  label,
}) => {
  return (
    <div className="input-container">
      <input
        label={label}
        placeholder={placeholder}
        {...register(name, { required: true })}
        type={type}
        id={id}
        errors={errors}
        disabled={disabled}
      />

      {errors[name] && <span className="red">{errors[name]?.message}</span>}
    </div>
  );
};
export default Input;
