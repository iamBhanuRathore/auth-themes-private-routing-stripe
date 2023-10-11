// import React from "react";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

// const Codefile = ({ user }: any) => {
//   return (
//     <SyntaxHighlighter language="jsx" style={docco}>
//       {JSON.stringify(user)}
//     </SyntaxHighlighter>
//   );
// };

// export default Codefile;
"use client";
import { CodeBlock, dracula } from "react-code-blocks";
const Codefile = ({ user }: any) => {
  return (
    <CodeBlock
      text={JSON.stringify(user)}
      language="javascript"
      theme={dracula}
      showLineNumbers={false}
      wrapLongLines
    />
  );
};

export default Codefile;
