import { ErrorMessage } from "@hookform/error-message";
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
      {/* <p>{errors[name].message}</p> */}

      <div>
        {errors[name] ? (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => <p>{message}</p>}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
export default Input;
