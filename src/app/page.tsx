"use client";

import { useState } from "react";
import { useTeams } from "@/hooks/useTeams";
import { TeamCard } from "@/components/TeamCard";

export default function Home() {
  const { teams, loading, setTeams } = useTeams();
  const [form, setForm] = useState({ name: "", code: "", country: "" });

  async function addTeam() {
    const res = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newTeam = await res.json();
    setTeams((prev) => [newTeam, ...prev]);
    setForm({ name: "", code: "", country: "" });
  }

  return (
    <main className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">⚽ Times</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Código"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="País"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          className="border p-2 rounded"
        />
        <button
          onClick={addTeam}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : teams.length === 0 ? (
        <p>Nenhum time cadastrado.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              name={team.name}
                logo={team.logo}
              code={team.code}
              country={team.country}
            />
          ))}
        </div>
      )}
    </main>
  );
}
