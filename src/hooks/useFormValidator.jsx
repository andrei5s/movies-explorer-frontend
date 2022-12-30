import { useState } from 'react';

const useFormValidation = () => {
  const [values, setValues] = useState();
  const [errors, setErrors] = useState();
  const [isValid , setIsValid] = useState(false);

  const handleChange = e => {
    const target = e.target
    const { name, value } = target
    setValues({...values, [name]: value})
    setErrors({...errors, [name] : target.validationMessage})
    setIsValid(target.closest('form').checkValidity())
  }

  return {
    handleChange,
    values,
    errors,
    isValid,
    setValues,
  }
}

export default useFormValidation;