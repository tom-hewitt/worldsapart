import Link from "next/link";
import {redirect} from "next/navigation";

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
            <h1 className="text-7xl font-conthrax text-black mb-20">- Worlds Apart - </h1>
            <Link href={`/${id}`} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors">
                New Game
            </Link>
            <h5>OR</h5>
            <form action={joinGame}>
                <input type="text" name="gameId" placeholder="Enter Game ID" required className="input-standard" />
                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors">Join Game</button>
            </form>
        </div>
    );
}
