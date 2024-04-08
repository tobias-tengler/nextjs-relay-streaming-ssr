import React, { Suspense, use } from "react";

export default function App() {
  return React.createElement("html", null, [
    React.createElement("head", null, [
      React.createElement("meta", { charSet: "utf-8" }),
      React.createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      }),
      React.createElement("title", null, "My app"),
    ]),
    React.createElement("body", null, [
      React.createElement("div", { id: "root" }, "Some content"),
      React.createElement(
        Suspense,
        { fallback: React.createElement("div", null, "Loading...") },
        React.createElement(Child)
      ),
      React.createElement("div", null, "Later content"),
    ]),
  ]);
}

function suspend(ms) {
  if (typeof window !== "undefined") {
    return Promise.resolve();
  }

  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Child() {
  use(suspend(2000));

  return React.createElement("div", null, [
    React.createElement("p", null, "Child"),
    React.createElement(Suspense, { fallback: "Loading grandchild..." }, [
      React.createElement(Grandchild),
    ]),
  ]);
}

function Grandchild() {
  use(suspend(2000));

  return React.createElement(
    "button",
    { onClick: () => alert("hello") },
    "Click me!"
  );
}
