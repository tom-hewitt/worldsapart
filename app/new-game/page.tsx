import {redirect} from "next/navigation";

const randomId = () => Math.random().toString(36).substring(2, 10);

export default async function NewGame() {
    const id = randomId();
    return redirect(`/${id}?isNew=true`);
}
