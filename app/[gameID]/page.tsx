import { Game } from "@/components/Game";
import {InvalidGame} from "@/components/InvalidGame";
import {PARTYKIT_URL} from "@/app/env";

const isValidId = (id: string) => {
  const regex = /^[a-zA-Z0-9]{8}$/;
  return regex.test(id);
};

export default async function GamePage({
  params: { gameID },
}: {
  params: { gameID: string},
}) {
  
  if (!isValidId(gameID)) {
    return < InvalidGame />;
  }

  return <Game gameID={gameID} />;
}
