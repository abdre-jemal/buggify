import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useQuery } from "@tanstack/react-query";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import BugEditor from "./BugEditor";

import { topics } from "../lib/constants";

import { Box, Container, Heading, Text } from "@radix-ui/themes";
import { PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { executeCode } from "../lib/api";
import "./ui/additional.css";

const API_KEY = "AIzaSyAkH5y52LsR8vhuMGHMKGwXRkL_FnKSLkw";

function extractSections(responseText) {
  const regex = /\*\*([\w\s]+):\*\*([\s\S]*?)(?=\*\*[\w\s]+:|$)/g;

  const sections = {};
  let match;

  while ((match = regex.exec(responseText)) !== null) {
    const sectionName = match[1].trim(); // Capture section name
    const sectionContent = match[2].trim(); // Capture section content
    sections[sectionName] = sectionContent;
  }
  return sections;
}

const fetchchallenge = async (topic, level) => {
  // Check if a challenge is already stored in localStorage
  const cachedchallenge = localStorage.getItem("generatedchallenge");
  if (cachedchallenge) {
    return JSON.parse(cachedchallenge);
  }

  // If no challenge in localStorage, fetch a new one from the API
  //   process.env.REACT_APP_API_KEY
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Generate a React code snippet with a bug for the topic: ${topic}, and make the complexity level ${level}.

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
    please give me different scenarios and bugs for each request`;

  // Generate content using the model
  const result = await model.generateContent(prompt);
  const challenge = result.response?.text() || "No challenge generated.";

  // Save the generated challenge to localStorage
  localStorage.setItem("generatedchallenge", JSON.stringify(challenge));

  return challenge; // Return the newly generated challenge
};

function Chellenges() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [selectedLevel, setSelectedLevel] = useState("Beginner");

  const {
    data: challenge,
    isLoading,
    // error,
    // status,
    refetch,
  } = useQuery({
    queryKey: ["challenge"],
    queryFn: (selectedTopic, selectedLevel) =>
      fetchchallenge(selectedTopic, selectedLevel),
    // enabled: false,
    staleTime: Infinity,
  });

  const {
    "Buggy Code": Buggy,
    Solution,
    Description,
  } = extractSections(challenge);

  // console.log(executeCode(Solution));

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the viewport is mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    // Add event listener
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container className="bg-slate-900 w-full py-8 px-6" size={5}>
      <div className="flex flex-wrap gap-2 my-4">
        {/* diff level */}
        <div className="my-1">
          <h1 className="text-slate-300 mb-1 capitalize font-semibold">
            Select a level
          </h1>
          <div className="radio-input  flex-wrap gap-y-4  bg-slate">
            {["Beginner", "Intermediet", "Advanced"].map((level) => {
              return (
                <label
                  key={level}
                  className="label  rounded-md bg-transparent py-1 px-3"
                >
                  <input
                    type="radio"
                    id="level"
                    name="level"
                    value={selectedLevel}
                    defaultChecked={level === selectedLevel}
                    onClick={(e) => setSelectedLevel(e.target.value)}
                  />
                  <p className="text text-slate-500">{level}</p>
                </label>
              );
            })}
          </div>
        </div>
        {/* topics */}
        <div className="my-1">
          <h1 className="text-slate-300 mb-1 capitalize font-semibold ">
            Select a topic
          </h1>
          {/* topics list */}
          <div className="radio-input  flex-wrap  gap-y-4  bg-slate">
            {topics?.map((topic) => {
              return (
                <label
                  key={topic}
                  className="label  rounded-md bg-transparent py-1 px-3"
                >
                  <input
                    type="radio"
                    id="topics"
                    name="topic"
                    value={selectedTopic}
                    onClick={(e) => setSelectedTopic(e.target.value)}
                    defaultChecked={selectedTopic == topic}
                    // defaultValue={topics[0]}
                  />
                  <p className="text text-slate-500">{topic}</p>
                </label>
              );
            })}
          </div>
        </div>
        <button
          className="generate_button my-2"
          onClick={() => {
            localStorage.removeItem("generatedchallenge");
            refetch();
          }}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Next challenge"}
        </button>
      </div>

      <Box className="max-w-2xl mb- py-3">
        {/* <DecorativeBox /> */}
        <Heading mb="2" className="text-white" size="6">
          Here is your challenge
        </Heading>
        <Text className="text-white max-w-3xl">
          {" "}
          <span className="font-semibold text-green-500 underline">
            Hint:
          </span>{" "}
          {Description}
        </Text>
      </Box>
      <ResizablePanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        className="min-h-[90vh] w-full rounded-lg border "
      >
        <ResizablePanel defaultSize={50} minSize={35}>
          {/* buggy code */}
          <div className="flex justify-end">
          <button className="px-3 py-1 m-1 rounded-md border border-blue-500 flex justify-between gap-x-2  capitalize text-blue-500 hover:bg-slate-800">
            {/* <PlayCircle /> */}
            <span className="">Show The solution</span>
          </button></div>
          <div className="mt-">
            {[Buggy]?.map((snippet, index) => (
              <div
                className="rounded-md"
                key={index}
                style={{ marginBottom: "20px" }}
              >
                {snippet?.trim() ? (
                  <SyntaxHighlighter
                    className="rounded-md pl-4 max-w-[40rem] h-[90vh]"
                    language="javascript"
                    style={atomOneDark}
                  >
                    {snippet.replace(/```jsx|```/g, "")}
                  </SyntaxHighlighter>
                ) : (
                  <p>No valid code to display</p>
                )}
              </div>
            ))}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={35} defaultSize={50}>
          {/* editor */}
          <div className="bg-slate-900">
            <div className="flex justify-end m">
              <button className="px-3 py-1 m-1 rounded-md border border-green-500 flex justify-between gap-x-2 text-green-500 hover:bg-slate-800">
                <PlayCircle />
                <span className="">Run Code</span>
              </button>
            </div>
            <div className="w-full">
              <BugEditor />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Container>
  );
}

export default Chellenges;

{
  {
    /* {error && <p style={{ color: "red" }}>Error: {error.message}</p>} */
  }
  /* {[Solution]?.map((snippet, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <h2 className="text-xl my-4 font-semibold">Solution</h2>
              {snippet?.trim() ? (
                <SyntaxHighlighter
                  className="rounded-md pl-4 max-w-xl"
                  language="javascript"
                  style={atomOneDark}
                >
                  {snippet.replace(/```jsx|```/g, "")}
                </SyntaxHighlighter>
              ) : (
                <p>No valid code to display</p>
              )}
            </div>
          ))} */
}