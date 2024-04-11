import express from "express";
import App from "./app.js";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// text/plain is being buffered by default and assumed if
// no content-type header is set.
// If the first chunk contains valid html though, the
// browser infers the content-type and allows chunked streaming.
app.get("/stream", async function (req, res, next) {
  res.write(
    "<!DOCTYPE html><html><head><title>Streaming!</title></head><body>"
  );
  res.write("<div>First part</div>");

  await sleep(2000);

  res.write("<div>Second part</div>");

  await sleep(2000);

  res.end("</body></html>");
});

app.use("/react-stream", (request, response) => {
  const { pipe } = renderToPipeableStream(React.createElement(App), {
    // This is the hydration script.
    bootstrapModules: ["/dist/main.js"],
    onShellReady() {
      // This is invoked before the first flush to the client.
      response.setHeader("content-type", "text/html");
      pipe(response);
    },
  });
});

// This serves the bootstrap module, necessar for hydration
app.get("/dist/main.js", (req, res) => {
  res.sendFile("dist/main.js", { root: "./" });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

function sleep(num) {
  return new Promise((resolve) => setTimeout(resolve, num));
}
