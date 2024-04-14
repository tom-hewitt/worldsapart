import Link from "next/link";
import {redirect} from "next/navigation";
import {pressStart2P} from "../fonts";

export default function Lobby() {

    async function joinGame(formData: FormData) {
        "use server";

        const gameID = formData.get("gameId");

        redirect(`${gameID}`);
    }

    return (
        <div className="flex flex-col gap-2 items-center justify-center h-screen w-screen">
            <div className="space-animation"></div>
            <h1 className={`${pressStart2P.className} text-5xl text-black dark:text-white mb-20`}>- Worlds Apart -</h1>
            <h2 className="text-2xl">WAITING FOR PLAYERS TO JOIN</h2>
        </div>
    );
}
