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
        return () => clearInterval(x);
    }, []);

    useEffect(() => {
        let i = 0;
        const x = setInterval(() => setPd(placeHolderDescription.slice(0, ++i)), 60);
        return () => clearInterval(x);
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


    const notesLength = notes.length;
    console.log(notesLength);

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
                    <h1 className="text-2xl font-bold ">Your Notes</h1>
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
                        className="bg-green-600 cursor-pointer font-bold hover:bg-green-700 text-white p-2 rounded"
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
                                <h2 className="font-bold">{n.title}</h2>
                                <p>{n.content}</p>
                                <button
                                    onClick={() => handleDelete(n._id)}
                                    className="bg-red-500 hover:bg-red-600 cursor-pointer font-bold px-2 text-sm text-white p-1 mt-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    {notes.length === 0 && (
                        <div>
                            <h1 className="max-lg:text-sm text-1xl duration-300 transition-all flex text-center py-20 justify-center">{t}<span className="animate-pulse">|</span></h1>
                        </div>

                    )}


                </div>
            </div>
        </div>
    )
}