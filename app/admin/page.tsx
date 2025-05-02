"use client";

import React, { useState, useEffect } from "react";

interface Review {
  id: string;
  name: string;
  role: string;
  text: string;
  createdAt: string;
}
interface Lead {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  createdAt: string;
}

const AdminPage = () => {
  const [pwd, setPwd] = useState("");
  const [auth, setAuth] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [newReview, setNewReview] = useState({ name: "", role: "", text: "" });
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editingReview, setEditingReview] = useState<Partial<Review>>({});
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
  const [editingLead, setEditingLead] = useState<Partial<Lead>>({});

  const fetchData = async () => {
    const [revRes, leadRes] = await Promise.all([
      fetch("/api/reviews"),
      fetch("/api/leads"),
    ]);
    const [revData, leadData] = await Promise.all([
      revRes.json(),
      leadRes.json(),
    ]);
    if (Array.isArray(revData)) setReviews(revData);
    if (Array.isArray(leadData)) setLeads(leadData);
  };

  useEffect(() => {
    if (auth) fetchData();
  }, [auth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      const textResponse = await res.text();
      const data = JSON.parse(textResponse);
      if (res.ok && data.success) {
        setAuth(true);
      } else {
        alert(data.message || "Incorrect password");
      }
    } catch (err) {
      alert("Error: " + (err as Error).message);
    }
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      if (!res.ok) throw new Error("Failed to add review");
      setNewReview({ name: "", role: "", text: "" });
      fetchData();
    } catch (err) {
      alert("Error: " + (err as Error).message);
    }
  };

  const deleteItem = async (type: "reviews" | "leads", id: string) => {
    const confirmed = confirm(
      `Are you sure you want to delete this ${type.slice(0, -1)}?`
    );
    if (!confirmed) return;
    await fetch(`/api/${type}/${id}`, { method: "DELETE" });
    fetchData();
  };

  const updateReview = async () => {
    if (!editingReviewId) return;
    await fetch(`/api/reviews/${editingReviewId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingReview),
    });
    setEditingReviewId(null);
    fetchData();
  };

  const updateLead = async () => {
    if (!editingLeadId) return;
    await fetch(`/api/leads/${editingLeadId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingLead),
    });
    setEditingLeadId(null);
    fetchData();
  };

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <form
          onSubmit={handleLogin}
          className="p-8 w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <h2 className="mb-4 text-xl font-semibold text-center text-gray-800 dark:text-white">
            Admin Login
          </h2>
          <input
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="w-full mb-4 p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="w-full p-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold text-center mb-10">Admin Dashboard</h1>

      {/* Leads Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Leads</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {leads.map((l) =>
            editingLeadId === l.id ? (
              <div
                key={l.id}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow space-y-3"
              >
                <input
                  value={editingLead.name}
                  onChange={(e) =>
                    setEditingLead({ ...editingLead, name: e.target.value })
                  }
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                <input
                  value={editingLead.email}
                  onChange={(e) =>
                    setEditingLead({ ...editingLead, email: e.target.value })
                  }
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                <input
                  value={editingLead.subject || ""}
                  onChange={(e) =>
                    setEditingLead({ ...editingLead, subject: e.target.value })
                  }
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                <textarea
                  value={editingLead.message}
                  onChange={(e) =>
                    setEditingLead({ ...editingLead, message: e.target.value })
                  }
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                <div className="flex gap-3">
                  <button
                    onClick={updateLead}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingLeadId(null)}
                    className="px-3 py-1 bg-gray-600 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={l.id}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow space-y-2"
              >
                <p className="font-semibold">
                  {l.name}{" "}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({l.email})
                  </span>
                </p>
                {l.subject && (
                  <p className="text-sm font-medium">Subject: {l.subject}</p>
                )}
                <p>{l.message}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(l.createdAt).toLocaleString()}
                </p>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => {
                      setEditingLeadId(l.id);
                      setEditingLead(l);
                    }}
                    className="text-blue-600 dark:text-blue-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem("leads", l.id)}
                    className="text-red-600 dark:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Reviews Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((r) =>
            editingReviewId === r.id ? (
              <div
                key={r.id}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow space-y-3"
              >
                <input
                  value={editingReview.name}
                  onChange={(e) =>
                    setEditingReview({ ...editingReview, name: e.target.value })
                  }
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                <input
                  value={editingReview.role}
                  onChange={(e) =>
                    setEditingReview({ ...editingReview, role: e.target.value })
                  }
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                <textarea
                  value={editingReview.text}
                  onChange={(e) =>
                    setEditingReview({ ...editingReview, text: e.target.value })
                  }
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                <div className="flex gap-3">
                  <button
                    onClick={updateReview}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingReviewId(null)}
                    className="px-3 py-1 bg-gray-600 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={r.id}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow space-y-2"
              >
                <p className="font-semibold">{r.name}</p>
                <p className="italic text-indigo-600 dark:text-indigo-400">
                  {r.role}
                </p>
                <p>{r.text}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(r.createdAt).toLocaleString()}
                </p>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => {
                      setEditingReviewId(r.id);
                      setEditingReview(r);
                    }}
                    className="text-blue-600 dark:text-blue-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem("reviews", r.id)}
                    className="text-red-600 dark:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
