export default function LogOut() {
    return (
        <button
        onClick={() => {
            localStorage.removeItem("token");
            window.location.href = '/login';
        }}
        className="bg-gray-700 hover:bg-gray-800 p-2 text-white rounded">
            Logout
        </button>
    )
}