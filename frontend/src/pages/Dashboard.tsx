import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const lineData = [{ month: 'Jan', value: 5000 }, { month: 'Feb', value: 8200 }, { month: 'Mar', value: 12500 }];
const pieData = [{ name: 'Stocks', value: 68 }, { name: 'ETFs', value: 22 }, { name: 'Cash', value: 10 }];
const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

export default function Dashboard() {
    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <h1 className="text-5xl font-bold mb-10">Welcome back, Alex!</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-bold mb-6">Portfolio Growth</h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(v) => `$${v}`} />
                            <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={5} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-bold mb-6">Asset Allocation</h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={120} dataKey="value" label>
                                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}