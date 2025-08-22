"use client"

import { Card, CardContent } from "@/components/UI/card"
import { Button } from "@/components/UI/button"
import { Home, DollarSign, BarChart3, Users, ShoppingCart, Globe } from "lucide-react"
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts"

const lineData = [
  { name: "Jan", orders: 30, sales: 45 },
  { name: "Feb", orders: 40, sales: 55 },
  { name: "Mar", orders: 35, sales: 60 },
  { name: "Apr", orders: 50, sales: 70 },
  { name: "May", orders: 45, sales: 65 },
  { name: "Jun", orders: 60, sales: 80 },
]

const barData = [
  { name: "Chrome", users: 35000 },
  { name: "Edge", users: 25000 },
  { name: "Firefox", users: 14000 },
  { name: "Safari", users: 18000 },
]

export default function Page() {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white rounded-xl">
      <div className="flex-1 flex flex-col p-6 space-y-6">

        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-indigo-600 to-[#5a7ccb] border-0">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Hi, Welcome Back Rivaldo!</h2>
              <p className="text-sm text-gray-200">You are using 80% of your free plan storage.</p>
            </div>
            <Button className="bg-gray-200 text-blue-700 hover:bg-gray-300">Upgrade Now</Button>
          </CardContent>
        </Card>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Today Orders", value: "5,472", change: "+427 from last week", icon: <ShoppingCart size={24} className="text-blue-400" /> },
            { title: "Today Earnings", value: "$7,589", change: "-453 from last week", icon: <DollarSign size={24} className="text-green-400" /> },
            { title: "Profit Gain", value: "$8,943", change: "+788 from last week", icon: <BarChart3 size={24} className="text-yellow-400" /> },
            { title: "Total Earnings", value: "$57.2M", change: "-693 from last week", icon: <Users size={24} className="text-red-400" /> },
          ].map((item, i) => (
            <Card key={i} className="bg-[#1e293b] border-0">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">{item.title}</p>
                  <h2 className="text-2xl font-bold">{item.value}</h2>
                  <p className={`text-xs ${item.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{item.change}</p>
                </div>
                {item.icon}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#1e293b] border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Project Budget</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Line type="monotone" dataKey="orders" stroke="#38bdf8" strokeWidth={2} />
                    <Line type="monotone" dataKey="sales" stroke="#34d399" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1e293b] border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Browser Usage</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Bar dataKey="users" fill="#38bdf8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
