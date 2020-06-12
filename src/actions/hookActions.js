import axios from "axios";

const { REACT_APP_BACKEND } = process.env;

export const getSecretWord = async (setSecretWord) => {
  const response = await axios.get(REACT_APP_BACKEND);
  setSecretWord(response.data);
};

// default export for mocking convenience
export default {
  getSecretWord
};
