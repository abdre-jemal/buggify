import { useEffect, useState } from "react";
import { HfInference } from "@huggingface/inference";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism"; // You can choose other themes if you like

const client = new HfInference("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");

function Challenge() {
  const [response, setResponse] = useState("");

  // Function to extract code blocks from the AI response
  function extractCode(responseText) {
    const codeBlockPattern = /```jsx([\s\S]*?)```/g;
    let matches = [];
    let match;

    // Extract all code blocks
    while ((match = codeBlockPattern?.exec(responseText)) !== null) {
      matches.push(match[1]?.trim());
    }
    return matches;
  }

  // Function to fetch a new challenge from the API
  const fetchNewChallenge = async () => {
    const chatCompletion = await client.chatCompletion({
      model: "Qwen/QwQ-32B-Preview",
      messages: [
        {
          role: "user",
          content:
            "1.Question: Create a buggy React code snippet related to the `useState` hook. Give me only code; no description or introduction is needed. Please write only code.",
        },
      ],
      max_tokens: 1000,
    });

    const newResponse = chatCompletion?.choices[0]?.message?.content || "";
    setResponse(newResponse);
    localStorage.setItem("currentChallenge", newResponse); // Save to localStorage
  };
  useEffect(() => {
    // Check if a challenge is already saved in localStorage
    const savedChallenge = localStorage.getItem("currentChallenge");
    if (savedChallenge) {
      setResponse(savedChallenge);
    } else {
      fetchNewChallenge();
    }
  }, []);
  const codeSnippets = extractCode(response);

  // console.log(response);

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <h1>Challenge</h1>
        {codeSnippets.length > 0 ? (
          codeSnippets.map((snippet, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <h2>Code Snippet {index + 1}:</h2>
              <SyntaxHighlighter language="javascript" style={darcula}>
                {snippet}
              </SyntaxHighlighter>
            </div>
          ))
        ) : (
          <p>Loading challenge...</p>
        )}

        {/* Button to fetch the next challenge */}
        <button
          onClick={fetchNewChallenge}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#282c34",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Next Challenge
        </button>
      </div>
    </div>
  );
}

export default Challenge;
