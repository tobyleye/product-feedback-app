import {useState} from "react"

export function useFormControl() {
    const [value, setvalue] = useState("");
  
    const handleChange = (e) => {
      setvalue(e.target.value);
    };
  
    return {
      value,
      onChange: handleChange,
    };
  }