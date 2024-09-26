"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const navigation = useRouter();
  navigation.replace("/join");

  return <div>realtime Chat</div>;
}
