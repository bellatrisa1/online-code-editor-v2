export const executeCode = async (code, language) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (code.includes("error")) {
        resolve({
          success: false,
          output: "Syntax Error: unexpected token 'error'",
        });
      } else {
        resolve({
          success: true,
          output: `Executed successfully in ${language}`,
        });
      }
    }, 1000);
  });
};