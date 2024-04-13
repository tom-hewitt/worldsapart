import Link from "next/link";
import {redirect} from "next/navigation";
import {pressStart2P} from "./fonts";

const randomId = () => Math.random().toString(36).substring(2, 10);

export default function Home() {
    const id = randomId();

    async function joinGame(formData: FormData) {
        "use server";

        const gameID = formData.get("gameId");

        redirect(`${gameID}`);
    }

    return (
        <div className="flex flex-col gap-2 items-center justify-center h-screen w-screen">
            <h1 className={`${pressStart2P.className} text-5xl text-black dark:text-white mb-20`}>- Worlds Apart -</h1>
            <Link href={`/${id}`} className="px-10 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors">
                New Game
            </Link>
            <h5 className="py-5">OR</h5>
            <form action={joinGame} className="items-center justify-center text-center">
                <input type="text" name="gameId" placeholder="Enter Game ID" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <br></br>
                <button type="submit" className="px-10 py-2 text-white bg-red-500 rounded hover:bg-blue-600 transition-colors">Join Game</button>
            </form>
        </div>
    );
}
