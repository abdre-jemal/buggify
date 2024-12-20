import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HfInference } from "@huggingface/inference";
import { useQuery } from "@tanstack/react-query";

const client = new HfInference("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");

function generatePrompt(topic, complexity) {
  return `
    Generate a React code snippet with a bug for the topic: ${topic}, and make the complexity level ${complexity}.

    The bug should be subtle and realistic, ensuring it's challenging but solvable for someone learning React.

    Requirements:

    Provide the content in the following structure:
    Description: Briefly describe the issue and the context of the bug.
    Buggy Code: Present only the buggy code snippet, formatted in JavaScript (no explanations or introductions).
    Solution: Provide the corrected version of the code with the bug fixed.
    Vary the scenarios, bugs, and structure with each request. Example scenarios include:
    Forms with validation issues.
    Incorrect hook usage (e.g., 'useEffect', 'useState').
    Errors in conditional rendering or event handling.
    please give me different scenarios and bugs for each request
  `;
  const prompt = `
Please provide a structured response for a ${complexity} React bug on the topic of ${topic} in the following format:

1. **Description:** A detailed explanation of the bug, including why it occurs and how it relates to the topic.
2. **Buggy Code:** Enclose the buggy code snippet within \`**Buggy Code:**\` followed by a code block in JavaScript format (\`\`\`javascript).
3. **Solution:** Enclose the corrected or improved code snippet within \`**Solution:**\` followed by a code block in JavaScript format (\`\`\`javascript).

Example format:

**Description:**  
A brief explanation of the issue or concept being addressed.

**Buggy Code:**  
\`\`\`javascript
// Buggy code here
\`\`\`

**Solution:**  
\`\`\`javascript
// Corrected code here
\`\`\`

Make sure the response is explicitly labeled and adheres strictly to this format. This will allow automated systems to parse the content accurately. Replace \`{topic}\` and \`{complexity level}\` with the desired subject and complexity (e.g., "state management" and "medium").
`;

  return prompt;
}

function extractCode(inputText) {
  const sections = {
    description: "",
    buggyCode: "",
    solutionCode: "",
  };

  // Regex to match description
  const descriptionEndIndex = inputText.indexOf("**Buggy Code:**");
  if (descriptionEndIndex !== -1) {
    sections.description = inputText.slice(0, descriptionEndIndex).trim();
  }

  // Regex to match buggy code
  const buggyCodeRegex = /\*\*Buggy Code:\*\*\n```javascript\n([\s\S]*?)\n```/;
  const buggyMatch = inputText.match(buggyCodeRegex);
  if (buggyMatch) {
    sections.buggyCode = buggyMatch[1].trim();
  }

  // Regex to match solution code
  const solutionCodeRegex = /\*\*Solution:\*\*\n```javascript\n([\s\S]*?)\n```/;
  const solutionMatch = inputText.match(solutionCodeRegex);
  if (solutionMatch) {
    sections.solutionCode = solutionMatch[1].trim();
  }

  return sections;
}
const getCodeGoogle = async () => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyAkH5y52LsR8vhuMGHMKGwXRkL_FnKSLkw"
  );
  const model = await genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = "Write a buggy react code that uses useState and then fix it.";

  const result = await model.generateContent(prompt);

  console.log(result?.response);

  // Store the result in localStorage
  localStorage.setItem(
    "currentChallenge",
    JSON.stringify(result?.response?.text)
  );

  // Return the generated content
  return result?.response?.text;
};

function Challenge() {
  // import { useQuery } from "@tanstack/react-query";

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["challenge"],
    queryFn: async () => {
      return await getCodeGoogle();
    },
    staleTime: Infinity, // Cache the challenge
  });

  console.log(data);

  // useEffect(() => {
  //   const getCodeGoogle = async () => {
  //     const genAI = new GoogleGenerativeAI(
  //       "AIzaSyAkH5y52LsR8vhuMGHMKGwXRkL_FnKSLkw"
  //     );
  //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  //     const prompt = "Write a buggy react code that uses useState and then fix it.";

  //     const result = await model.generateContent(prompt);
  //     console.log(result.response.text());
  //   };

  //   // getCodeGoogle();
  // }, []);

  const response = data || localStorage.getItem("currentChallenge");
  // const { description, buggyCode, solutionCode } = extractCode(response);

  // console.log(description);
  // console.log(response);
  // console.log(extractCode(response));

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div style={{ padding: "20px" }}>
        {isLoading ? (
          <p>Loading challenge...</p>
        ) : (
          <Tabs defaultValue="challenge" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="challenge">Challenge</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
            </TabsList>
            <TabsContent value="challenge">
              <p className="max-w-2xl">
                {/* {description?.substring(0, 300) + "..."} */}
              </p>
              {/* {[buggyCode]?.map((snippet, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <h2>Code With Bug</h2>
                  {snippet?.trim() ? (
                    <SyntaxHighlighter
                      language="javascript"
                      style={vscDarkPlus}
                    >
                      {snippet}
                    </SyntaxHighlighter>
                  ) : (
                    <p>No valid code to display</p>
                  )}
                </div>
              ))} */}
              <button onClick={() => refetch()}>Next Challenge</button>
            </TabsContent>
            <TabsContent value="solution">
              {/* {[solutionCode]?.map((snippet, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <h2>Code Snippet {index + 1}:</h2>
                  {snippet?.trim() ? (
                    <SyntaxHighlighter
                      language="javascript"
                      style={vscDarkPlus}
                    >
                      {snippet}
                    </SyntaxHighlighter>
                  ) : (
                    <p>No valid code to display</p>
                  )}
                </div>
              ))} */}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

export default Challenge;
