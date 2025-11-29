import Link from "next/link";


export default function LoginBtn() {
    return (
        <Link href={'/login'}>
            <button className="bg-blue-500 p-2 rounded font-bold hover:bg-blue-600 text-sm cursor-pointer">
                Login
            </button>
        </Link>
    )
}