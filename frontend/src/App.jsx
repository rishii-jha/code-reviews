import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import axios from "axios";
import Markdown from "react-markdown";
import { Switch } from "@mui/material";
import "./App.css";

const App = () => {
  const [code, setCode] = useState(` `);
  const [review, setReview] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    prism.highlightAll();
  }, [code]);

  async function reviewCode() {
    const response = await axios.post("http://localhost:3000/ai/get-review", { code });
    setReview(response.data);
  }


  const handleCopy = () => {
    navigator.clipboard.writeText(review);
    alert("Copied to clipboard!");
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <header>
        <h1>Code Review Tool</h1>
        <div className="mode-toggle">
          <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </div>
      </header>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: 'Fira Code, monospace',
                fontSize: 16,
                minHeight: "300px",
                backgroundColor: darkMode ? "#282c34" : "#f5f5f5",
                color: darkMode ? "#ffffff" : "#333",
                borderRadius: "5px",
              }}
            />
          </div>
          <button className="review-btn" onClick={reviewCode}>Review Code</button>
        </div>
        <div className="right">
        <button className="copy-btn" onClick={handleCopy}>
                Copy
              </button>
          <Markdown className="markdown-preview">{review}</Markdown>
        </div>
      </main>
    </div>
  );
};

export default App;
