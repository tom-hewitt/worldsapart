import { notFound } from "next/navigation";
import { PARTYKIT_URL } from "@/app/env";
import type { Poll } from "@/app/types";
import { Game } from "@/components/Game";

export default async function GamePage({
  params: { gameID },
}: {
  params: { gameID: string };
}) {
  return <Game gameID={gameID} />;
}
