const Input = ({ placeholder, type, id, register, name, isValid, label }) => {
 
  return (
    <div className="input-container">
      <input
        required
        placeholder={placeholder}
        type={type}
        label={label}
        id={id}
       {...register[name]}
       disabled={isValid}
      />
    
    </div>
  );
};
export default Input;
