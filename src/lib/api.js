import axios from "axios";

const instance = axios.create({
  baseURL: "https://emkc.org/api/v2",
});

export const executeCode = async (code) => {
  const response = await instance.post("/execute", {
    language: "js",
    version: "15.10.0",
    files: [
      {
        content: code,
      },
    ],
  });

  return response.data;
};
