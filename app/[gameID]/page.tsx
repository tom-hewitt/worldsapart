import { Game } from "@/components/Game";
import {InvalidGame} from "@/components/InvalidGame";
import {PARTYKIT_URL} from "@/app/env";

const isValidId = (id: string) => {
  const regex = /^[a-zA-Z0-9]{8}$/;
  return regex.test(id);
};

export default async function GamePage({
  params: { gameID },
    searchParams: { isNew },
}: {
  params: { gameID: string},
  searchParams: { isNew: boolean },
}) {
  console.log(gameID, isNew);
  const res = await fetch(`${PARTYKIT_URL}/party/${gameID}`, {
    method: "POST",
    body: JSON.stringify({ type: "ALIVE-QUERY" }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  if (!isValidId(gameID) || (!isNew && res.status !== 200)) {
    return < InvalidGame />;
  }

  return <Game gameID={gameID} />;
}
