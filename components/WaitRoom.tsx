import {pressStart2P} from "@/app/fonts";

export function WaitRoom({ waiting, gameID }: { waiting: number | null , gameID: string}) {
    console.log(waiting);
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-screen w-screen">
            <div className="space-animation"></div>
            <h1 className={`${pressStart2P.className} text-5xl text-black dark:text-white mb-20`}>- Worlds Apart -</h1>
            <h2 className="text-2xl">WAITING FOR {waiting} PLAYERS TO JOIN</h2>
            <h3 className="text-1xl py-3">GAME CODE: {gameID}</h3>
        </div>
    );
}