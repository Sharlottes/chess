import { RxStomp } from "@stomp/rx-stomp";
import SockJS from "sockjs-client";

function createStompClient() {
  const client = new RxStomp();
  client.configure({
    brokerURL: "ws://localhost:8080/ws",
    webSocketFactory: () => new SockJS("http://localhost:8080/connection"),
  });
  client.activate();

  // * ping pong
  client
    .watch({ destination: "/sub/messages", subscribeOnlyOnce: true })
    .subscribe((message) => {
      console.log("/sub/messages, Received: " + message.body);
    });
  client.publish({
    destination: "/pub/send",
    body: JSON.stringify({ content: "Hello, World!" }),
  });

  return client;
}

const stomp = createStompClient();
export function send(destination: string, body: Record<string, unknown>) {
  stomp.publish({ destination, body: JSON.stringify(body) });
}
export default stomp;
