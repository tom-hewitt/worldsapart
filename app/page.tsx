import Link from "next/link";
import {redirect} from "next/navigation";
import {pressStart2P} from "./fonts";
import {PARTYKIT_URL} from "@/app/env";
import {InvalidGame} from "@/components/InvalidGame";

export default function Home() {
    async function joinGame(formData: FormData) {
        "use server";

        const gameID = formData.get("gameId");

        const res = await fetch(`${PARTYKIT_URL}/party/${gameID}`, {
            method: "POST",
            body: JSON.stringify({ type: "ALIVE-QUERY" }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.status !== 200) {
            return redirect("/invalid");
        }

        redirect(`${gameID}`);
    }

    async function createGame() {
        "use server";

        const randomId = () => Math.random().toString(36).substring(2, 10);

        redirect(`${randomId()}`);
    }

    return (
        <div className="flex flex-col gap-2 items-center justify-center h-screen w-screen">
            <div className="space-animation"></div>
            <h1 className={`${pressStart2P.className} text-5xl text-black dark:text-white mb-20`}>- Worlds Apart -</h1>
            <form action={joinGame} className="items-center justify-center text-center">
                <input type="text" name="gameId" placeholder="Enter Game ID" required pattern={"[a-zA-Z0-9]{8}"}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <br></br>
                <button type="submit"
                        className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span
                        className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Join Game
                </span></button>
            </form>
            <h5 className="py-5">OR</h5>
            <form action={createGame}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <button type="submit"
                    className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                New Game
                </button>
            </form>
        </div>
    );
}
