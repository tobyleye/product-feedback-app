import styled from "@emotion/styled";

export const FormLayout = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;

export const Form = styled.form`
  margin: 3rem 0 0;
  background: white;
  padding: 0 2.5rem 3rem;
  border-radius: 8px;
  position: relative;
`;

export const FormIcon = styled.div`
  font-size: 1.5rem;
  background: radial-gradient(
    128.88% 128.88% at 103.9% -10.39%,
    #e84d70 0%,
    #a337f6 53.09%,
    #28a7ed 100%
  );
  color: white;
  width: 3.6rem;
  height: 3.6rem;
  display: inline-grid;
  place-items: center;
  transform: translateY(-50%);
  border-radius: 100%;
`;

export const FormTitle = styled.h2`
  color: #3a4374;
  font-size: 1.4rem;
  margin-bottom: 30px;
  font-weight: 800;
`;

// just a style wrapper for form field
const StyledFormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props=> props.mb +'px'};

  label {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 2px;
  }
  .helper-text {
    font-size: 14px;
    margin-bottom: 12px;
  }
  input,
  textarea,
  select {
    display: block;
    width: 100%;
    outline: none;
    border: none;
    height: 45px;
    padding: 0px 16px;
    background: #f7f8fd;
    border-radius: 5px;

    &:focus {
      border-color: blue;
    }
  }

  select option {
    text-transform: capitalize;
  }

  textarea {
    height: 78px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;
export const FormField = ({ label, helperText, type, options, placeholder='', mb=22, ...props }) => {
  type = type.toLowerCase(); // can never trust these users (me!)
  return (
    <StyledFormField mb={mb}>
      {label && <label>{label}</label>}
      {helperText && <p className="helper-text">{helperText}</p>}
      {type === "select" ? (
        <select {...props}>
          <option value="">{placeholder}</option>
          {options.map((opt) => {
            if (typeof opt === "object") {
              let { value, label } = opt;
              return (
                <option key={value} value={label}>
                  {label}
                </option>
              );
            } else {
              return <option key={opt}>{opt}</option>;
            }
          })}
        </select>
      ) : type === "textarea" ? (
        <textarea placeholder={placeholder} {...props} />
      ) : (
        <input type={type} placeholder={placeholder} {...props} />
      )}
    </StyledFormField>
  );
};
