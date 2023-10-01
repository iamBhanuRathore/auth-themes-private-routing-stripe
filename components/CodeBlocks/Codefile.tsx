"use client";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
const Codefile = ({ user }: any) => {
  return (
    <SyntaxHighlighter language="jsx" style={docco}>
      {JSON.stringify(user)}
    </SyntaxHighlighter>
  );
};

export default Codefile;
