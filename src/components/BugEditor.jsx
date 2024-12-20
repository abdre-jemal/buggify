import Editor from "@monaco-editor/react";
import { useState } from "react";

const defaultValue = `\n function Solution() {
return (
    <div>
      {/* write your solution here */}
    </div>
  )
}
export default Solution
`;

function BugEditor() {
  const [value, setValue] = useState("");
  console.log(value);

  return (
    <div>
      <Editor
        height="90vh"
        width="39rem"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={defaultValue}
        value={value}
        onChange={(input) => setValue(input)}
      />
    </div>
  );
}

export default BugEditor;
