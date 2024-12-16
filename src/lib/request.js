const axios = require("axios");

// Hugging Face API Key
const HF_API_KEY = "your_hugging_face_api_key";

// API Endpoint for the CodeLlama model
const API_URL =
  "https://api-inference.huggingface.co/models/meta/code-llama-2-7b";

// Data to send to the model
const inputData = {
  inputs:
    "Generate a buggy React code snippet with useEffect and a missing dependency array.",
};

// Configuration for the API request
const headers = {
  Authorization: `Bearer ${HF_API_KEY}`,
};

// Send the request
axios
  .post(API_URL, inputData, { headers })
  .then((response) => {
    console.log("Generated Output:", response.data);
  })
  .catch((error) => {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  });
