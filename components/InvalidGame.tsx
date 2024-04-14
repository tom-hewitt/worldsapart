import {pressStart2P} from "@/app/fonts";
import Link from "next/link";

export function InvalidGame() {
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-screen w-screen">
            <div className="space-animation"></div>
            <h1 className={`${pressStart2P.className} text-5xl text-black dark:text-white mb-20`}>- Worlds Apart -</h1>
            <h2 className="text-2xl">INVALID GAME ID</h2>
            <Link href="/" className="text-1xl py-3"> GO BACK</Link>
        </div>
    );
}