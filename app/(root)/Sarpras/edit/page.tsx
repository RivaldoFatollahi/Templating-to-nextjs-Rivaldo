"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateSarpras, getSarprasById } from "@/lib/api";

export default function EditSarprasPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [name, setName] = useState("");
  const [condition, setCondition] = useState("");
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !id) return;

    (async () => {
      try {
        const item = await getSarprasById(token, Number(id));
        setName(item.name);
        setCondition(item.condition);
        setQuantity(item.quantity);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token || !id) return alert("Belum login");

    try {
      await updateSarpras(token, Number(id), { name, condition, quantity });
      alert("Data berhasil diperbarui ✅");
      router.push("/Sarpras");
    } catch {
      alert("Gagal update ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base text-base">
      <div className="w-full max-w-md bg-card p-6 rounded-xl shadow border border-base">
        <h1 className="text-xl font-bold mb-4">✏️ Edit Data Sarpras</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Barang</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-base px-3 py-2 rounded bg-base"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Kondisi</label>
            <input
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
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
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
