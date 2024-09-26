"use client";

import socket from "@/util/server";

export default function Home() {
  console.log(socket);
  return <div>realtime Chat</div>;
}
