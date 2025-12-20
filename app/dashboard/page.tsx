'use client';


type Note = {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
}

type User = {
    _id: string;
    name: string;
    email: string;
}

import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [search, setSearch] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [theme, setTheme] = useState('dark');

     const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;


    useEffect(() => {
        if (!token) return;

        fetch("/api/user/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => setUser(data));
    }, [token]);




    const [isOpen, setIsOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    ///auto type effect:
    const text = `Build notes. 
Your thoughts deserve a home. Start writing`;
    const placeHolderText = "Yesterday At Gym 💪🏻";
    const placeHolderDescription =
        "I pressed the full stack on the shoulder press machine with control. A small but powerful reminder that consistency, focus, and discipline always pay off.";

    const [t, setT] = useState("");
    const [pt, setPt] = useState("");
    const [pd, setPd] = useState("");

    useEffect(() => {
        let i = 0;
        const x = setInterval(() => setT(text.slice(0, ++i)), 100);
        return () => clearInterval(x);
    }, []);

    useEffect(() => {
        let i = 0;
        const x = setInterval(() => setPt(placeHolderText.slice(0, ++i)), 60);
        const y = setTimeout(() => {
            clearInterval(x);
            setPt("Title");
        }, 5000);

        return () => {
            clearInterval(x);
            clearInterval(y)
        }
    }, []);

    useEffect(() => {
        let i = 0;
        const x = setInterval(() => setPd(placeHolderDescription.slice(0, ++i)), 60);
        const y = setTimeout(() => {
            clearInterval(x);
            setPd("Type your thoughts here. Simple, clean space to capture ideas.")
        }, 10000);
        return () => {
            clearInterval(x);
            clearInterval(y)
        }
    }, []);





   

    useEffect(() => {
        if (!token) {
            window.location.href = "/login";
        }
    }, [token]);

    const loadNotes = async () => {
        const res = await fetch("/api/notes/get", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const data = await res.json();
        setNotes(data.notes || []);

    };

    useEffect(() => {
        if (token) {
            loadNotes();
        }
    }, [token]);

    const handleAdd = async () => {
        const res = await fetch("/api/notes/add", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content }),
        });

        setTitle('');
        setContent('');
        loadNotes();
    }

    const handleDelete = async (id: string) => {
        await fetch("/api/notes/delete", {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        loadNotes();
    }

    const handleRead = (note: object) => {
        setSelectedNote(note);
        setIsOpen(true);
        console.log('button read clicked')
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    const notesLength = notes.length;

    return (
        <div className={theme === "dark" ? "dark" : ""
        }>
            <div className="p-10 max-w-xl mx-auto ">
                
                <input
                    className="border p-2 rounded w-full mb-4"
                    placeholder="Search Notes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />

            </div>
            <div className="p-10 mx-auto max-w-xl">
                <div className="mb-4 flex items-baseline justify-between">
                    <h1 className="text-2xl font-bold tracking-tight ">Your Notes</h1>
                    <p>📝 Total notes: {notesLength}</p>
                </div>

                {/* Add Note */}
                <div className="mb-6">
                    <input
                        className="border rounded border-green-600 hover:border-green-300 p-2 w-full mb-2"
                        placeholder={pt}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="border rounded border-green-600 hover:border-green-300 min-h-[100px] resize-y p-2 w-full mb-2"
                        placeholder={pd}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <button
                        onClick={handleAdd}
                        className="bg-green-500 tracking-tight cursor-pointer font-medium hover:bg-green-700 text-white p-2 rounded"
                    >
                        Add Note
                    </button>
                    <div>
                        <button
                          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                          className="px-3 py-1 rounded bg-zinc-200  dark:bg-green-800"
                        >
                          {theme === "dark" ? "Light" : "Dark"}
                        </button>
                    </div>
                </div>

                {/* Notes List */}
                <div>
                    {notes
                        .filter(n =>
                            n.title.toLowerCase().includes(search.toLowerCase()) ||
                            n.content.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((n) => (
                            <div key={n._id} className="border shadow-green-600 shadow-sm p-3 rounded mb-4">
                                <div className=''>
                                    <div className="flex items-center justify-between">
                                        <h2 className="font-bold">🎄{n.title}</h2>
                                        <div className="flex items-center gap-2 px-1 ">
                                            <span className="text-xs italic opacity-50 ">{formatDate(n.createdAt)}</span>
                                            <div className="duration-300 transition-all" onClick={() => handleDelete(n._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5 bg-gray-700 rounded text-white cursor-pointer">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div onClick={() => handleRead(n)} className="cursor-pointer">
                                        <p className="tracking-tight">{n.content}</p>

                                    </div>
                                </div>
                            </div>
                        ))}
                    {notes.length === 0 && (
                        <div>
                            <h1 className="max-lg:text-sm text-1xl duration-300 transition-all flex text-center py-20 justify-center">Build notes.
                                Your thoughts deserve a home. Start writing</h1>
                        </div>

                    )}




                </div>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">

                        <div className="relative w-[90%] max-w-2xl rounded-2xl bg-gray-100 p-10 shadow-xl">

                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 rounded-full p-2 hover:bg-gray-200 transition cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Content */}
                            <div className="mt-8 space-y-3">
                                <div className="-space-y-1 text-green-800">
                                    <p className="text-xs italic text-gray-500">
                                        {formatDate(selectedNote?.createdAt)}
                                    </p>
                                    <div className="flex items-baseline justify-between pr-5 it">
                                        <h1 className="text-4xl font-semibold tracking-tight uppercase">
                                            {selectedNote?.title}
                                        </h1>
                                        <p className="text-xs d">{selectedNote?.content.split(' ').length} words</p>
                                    </div>
                                </div>

                                <p className="text-gray-700 leading-relaxed">
                                    {selectedNote?.content}
                                </p>
                            </div>

                        </div>
                    </div>
                )}


            </div>
            <div className="max-w-2xl mx-auto px-20 flex items-center justify-center m-30 py-20 ">
                <p className="fixed bottom-6 items-baseline text-sm text-green-900 font-black italic">
                    Welcome <span className="text-black font-medium text-2xl">{user?.name}👋🏻</span>
                </p>
            </div>

        </div>
    )
}