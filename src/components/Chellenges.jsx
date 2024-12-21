import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import BugEditor from "./BugEditor";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import copy from "../assets/copy.png";

import { topics } from "../lib/constants";

import { Box, Container, Heading, Spinner, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import "./ui/additional.css";
import { LoaderCircle } from "lucide-react";

// const API_KEY =  ;

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
  const cachedchallenge = localStorage.getItem("generatedchallenge");
  if (cachedchallenge) {
    return JSON.parse(cachedchallenge);
  }

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
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
  const [code, setCode] = useState("");
  const [codied, setCopied] = useState(false);

  // const {
  //   data: challenge,
  //   isPending,
  //   // error,
  //   status,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["challenge"],
  //   queryFn: (selectedTopic, selectedLevel) =>
  //     fetchchallenge(selectedTopic, selectedLevel),
  //   // enabled: false,
  //   staleTime: Infinity,
  // });

  const useGenerateChallenge = () => {
    const queryClient = useQueryClient();
    // const { toast } = useToast();

    return useMutation({
      mutationFn: (topic, level) => fetchchallenge(topic, level),

      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["temporary-Payments"],
        });
        // toast({
        //   variant: "success",
        //   title: "Temporary Payment Added Successfully ",
        // });
      },
    });
  };

  const { mutate, data: challenge, isPending, status } = useGenerateChallenge();

  const {
    "Buggy Code": Buggy,
    Solution,
    Description,
  } = extractSections(challenge);

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
            mutate(selectedTopic, selectedLevel);
          }}
          disabled={isPending}
        >
          {status == "pending" ? (
            <span>Generating...</span>
          ) : (
            <span>Next challenge</span>
          )}
          {/* {status == "success" || <span>Next challenge</span>} */}
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
          {/* solution dialog */}
          <Dialog className="max-h-[80vh] overflow-scroll">
            <DialogTrigger>
              <div className="flex justify-end">
                <button className="px-3 py-1 m-1 rounded-md border border-blue-500 flex justify-between gap-x-2  capitalize text-blue-500 hover:bg-slate-800">
                  {/* <PlayCircle /> */}
                  <span className="">Show The solution</span>
                </button>
              </div>
            </DialogTrigger>
            <DialogContent className=" ">
              <DialogHeader>
                <DialogTitle>Here is the solution</DialogTitle>
                {[Solution]?.map((snippet, index) => (
                  <div key={index} style={{ marginBottom: "20px" }}>
                    {/* <h2 className="text-xl my-4 font-semibold">Solution</h2> */}
                    {snippet?.trim() ? (
                      <SyntaxHighlighter
                        className="rounded-md pl-4 "
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
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <div className="mt-">
            {isPending ||
              [Buggy]?.map((snippet, index) => (
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
            {isPending && (
              <LoaderCircle className="mx-auto animate-spin text-white w-20 h-20" />
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={35} defaultSize={50}>
          {/* editor */}
          <div className="bg-slate-900">
            <div className="flex justify-end m">
              {/* react-copy-to-clipboard */}
              <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
                <button className="px-3 py-1 m-1 rounded-md border border-green-500 flex justify-between items-center gap-x-2 text-green-500 hover:bg-slate-800">
                  {/* <Clipboard />
                  codied
                  */}
                  <span className="capitalize">
                    {codied ? "Copied" : "copy your solution"}
                  </span>
                  <img src={copy} alt="" />
                </button>
              </CopyToClipboard>
            </div>
            <div className="w-full">
              <BugEditor value={code} setValue={setCode} />
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
    /* {error && <p style={{ color: "red" }}>Error:
    
    {error.message}</p>} */
  }
}
