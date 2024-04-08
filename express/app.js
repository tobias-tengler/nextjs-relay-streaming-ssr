import React, { Suspense, use } from "react";

export default function App() {
  console.log("app");

  return React.createElement("html", null, [
    React.createElement("head", { key: "1" }, [
      React.createElement("meta", { key: "1", charSet: "utf-8" }),
      React.createElement("meta", {
        key: "2",
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      }),
      React.createElement("title", { key: "3" }, "My app"),
    ]),
    React.createElement("body", { key: "2" }, [
      React.createElement(
        "button",
        { key: "1", onClick: () => alert("hi") },
        "Click me!"
      ),
      React.createElement(
        Suspense,
        { key: "2", fallback: React.createElement("div", null, "Loading...") },
        React.createElement(Child)
      ),
      React.createElement("div", { key: "3" }, "Later content"),
    ]),
  ]);
}

function Child() {
  use(waitFor(2000));

  console.log("child");

  return React.createElement("div", null, [
    React.createElement("p", { key: "1" }, "Child"),
    React.createElement(
      Suspense,
      { key: "2", fallback: "Loading grandchild..." },
      React.createElement(Grandchild)
    ),
  ]);
}

function Grandchild() {
  use(waitFor(2000));

  console.log("grandchild");

  return React.createElement(
    "button",
    { onClick: () => alert("hello") },
    "Click me!"
  );
}

const resolvedPromise = Promise.resolve();

function waitFor(ms) {
  if (typeof window !== "undefined") {
    return resolvedPromise;
  }

  return new Promise((resolve) => setTimeout(resolve, ms));
}
