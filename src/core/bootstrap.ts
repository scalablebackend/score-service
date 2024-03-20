import http from "http";
import createApp from "./app";

export async function bootstrap() {
  const app = await createApp();

  const server: http.Server = http.createServer(app);

  server.listen(4001);
  server.on("error", (e: Error) => console.log("Error starting server", e));
  server.on("listening", () => console.log(`Server started on port 4001`));
}
