'use client';

type Note = {
    _id: string;
    title: string;
    content: string;
}

import { div } from "framer-motion/client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [search, setSearch] = useState("");

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





    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

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

    const notesLength = notes.length;

    return (
        <div>
            <div className="p-10 max-w-xl mx-auto">
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
                </div>

                {/* Notes List */}
                <div>
                    {notes
                        .filter(n =>
                            n.title.toLowerCase().includes(search.toLowerCase()) ||
                            n.content.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((n) => (
                            <div key={n._id} className="border p-3 rounded mb-4">
                                <div onClick={() => handleRead(n)} className="cursor-pointer">
                                    <h2 className="font-bold">🎄{n.title}</h2>
                                    <p className="tracking-tight">{n.content}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(n._id)}
                                    className="bg-red-400 tracking-tight font-medium hover:bg-red-500 cursor-pointer px-2 text-sm text-white p-1 mt-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    {notes.length === 0 && (
                        <div>
                            <h1 className="max-lg:text-sm text-1xl duration-300 transition-all flex text-center py-20 justify-center">Build notes.
                                Your thoughts deserve a home. Start writing</h1>
                        </div>

                    )}




                </div>
                <div>
                    {isOpen && (
                        <div className="fixed inset-x-20 inset-y-30 rounded-lg bg-gray-300 flex backdrop-blur-lg opacity-94 text-black duration-200 transition-all mx-auto">
                            <div className="flex flex-col items-start w-full justify-center opacity-100 m-20 bg-gray-100 p-10 m rounded-lg ">
                                <p className="mb-10 tracking-tighter">fell in love with reading your notes???📝☺️    </p>                           
                                <h1 className="font-bold tracking-tighter uppercase  text-4xl">{selectedNote?.title}</h1>
                                <p className="opacity-95 tracking-tight">{selectedNote?.content}</p>
                                <button className="bg-gray-400 mt-5 rounded p-1 tracking-tighter font-medium cursor-pointer" onClick={handleClose}>close</button>
                            </div>

                        </div>

                    )}

                </div>
            </div>
            
        </div>
    )
}