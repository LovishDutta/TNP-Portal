// NOTE: Add this to your index.html <head> (or import in your global CSS) for the new font:
// <link rel="preconnect" href="https://fonts.googleapis.com">
// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, Sector, LabelList
} from 'recharts';
import { Search, Users, User, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../components/Navbar';

// 2027 Batch Data (Updated - UG + PG)
const programData2027 = [
  // ---------- UG ----------
  { name: "B.Tech CSE", shortName: "CSE", category: "UG", total: 210, male: 168, female: 42, femalePercentage: 20.0, malePercentage: 80.0 },
  { name: "B.Tech IT", shortName: "IT", category: "UG", total: 142, male: 114, female: 28, femalePercentage: 19.7, malePercentage: 80.3 },
  { name: "B.Tech ECE", shortName: "ECE", category: "UG", total: 142, male: 116, female: 26, femalePercentage: 18.3, malePercentage: 81.7 },
  { name: "B.Tech EE", shortName: "EE", category: "UG", total: 136, male: 110, female: 26, femalePercentage: 19.1, malePercentage: 80.9 },
  { name: "B.Tech ME", shortName: "ME", category: "UG", total: 127, male: 102, female: 25, femalePercentage: 19.7, malePercentage: 80.3 },
  { name: "B.Tech Civil", shortName: "Civil", category: "UG", total: 135, male: 106, female: 29, femalePercentage: 21.5, malePercentage: 78.5 },
  { name: "B.Tech IIOT", shortName: "IIOT", category: "UG", total: 58, male: 46, female: 12, femalePercentage: 20.7, malePercentage: 79.3 },
  { name: "B.Tech MnC", shortName: "MnC", category: "UG", total: 56, male: 43, female: 13, femalePercentage: 23.2, malePercentage: 76.8 },
  { name: "B.Tech AIML", shortName: "AIML", category: "UG", total: 56, male: 42, female: 14, femalePercentage: 25.0, malePercentage: 75.0 },
  { name: "B.Tech PIE", shortName: "PIE", category: "UG", total: 57, male: 47, female: 10, femalePercentage: 17.5, malePercentage: 82.5 },

  // ---------- PG ----------
  { name: "MCA", shortName: "MCA", category: "PG", total: 91, male: 73, female: 18, femalePercentage: 19.8, malePercentage: 80.2 },
  { name: "M.Tech PIE", shortName: "M.Tech PIE", category: "PG", total: 4, male: 2, female: 2, femalePercentage: 50.0, malePercentage: 50.0 },
  { name: "M.Tech Structures (Civil)", shortName: "M.Tech Structures", category: "PG", total: 17, male: 14, female: 3, femalePercentage: 17.6, malePercentage: 82.4 },
  { name: "M.Tech Control System", shortName: "M.Tech Control Sys", category: "PG", total: 10, male: 7, female: 3, femalePercentage: 30.0, malePercentage: 70.0 },
  { name: "M.Tech Computer Engineering (Cybersecurity)", shortName: "M.Tech Cybersecurity", category: "PG", total: 30, male: 22, female: 8, femalePercentage: 26.7, malePercentage: 73.3 },
  { name: "M.Tech Computer Engineering (Computer)", shortName: "M.Tech Computer Eng", category: "PG", total: 46, male: 35, female: 11, femalePercentage: 23.9, malePercentage: 76.1 },
  { name: "M.Tech PED", shortName: "M.Tech PED", category: "PG", total: 12, male: 8, female: 4, femalePercentage: 33.3, malePercentage: 66.7 },
  { name: "M.Tech Communication Systems", shortName: "M.Tech Comm Systems", category: "PG", total: 12, male: 8, female: 3, femalePercentage: 25.0, malePercentage: 66.7 },
  { name: "M.Tech Geotech", shortName: "M.Tech Geotech", category: "PG", total: 5, male: 3, female: 2, femalePercentage: 40.0, malePercentage: 60.0 },
  { name: "M.Tech Power System", shortName: "M.Tech Power System", category: "PG", total: 5, male: 5, female: 0, femalePercentage: 0.0, malePercentage: 100.0 },
  { name: "MBA", shortName: "MBA", category: "PG", total: 47, male: 28, female: 19, femalePercentage: 40.4, malePercentage: 59.6 },
  { name: "M.Tech VLSI Design", shortName: "M.Tech VLSI", category: "PG", total: 56, male: 43, female: 13, femalePercentage: 23.2, malePercentage: 76.8 },
  { name: "M.Tech Embedded System Design", shortName: "M.Tech Embedded Sys", category: "PG", total: 29, male: 24, female: 5, femalePercentage: 17.2, malePercentage: 82.8 },
  { name: "M.Sc Economics", shortName: "M.Sc Economics", category: "PG", total: 5, male: 1, female: 4, femalePercentage: 80.0, malePercentage: 20.0 },
  { name: "M.Sc Chemistry", shortName: "M.Sc Chemistry", category: "PG", total: 22, male: 3, female: 19, femalePercentage: 86.4, malePercentage: 13.6 },
  { name: "M.Sc Mathematics", shortName: "M.Sc Mathematics", category: "PG", total: 26, male: 16, female: 8, femalePercentage: 30.8, malePercentage: 61.5 },
  { name: "M.Tech Transportation", shortName: "M.Tech Transportation", category: "PG", total: 15, male: 12, female: 3, femalePercentage: 20.0, malePercentage: 80.0 }
];

const totalStats2027 = {
  total: 1551,
  ug: 1119,
  pg: 432,
  male: 1198,
  female: 350,
  malePercentage: 77.2,
  femalePercentage: 22.6
};

// 2028 Batch Data
const programData2028 = [
  { name: "B.Tech CSE", shortName: "CSE", category: "UG", total: 117, male: 95, female: 22, femalePercentage: 18.8, malePercentage: 81.2 },
  { name: "B.Tech IT", shortName: "Information Tech", category: "UG", total: 65, male: 49, female: 16, femalePercentage: 24.6, malePercentage: 75.4 },
  { name: "B.Tech ECE", shortName: "ECE", category: "UG", total: 118, male: 94, female: 24, femalePercentage: 20.3, malePercentage: 79.7 },
  { name: "B.Tech EE", shortName: "EE", category: "UG", total: 119, male: 95, female: 24, femalePercentage: 20.2, malePercentage: 79.8 },
  { name: "B.Tech ME", shortName: "ME", category: "UG", total: 114, male: 91, female: 23, femalePercentage: 20.2, malePercentage: 79.8 },
  { name: "B.Tech Civil", shortName: "Civil", category: "UG", total: 119, male: 98, female: 21, femalePercentage: 17.6, malePercentage: 82.4 },
  { name: "B.Tech PIE", shortName: "PIE", category: "UG", total: 40, male: 32, female: 8, femalePercentage: 20.0, malePercentage: 80.0 },
  { name: "B.Tech AIML", shortName: "AIML", category: "UG", total: 60, male: 48, female: 12, femalePercentage: 20.0, malePercentage: 80.0 },
  { name: "B.Tech AI&DS", shortName: "AI&DS", category: "UG", total: 60, male: 48, female: 12, femalePercentage: 20.0, malePercentage: 80.0 },
  { name: "B.Tech IIOT", shortName: "IIOT", category: "UG", total: 61, male: 48, female: 13, femalePercentage: 21.3, malePercentage: 78.7 },
  { name: "B.Tech SET", shortName: "SET", category: "UG", total: 55, male: 42, female: 13, femalePercentage: 23.6, malePercentage: 76.4 },
  { name: "B.Tech VLSI", shortName: "VLSI", category: "UG", total: 56, male: 44, female: 12, femalePercentage: 21.4, malePercentage: 78.6 },
  { name: "B.Tech RA", shortName: "RA", category: "UG", total: 47, male: 39, female: 8, femalePercentage: 17.0, malePercentage: 83.0 },
  { name: "B.Tech MnC", shortName: "Math & Computing", category: "UG", total: 58, male: 46, female: 12, femalePercentage: 20.7, malePercentage: 79.3 }
];

const totalStats2028 = {
  total: 1089,
  ug: 1089,
  pg: 0,
  male: 869,
  female: 220,
  malePercentage: 79.8,
  femalePercentage: 20.2
};

// Vibrant, High-Contrast Colors — Male: Deep Blue | Female: Cyan (used across every chart)
const COLORS = {
  male: '#1D4ED8',   // Deep Blue
  female: '#06B6D4', // Cyan
  ug: '#3B82F6',     
  pg: '#9333EA',     
  textMain: '#111827',
  textMuted: '#374151', 
  grid: '#9CA3AF' 
};

// Undergraduate / Postgraduate doughnut segment palette (category breakdown, not gender)
const UG_PALETTE = [
  '#5FA8D3', // muted blue
  '#D97A8C', // dusty rose
  '#9B8AE6', // soft violet
  '#63B88C', // muted green
  '#D9A441', // muted amber
  '#7C83D8', // soft indigo
  '#56B4AE', // muted teal
  '#D873AF', // dusty pink
  '#5CB8D8', // soft cyan
  '#D98B57', // muted orange
  '#8FBE52', // muted lime
  '#A57BE5', // lavender
  '#E49BC0', // light pink
  '#73CFE2', // pale cyan
  '#E3A574', // light orange
  '#78C89A', // pastel green
  '#9CA8F4'  // light indigo
];

const batch2027DoughnutData = [
  { name: 'CSE', value: 18.8, total: 1119 },
  { name: 'IT', value: 12.7, total: 1119 },
  { name: 'ECE', value: 12.7, total: 1119 },
  { name: 'EE', value: 12.2, total: 1119 },
  { name: 'ME', value: 11.3, total: 1119 },
  { name: 'PIE', value: 5.1, total: 1119 },
  { name: 'CIVIL', value: 12.1, total: 1119 },
  { name: 'MnC', value: 5.0, total: 1119 },
  { name: 'IIoT', value: 5.2, total: 1119 },
  { name: 'AIML', value: 5.0, total: 1119 },
];

const batch2027PGDoughnutData = [
  { name: 'MCA', value: 21.1, total: 432 },
  { name: 'M.Tech PIE', value: 0.9, total: 432 },
  { name: 'M.Tech Structures', value: 3.9, total: 432 },
  { name: 'M.Tech Control Sys', value: 2.3, total: 432 },
  { name: 'M.Tech Cybersecurity', value: 6.9, total: 432 },
  { name: 'M.Tech Computer Eng', value: 10.6, total: 432 },
  { name: 'M.Tech PED', value: 2.8, total: 432 },
  { name: 'M.Tech Comm Systems', value: 2.8, total: 432 },
  { name: 'M.Tech Geotech', value: 1.2, total: 432 },
  { name: 'M.Tech Power System', value: 1.2, total: 432 },
  { name: 'MBA', value: 10.9, total: 432 },
  { name: 'M.Tech VLSI', value: 13.0, total: 432 },
  { name: 'M.Tech Embedded Sys', value: 6.7, total: 432 },
  { name: 'M.Sc Economics', value: 1.2, total: 432 },
  { name: 'M.Sc Chemistry', value: 5.1, total: 432 },
  { name: 'M.Sc Mathematics', value: 6.0, total: 432 },
  { name: 'M.Tech Transportation', value: 3.5, total: 432 }
];

const batch2028DoughnutData = [
  { name: 'CSE', value: 10.7, total: 1089 },
  { name: 'IT', value: 6.0, total: 1089 },
  { name: 'ECE', value: 10.8, total: 1089 },
  { name: 'EE', value: 10.9, total: 1089 },
  { name: 'ME', value: 10.5, total: 1089 },
  { name: 'Civil', value: 10.9, total: 1089 },
  { name: 'PIE', value: 3.7, total: 1089 },
  { name: 'MnC', value: 5.3, total: 1089 },
  { name: 'IIoT', value: 5.6, total: 1089 },
  { name: 'AIML', value: 5.5, total: 1089 },
  { name: 'AI&DS', value: 5.5, total: 1089 },
  { name: 'SET', value: 5.1, total: 1089 },
  { name: 'VLSI', value: 5.1, total: 1089 },
  { name: 'RA', value: 4.3, total: 1089 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-xl animate-scale-in">
        <p className="font-bold text-gray-900 mb-2 text-base">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2 text-base">
            <div className="w-3 h-3 rounded-md" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-700 font-semibold">{entry.name}:</span>
            <span className="text-gray-900 font-bold">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Adjusted Axis Tick to ensure zero clipping on X-Axis
const CustomizedAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={0} 
        y={0} 
        dy={16} 
        dx={-20} // Pulled further left
        textAnchor="end" 
        fill={COLORS.textMain} // Darker text
        transform="rotate(-45)" // Sharper rotation
        className="text-[13px] font-bold"
      >
        {payload.value}
      </text>
    </g>
  );
};

// Doughnut + clean list-style legend below it — no overlapping on-chart labels, every
// program name is always fully readable regardless of how many segments there are.
const DoughnutWithLegend = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius="58%"
              outerRadius="90%"
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={UG_PALETTE[index % UG_PALETTE.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-black text-gray-900">{data[0].total}</span>
          <span className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Total</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-8 w-full max-w-md">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: UG_PALETTE[index % UG_PALETTE.length] }}
            />
            <span className="text-sm font-bold text-gray-800 truncate">{entry.name}</span>
            <span className="text-sm font-black text-gray-500 ml-auto flex-shrink-0">{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Demographics() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("UG"); 
  const [activeYear, setActiveYear] = useState(2027);

  // Use appropriate dataset based on year
  const activeProgramData = filter === "PG"
  ? programData2027
  : (activeYear === 2027 ? programData2027 : programData2028);

  const filteredData = useMemo(() => {
    return activeProgramData.filter(prog => {
      const matchesSearch = prog.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = prog.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [activeProgramData, searchTerm, filter]);

  // Calculate stats dynamically based on the filtered data
  const activeTotalStats = useMemo(() => {
    let total = 0;
    let male = 0;
    let female = 0;
    let ug = 0;
    let pg = 0;

    filteredData.forEach(prog => {
      total += prog.total;
      male += prog.male;
      female += prog.female;
      if (prog.category === 'UG') ug += prog.total;
      if (prog.category === 'PG') pg += prog.total;
    });

    return {
      total,
      ug,
      pg,
      male,
      female,
      malePercentage: total > 0 ? ((male / total) * 100).toFixed(1) : 0,
      femalePercentage: total > 0 ? ((female / total) * 100).toFixed(1) : 0
    };
  }, [filteredData]);

  // Doughnut section content switches based on UG / PG filter
  const isPGView = filter === 'PG';
  const doughnutSectionTitle = isPGView ? 'Postgraduate Programs' : 'Undergraduate Programs';
  const doughnut2027Data = isPGView ? batch2027PGDoughnutData : batch2027DoughnutData;
  // 2028 batch: PG numbers haven't been reported separately yet, so we mirror the 2027
  // PG split here (per request) until real 2028 PG data comes in.
  // 
  const doughnut2028Data = batch2028DoughnutData

  return (
    <div
      className="min-h-screen bg-[#FDFBF7] pb-16"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif" }}
    >
      <Navbar />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 animate-fade-in-up">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Batch Strength Demographics</h1>
            <p className="text-gray-700 mt-2 font-semibold text-lg">Comprehensive overview of student distribution and diversity.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search program..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 transition-all bg-white"
              />
            </div>
            
            <div className="flex p-1.5 bg-white border-2 border-gray-200 rounded-xl w-full sm:w-auto">
              {['UG', 'PG'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 sm:flex-none px-5 py-2 text-base font-bold rounded-lg transition-all ${
                    filter === f 
                      ? 'bg-gray-100 text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            
            {filter === "UG" ? (
  <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl p-1.5 w-full sm:w-auto shadow-sm">
    {[2027, 2028].map((year) => (
      <button
        key={year}
        onClick={() => setActiveYear(year)}
        className={`px-6 py-2 text-base font-bold rounded-lg transition-all ${
          activeYear === year
            ? "bg-red-50 text-[#BE123C] shadow-sm"
            : "text-gray-500 hover:text-gray-800"
        }`}
      >
        {year} Batch
      </button>
    ))}
  </div>
) : (
  <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl p-1.5 w-full sm:w-auto shadow-sm">
    <button
      onClick={() => setActiveYear(2027)}
      className="px-6 py-2 text-base font-bold rounded-lg bg-red-50 text-[#BE123C] shadow-sm"
    >
      2027 Batch
    </button>
  </div>
)}
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 stagger-children">
          {/* Total Students Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
            <p className="text-base font-bold text-gray-600 mb-2 uppercase tracking-wide">Total Students</p>
            <div className="flex items-baseline gap-3">
              <h2 className="text-5xl font-black text-gray-900 tracking-tight">{activeTotalStats.total}</h2>
              <Users className="h-7 w-7 text-gray-300" />
            </div>
            <div className="flex items-center gap-3 mt-4 text-sm font-bold">
              <span className="text-gray-900">{activeTotalStats.ug} <span className="text-gray-500 font-semibold">UG</span></span>
              <span className="text-gray-900">{activeTotalStats.pg} <span className="text-gray-500 font-semibold">PG</span></span>
            </div>
          </div>

          {/* Male Students Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
            <p className="text-base font-bold text-gray-600 mb-2 uppercase tracking-wide">Male Students</p>
            <h2 className="text-5xl font-black text-[#1D4ED8] tracking-tight">{activeTotalStats.male}</h2>
            <p className="mt-4 text-base font-bold text-gray-900">
              {activeTotalStats.malePercentage}% <span className="text-gray-500 font-semibold">of total</span>
            </p>
          </div>

          {/* Female Students Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
            <p className="text-base font-bold text-gray-600 mb-2 uppercase tracking-wide">Female Students</p>
            <h2 className="text-5xl font-black text-[#06B6D4] tracking-tight">{activeTotalStats.female}</h2>
            <p className="mt-4 text-base font-bold text-gray-900">
              {activeTotalStats.femalePercentage}% <span className="text-gray-500 font-semibold">of total</span>
            </p>
          </div>
          
          {/* Ratio Bar Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 flex flex-col justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
            <div className="w-full h-5 bg-gray-100 rounded-full overflow-hidden flex animate-scale-in shadow-inner" style={{ animationDelay: '400ms' }}>
              <div className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#1D4ED8]" style={{ width: `${activeTotalStats.malePercentage}%`, transition: 'width 0.5s ease-in-out' }}></div>
              <div className="h-full bg-gradient-to-r from-[#0E7490] to-[#06B6D4]" style={{ width: `${activeTotalStats.femalePercentage}%`, transition: 'width 0.5s ease-in-out' }}></div>
            </div>
            <div className="flex justify-between mt-5 text-base font-black">
              <span className="text-[#1D4ED8]">{activeTotalStats.malePercentage}% MALE</span>
              <span className="text-[#06B6D4]">{activeTotalStats.femalePercentage}% FEMALE</span>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 stagger-children">
          {/* Gender Distribution Bar Chart */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <h3 className="text-2xl font-black text-gray-900 mb-8">Gender Distribution by Program</h3>
            <div className="h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData} margin={{ top: 20, right: 30, left: -20, bottom: 120 }} barGap={6}>
                  <defs>
                    <linearGradient id="colorMaleBar" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#1E3A8A" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#1D4ED8" stopOpacity={1}/>
                    </linearGradient>
                    <linearGradient id="colorFemaleBar" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#0E7490" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity={1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={COLORS.grid} strokeOpacity={0.6} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                    height={140}
                    tick={<CustomizedAxisTick />}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: COLORS.textMain, fontSize: 14, fontWeight: 800 }}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                  <Legend 
                    verticalAlign="top" 
                    height={50} 
                    iconType="square"
                    wrapperStyle={{ fontSize: '15px', fontWeight: 800, color: COLORS.textMain }}
                  />
                  <Bar dataKey="female" name="Female" fill="url(#colorFemaleBar)" radius={[8, 8, 0, 0]} animationDuration={1000}>
                    <LabelList dataKey="female" position="top" fill={COLORS.textMain} fontSize={13} fontWeight="800" />
                  </Bar>
                  <Bar dataKey="male" name="Male" fill="url(#colorMaleBar)" radius={[8, 8, 0, 0]} animationDuration={1000}>
                    <LabelList dataKey="male" position="top" fill={COLORS.textMain} fontSize={13} fontWeight="800" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Overall Diversity Doughnut */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col">
            <h3 className="text-2xl font-black text-gray-900 mb-6">Overall Diversity</h3>
            <div className="flex-1 relative min-h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <linearGradient id="pieMaleGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#1E3A8A" stopOpacity={1}/>
                    </linearGradient>
                    <linearGradient id="pieFemaleGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22D3EE" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#0E7490" stopOpacity={1}/>
                    </linearGradient>
                  </defs>
                  <Pie
                    data={[
                      { name: 'Male', value: activeTotalStats.male, color: "url(#pieMaleGrad)" },
                      { name: 'Female', value: activeTotalStats.female, color: "url(#pieFemaleGrad)" }
                    ]}
                    innerRadius="50%"
                    outerRadius="75%"
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                    animationDuration={1200}
                    animationEasing="ease-out"
                  >
                    {[
                      { name: 'Male', value: activeTotalStats.male, color: "url(#pieMaleGrad)" },
                      { name: 'Female', value: activeTotalStats.female, color: "url(#pieFemaleGrad)" }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-5xl font-black text-gray-900">{activeTotalStats.total}</span>
                <span className="text-sm text-gray-600 font-bold uppercase tracking-widest mt-2">Total</span>
              </div>
            </div>
            {/* Custom Legend for Doughnut */}
            <div className="flex justify-center gap-8 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-md bg-gradient-to-b from-[#3B82F6] to-[#1E3A8A] shadow-sm"></div>
                <span className="text-base font-bold text-gray-900">Male ({activeTotalStats.malePercentage}%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-md bg-gradient-to-b from-[#22D3EE] to-[#0E7490] shadow-sm"></div>
                <span className="text-base font-bold text-gray-900">Female ({activeTotalStats.femalePercentage}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Undergraduate / Postgraduate Programs Section (switches with UG/PG filter) */}
        <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <h3 className="text-3xl font-black text-gray-900 mb-12 tracking-tight">{doughnutSectionTitle}</h3>
          
          <div
  className={`grid ${
    filter === "PG"
      ? "grid-cols-1"
      : "grid-cols-1 md:grid-cols-2"
  } gap-12 lg:gap-24`}
>

  {/* 2027 Batch */}
  <div className="flex flex-col items-center">
    <h4 className="text-2xl font-black text-gray-900 mb-8 tracking-wide">
      2027 Batch
    </h4>

    <DoughnutWithLegend data={doughnut2027Data} />
  </div>

  {/* 2028 Batch (Only for UG) */}
  {filter === "UG" && (
    <div className="flex flex-col items-center">
      <h4 className="text-2xl font-black text-gray-900 mb-8 tracking-wide">
        2028 Batch
      </h4>

      <DoughnutWithLegend data={doughnut2028Data} />
    </div>
  )}

</div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 gap-6 mb-10 stagger-children">
          {/* Stacked Bar Chart */}
          <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <h3 className="text-2xl font-black text-gray-900 mb-10">Total Strength Stacked</h3>
            <div className="h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData} margin={{ top: 20, right: 30, left: -20, bottom: 120 }} barSize={42}>
                  <defs>
                    <linearGradient id="colorMaleStacked" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#1E3A8A" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#1D4ED8" stopOpacity={1}/>
                    </linearGradient>
                    <linearGradient id="colorFemaleStacked" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#0E7490" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity={1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={COLORS.grid} strokeOpacity={0.6} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                    height={140}
                    tick={<CustomizedAxisTick />}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: COLORS.textMain, fontSize: 14, fontWeight: 800 }}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                  <Legend 
                    verticalAlign="top" 
                    height={50} 
                    iconType="square"
                    wrapperStyle={{ fontSize: '15px', fontWeight: 800, color: COLORS.textMain }}
                  />
                  <Bar dataKey="male" name="Male" stackId="a" fill="url(#colorMaleStacked)" animationDuration={1000}>
                    <LabelList dataKey="male" position="inside" fill="#fff" fontSize={12} fontWeight="bold" />
                  </Bar>
                  <Bar dataKey="female" name="Female" stackId="a" fill="url(#colorFemaleStacked)" radius={[8, 8, 0, 0]} animationDuration={1000}>
                    <LabelList dataKey="female" position="inside" fill="#fff" fontSize={11} fontWeight="bold" />
                    {/* Total label above the bar in "male:female" format, always visible even for tiny bars */}
                    <LabelList
                      content={(props) => {
                        const { x, y, width, index } = props;
                        const entry = filteredData[index];
                        if (!entry) return null;
                        return (
                          <text
                            x={x + width / 2}
                            y={y - 10}
                            textAnchor="middle"
                            fill={COLORS.textMain}
                            fontSize={14}
                            fontWeight="800"
                          >
                            {entry.male}:{entry.female}
                          </text>
                        );
                      }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Program Ranking Horizontal Bar */}
          <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
              <h3 className="text-2xl font-black text-gray-900">Program Ranking by Total Strength</h3>
              <div className="flex gap-6">
                <div className="flex items-center gap-3 bg-purple-50 px-4 py-2 rounded-xl">
                  <div className="w-4 h-4 rounded-md bg-gradient-to-r from-[#C084FC] to-[#7E22CE] shadow-sm"></div>
                  <span className="text-base font-black text-purple-900">UG Programs</span>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl">
                  <div className="w-4 h-4 rounded-md bg-gradient-to-r from-[#60A5FA] to-[#2563EB] shadow-sm"></div>
                  <span className="text-base font-black text-blue-900">PG Programs</span>
                </div>
              </div>
            </div>
            
            <div className="h-[500px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  layout="vertical" 
                  data={[...filteredData].sort((a, b) => b.total - a.total)} 
                  margin={{ top: 40, right: 60, left: 20, bottom: 10 }}
                  barSize={24}
                >
                  <defs>
                    <linearGradient id="colorUgGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#60A5FA" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#2563EB" stopOpacity={1}/>
                    </linearGradient>
                    <linearGradient id="colorPgGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#C084FC" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#7E22CE" stopOpacity={1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={COLORS.grid} strokeOpacity={0.7} />
                  <XAxis 
                    type="number" 
                    orientation="top"
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: COLORS.textMain, fontSize: 14, fontWeight: 800 }}
                  />
                  <YAxis 
                    dataKey="shortName" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false}
                    width={150}
                    interval={0}
                    tick={{ fill: COLORS.textMain, fontSize: 13, fontWeight: 800 }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                  <Bar dataKey="total" name="Total Strength" radius={[0, 8, 8, 0]} animationDuration={1000}>
                    <LabelList dataKey="total" position="right" fill={COLORS.textMain} fontSize={14} fontWeight="800" />
                    {
                      [...filteredData].sort((a, b) => b.total - a.total).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.category === 'UG' ? "url(#colorPgGrad)" : "url(#colorUgGrad)"} />
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Report Table */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="px-8 py-8 border-b border-gray-200 flex justify-between items-center bg-white">
            <h3 className="text-2xl font-black text-gray-900">Detailed Report</h3>
            <span className="text-base font-black text-gray-700 bg-gray-100 px-4 py-1.5 rounded-full">{filteredData.length} RECORDS</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th className="px-8 py-5 text-left text-sm font-black text-gray-600 uppercase tracking-widest group cursor-pointer hover:text-gray-900">
                    Program <span className="text-gray-400 ml-1">↑↓</span>
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-black text-gray-600 uppercase tracking-widest group cursor-pointer hover:text-gray-900">
                    Category <span className="text-gray-400 ml-1">↑↓</span>
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-black text-gray-600 uppercase tracking-widest group cursor-pointer hover:text-gray-900">
                    Total Students <span className="text-red-500 ml-1">↓</span>
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-black text-gray-600 uppercase tracking-widest group cursor-pointer hover:text-gray-900">
                    Male <span className="text-gray-400 ml-1">↑↓</span>
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-black text-gray-600 uppercase tracking-widest group cursor-pointer hover:text-gray-900">
                    Female <span className="text-gray-400 ml-1">↑↓</span>
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-black text-gray-600 uppercase tracking-widest group cursor-pointer hover:text-gray-900">
                    Gender % <span className="text-gray-400 ml-1">↑↓</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredData.map((prog, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors duration-150">
                    <td className="px-8 py-5 whitespace-nowrap text-base font-bold text-gray-900">
                      {prog.name}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-black tracking-wider ${
                        prog.category === 'UG' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {prog.category}
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-base font-black text-gray-900">
                      {prog.total}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-base font-bold text-gray-700">
                      {prog.male}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-base font-bold text-[#06B6D4]">
                      {prog.female}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex flex-col gap-1.5 w-32">
                        <div className="flex justify-between text-xs font-black tracking-wider">
                          <span className="text-[#1D4ED8]">{prog.malePercentage}%</span>
                          <span className="text-[#06B6D4]">{prog.femalePercentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
                          <div className="h-full bg-[#1D4ED8]" style={{ width: `${prog.malePercentage}%` }}></div>
                          <div className="h-full bg-[#06B6D4]" style={{ width: `${prog.femalePercentage}%` }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}