import DOMPurify from "dompurify";
export const validateInput = (input) => {
  return DOMPurify.sanitize(input);
};

export const validatePassword = (password) => {
  const regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};
