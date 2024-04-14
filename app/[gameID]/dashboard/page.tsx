import { Game } from "@/components/Game";
import { InvalidGame } from "@/components/InvalidGame";
import { PARTYKIT_URL } from "@/app/env";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Dashboard({
  params: { gameID },
}: {
  params: { gameID: string };
}) {
  "use server";

  let gameData;

  const fetchGameData = async () => {
    const res = await fetch(`${PARTYKIT_URL}/party/${gameID}`, {
      method: "POST",
      body: JSON.stringify({ type: "STATS-QUERY" }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
      redirect("/invalid");
      return;
    }

    gameData = await res.json();
  };

  await fetchGameData();

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen w-screen">
      <h1 className="mb-4 text-6xl font-semibold text-blue-500">
        Game Dashboard
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(gameData).map(([key, value]) => (
          <div key={key} className="p-4 border rounded shadow-lg">
            <h2 className="font-bold">{key}</h2>
            <p>{value.toString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
