import { NodeVM } from "vm2";

const runInSandbox = (code, tests = []) => {
  const vm = new NodeVM({
    timeout: 1000,
    sandbox: {},
    console: "redirect",
  });

  let consoleOutput = "";

  vm.on("console.log", (msg) => {
    consoleOutput += msg + "\n";
  });

  let testResults = [];

  try {
    const userFn = vm.run(`module.exports = (${code})`);

    testResults = tests.map((test) => {
      try {
        const result = userFn(...test.args);
        return {
          name: test.name,
          passed: isEqual(result,test.expected),
        };
      } catch (err) {
        return {
          name: test.name,
          passed: false,
        };
      }
    });
  } catch (err) {
    consoleOutput += `\nError: ${err.message}`;
  }

  return { consoleOutput, testResults };
};

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export default runInSandbox;
