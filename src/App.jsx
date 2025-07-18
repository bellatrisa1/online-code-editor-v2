import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import "./App.scss";

const App = () => {
  const [code, setCode] = useState("// Write your code here");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (window.monaco) {
      window.monaco.editor.setTheme(darkMode ? "vs-dark" : "light");
    }
  }, [darkMode]);

  const runCode = () => {
    if (language === "javascript") {
      try {
        const capturedLogs = [];
        const originalLog = console.log;

        console.log = (...args) => {
          capturedLogs.push(args.join(" "));
          originalLog(...args);
        };

        // eslint-disable-next-line no-new-func
        const runner = new Function(code);
        runner();

        console.log = originalLog;
        setOutput(capturedLogs.join("\n") || "Executed successfully!");
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
    } else {
      setOutput("Language not supported yet.");
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <div className="header">
        <h1>Online Code Editor</h1>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="controls">
        <label>
          Select Language:
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
        </label>
      </div>

      <div className="editor-container">
        <Editor
          height="400px"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            theme: darkMode ? "vs-dark" : "light",
          }}
        />
      </div>

      <button className="run-button" onClick={runCode}>
        Run Code
      </button>

      <div className="output-container">
        <h3>Output:</h3>
        <pre className="output">{output}</pre>
      </div>
    </div>
  );
};

export default App;