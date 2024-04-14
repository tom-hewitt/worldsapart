import { Game } from "@/components/Game";

export default async function GamePage({
  params: { gameID },
}: {
  params: { gameID: string };
}) {
  return <Game gameID={gameID} />;
}
