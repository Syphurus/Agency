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

      // Log the raw response to check for HTML (error page)
      const textResponse = await res.text();
      console.log(textResponse);

      // If the response is JSON, parse it
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <form
          onSubmit={handleLogin}
          className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow"
        >
          <h2 className="mb-4 text-xl font-bold text-center text-gray-900 dark:text-white">
            Admin Login
          </h2>
          <input
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            className="w-full p-2 bg-indigo-600 text-white rounded"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <h1 className="mb-6 text-3xl font-bold text-center">Admin Dashboard</h1>

      {/* LEADS */}
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Leads</h2>
        {leads.length === 0 ? (
          <p>No leads yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {leads.map((l) =>
              editingLeadId === l.id ? (
                <div
                  key={l.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded shadow space-y-2"
                >
                  <input
                    value={editingLead.name}
                    onChange={(e) =>
                      setEditingLead({ ...editingLead, name: e.target.value })
                    }
                    className="w-full p-1 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    value={editingLead.email}
                    onChange={(e) =>
                      setEditingLead({ ...editingLead, email: e.target.value })
                    }
                    className="w-full p-1 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    value={editingLead.subject || ""}
                    onChange={(e) =>
                      setEditingLead({
                        ...editingLead,
                        subject: e.target.value,
                      })
                    }
                    className="w-full p-1 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <textarea
                    value={editingLead.message}
                    onChange={(e) =>
                      setEditingLead({
                        ...editingLead,
                        message: e.target.value,
                      })
                    }
                    className="w-full p-1 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={updateLead}
                      className="bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingLeadId(null)}
                      className="bg-gray-600 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  key={l.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded shadow"
                >
                  <p>
                    <strong>{l.name}</strong> ({l.email})
                  </p>
                  {l.subject && <p>Subject: {l.subject}</p>}
                  <p>{l.message}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(l.createdAt).toLocaleString()}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => {
                        setEditingLeadId(l.id);
                        setEditingLead(l);
                      }}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem("leads", l.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </section>

      {/* REVIEWS */}
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((r) =>
              editingReviewId === r.id ? (
                <div
                  key={r.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded shadow space-y-2"
                >
                  <input
                    value={editingReview.name}
                    onChange={(e) =>
                      setEditingReview({
                        ...editingReview,
                        name: e.target.value,
                      })
                    }
                    className="w-full p-1 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    value={editingReview.role}
                    onChange={(e) =>
                      setEditingReview({
                        ...editingReview,
                        role: e.target.value,
                      })
                    }
                    className="w-full p-1 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <textarea
                    value={editingReview.text}
                    onChange={(e) =>
                      setEditingReview({
                        ...editingReview,
                        text: e.target.value,
                      })
                    }
                    className="w-full p-1 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={updateReview}
                      className="bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingReviewId(null)}
                      className="bg-gray-600 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  key={r.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded shadow"
                >
                  <p className="font-semibold">{r.name}</p>
                  <p className="italic text-indigo-600 dark:text-indigo-400">
                    {r.role}
                  </p>
                  <p>{r.text}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(r.createdAt).toLocaleString()}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => {
                        setEditingReviewId(r.id);
                        setEditingReview(r);
                      }}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem("reviews", r.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </section>

      {/* ADD REVIEW */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Add Review</h2>
        <form onSubmit={submitReview} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newReview.name}
            onChange={(e) =>
              setNewReview((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={newReview.role}
            onChange={(e) =>
              setNewReview((prev) => ({ ...prev, role: e.target.value }))
            }
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
          <textarea
            name="text"
            placeholder="Review"
            value={newReview.text}
            onChange={(e) =>
              setNewReview((prev) => ({ ...prev, text: e.target.value }))
            }
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            rows={4}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdminPage;
