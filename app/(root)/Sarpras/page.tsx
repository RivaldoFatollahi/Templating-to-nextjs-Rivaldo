"use client";
import { useEffect, useState } from "react";
import { getSarpras, deleteSarpras } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SarprasPage() {
  const [sarpras, setSarpras] = useState<any[]>([]);
  const [token, setToken] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const limit = 5;

  useEffect(() => {
    const t = localStorage.getItem("token") || "";
    setToken(t);
    if (t) loadData(t, currentPage);
  }, [currentPage]);

  const loadData = async (t: string, page: number) => {
    const res = await getSarpras(t, page, limit);
    console.log("API RESPONSE ===>", res);
    setSarpras(res.data);
    setTotalPages(res.totalPages  || 1);
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    await deleteSarpras(token, id);
    await loadData(token, currentPage);
  };
  

  return (
    <div className="p-6 bg-base text-base min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">📦 Data Sarpras</h1>
        <button
          onClick={() => router.push("/Sarpras/add")}
          className="bg-primary text-white px-3 py-2 rounded-lg shadow"
        >
          + Tambah Data
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-base rounded-lg shadow">
          <thead className="bg-card">
            <tr>
              <th className="p-2 border border-base">ID</th>
              <th className="p-2 border border-base">Name</th>
              <th className="p-2 border border-base">Condition</th>
              <th className="p-2 border border-base">Quantity</th>
              <th className="p-2 border border-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sarpras.map((item, index) => (
              <tr
                key={item.id || index}
                className="text-center hover:bg-primary/5 transition"
              >
                <td className="p-2 border border-base">{item.ID}</td>
                <td className="p-2 border border-base">{item.name}</td>
                <td className="p-2 border border-base">{item.condition}</td>
                <td className="p-2 border border-base">{item.quantity}</td>
                <td className="p-2 border border-base flex gap-2 justify-center">
                  <button
                    onClick={() => router.push(`/Sarpras/edit?id=${item.ID}`)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.ID)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 bg-card border border-base rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1 bg-card border border-base rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
