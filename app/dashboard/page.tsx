'use client';

import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

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
            body: JSON.stringify({title, content}),
        });

        setTitle('');
        setContent('');
        loadNotes();
    }

    const handleDelete = async (id) => {
        await fetch("/api/notes/delete", {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({id}),
        });

        loadNotes();
    }


    return (
        <div className="p-10 mx-auto max-w-xl">
      <h1 className="text-3xl font-bold mb-4">Your Notes</h1>

      {/* Add Note */}
      <div className="mb-6">
        <input
          className="border rounded border-green-600 hover:border-green-300 p-2 w-full mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border rounded border-green-600 hover:border-green-300 p-2 w-full mb-2"
          placeholder="Content"
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
        {notes.map((n) => (
          <div key={n._id} className=" border p-3 rounded mb-4">
            <div className="flex justify-between items-center space-x-4 p-4">
                <div>
                    <h2 className="font-bold text-2xl mb-1 lg:text-4xl">{n.title}</h2>
                    <p className="opacity-80 text-green-900 font-medium">{n.content}</p>
                </div>
                <div>
                    <button
                      onClick={() => handleDelete(n._id)}
                      className="bg-red-500 hover:bg-red-600 cursor-pointer px-2 font-bold text-white p-1 mt-2 rounded"
                    >
                      Delete
                    </button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    )
}