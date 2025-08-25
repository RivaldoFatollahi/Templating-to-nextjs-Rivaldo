"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSarpras } from "@/lib/api";

export default function AddSarprasPage() {
  const [name, setName] = useState("");
  const [condition, setCondition] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Belum login");

    await createSarpras(token, { name, condition, quantity });
    alert("Data berhasil ditambahkan ✅");
    router.push("/Sarpras");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base text-base">
      <div className="w-full max-w-md bg-card p-6 rounded-xl shadow border border-base">
        <h1 className="text-xl font-bold mb-4">➕ Tambah Data Sarpras</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Barang</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama barang"
              className="w-full border border-base px-3 py-2 rounded bg-base"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Kondisi</label>
            <input
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="Ready / Rusak / dll"
              className="w-full border border-base px-3 py-2 rounded bg-base"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Jumlah</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="0"
              className="w-full border border-base px-3 py-2 rounded bg-base"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push("/Sarpras")}
              className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/80"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
