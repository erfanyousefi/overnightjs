import { SetupServer } from "./bootstrap";
const PORT = 3700;
const server = new SetupServer(PORT);
server.init();
server.start();