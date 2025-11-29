import Link from "next/link";


export default function SignupBtn() {
    return (
        <Link href={'/signup'}>
            <button className="bg-green-500 p-2 rounded font-bold hover:bg-green-600 text-sm cursor-pointer">
                Sign Up
            </button>
        </Link>
    )
}