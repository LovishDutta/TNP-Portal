import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LabelList
} from 'recharts';
import { Search } from 'lucide-react';

// 2027 Batch Data (Updated - UG + PG)
// ========================= 2027 Batch =========================

const programData2027 = [
  // ---------- UG ----------
  { name: "Computer Engineering", shortName: "CSE", category: "UG", total: 213, male: 169, female: 44, femalePercentage: 20.7, malePercentage: 79.3 },
  { name: "Information Technology", shortName: "IT", category: "UG", total: 142, male: 114, female: 28, femalePercentage: 19.7, malePercentage: 80.3 },
  { name: "Electronics & Communication Engineering", shortName: "ECE", category: "UG", total: 140, male: 114, female: 26, femalePercentage: 18.6, malePercentage: 81.4 },
  { name: "Electrical Engineering", shortName: "EE", category: "UG", total: 136, male: 110, female: 26, femalePercentage: 19.1, malePercentage: 80.9 },
  { name: "Mechanical Engineering", shortName: "ME", category: "UG", total: 132, male: 107, female: 25, femalePercentage: 18.9, malePercentage: 81.1 },
  { name: "Civil Engineering", shortName: "Civil", category: "UG", total: 135, male: 106, female: 29, femalePercentage: 21.5, malePercentage: 78.5 },
  { name: "Industrial Internet of Things (IIOT)", shortName: "IIOT", category: "UG", total: 58, male: 46, female: 12, femalePercentage: 20.7, malePercentage: 79.3 },
  { name: "Mathematics & Computing", shortName: "MnC", category: "UG", total: 56, male: 43, female: 13, femalePercentage: 23.2, malePercentage: 76.8 },
  { name: "Artificial Intelligence & Machine Learning (AIML)", shortName: "AIML", category: "UG", total: 56, male: 42, female: 14, femalePercentage: 25.0, malePercentage: 75.0 },
  { name: "Production & Industrial Engineering", shortName: "PIE", category: "UG", total: 57, male: 47, female: 10, femalePercentage: 17.5, malePercentage: 82.5 },

  // ---------- PG ----------
  { name: "Master of Computer Applications (MCA)", shortName: "MCA", category: "PG", total: 91, male: 73, female: 18, femalePercentage: 19.8, malePercentage: 80.2 },
  { name: "Production & Industrial Engineering", shortName: "M.Tech PIE", category: "PG", total: 4, male: 2, female: 2, femalePercentage: 50.0, malePercentage: 50.0 },
  { name: "Structural Engineering", shortName: "M.Tech Structures", category: "PG", total: 17, male: 14, female: 3, femalePercentage: 17.6, malePercentage: 82.4 },
  { name: "Control System", shortName: "M.Tech Control System", category: "PG", total: 10, male: 7, female: 3, femalePercentage: 30.0, malePercentage: 70.0 },
  { name: "Computer Engineering/ Cyber Security", shortName: "M.Tech Cybersecurity", category: "PG", total: 30, male: 22, female: 8, femalePercentage: 26.7, malePercentage: 73.3 },
  { name: "Power Electronics & Drives", shortName: "M.Tech PED", category: "PG", total: 12, male: 8, female: 4, femalePercentage: 33.3, malePercentage: 66.7 },
  { name: "Communication Systems", shortName: "M.Tech Communication Systems", category: "PG", total: 12, male: 8, female: 4, femalePercentage: 33.3, malePercentage: 66.7 },
  { name: "Geotechnical Engineering", shortName: "M.Tech Geotech", category: "PG", total: 5, male: 3, female: 2, femalePercentage: 40.0, malePercentage: 60.0 },
  { name: "Power System", shortName: "M.Tech Power System", category: "PG", total: 5, male: 5, female: 0, femalePercentage: 0.0, malePercentage: 100.0 },
  { name: "Master of Business Administration (MBA)", shortName: "MBA", category: "PG", total: 47, male: 28, female: 19, femalePercentage: 40.4, malePercentage: 59.6 },
  { name: "VLSI Design", shortName: "M.Tech VLSI", category: "PG", total: 56, male: 43, female: 13, femalePercentage: 23.2, malePercentage: 76.8 },
  { name: "Embedded System Design", shortName: "M.Tech Embedded System Design", category: "PG", total: 29, male: 24, female: 5, femalePercentage: 17.2, malePercentage: 82.8 },
  { name: "M.Sc. (Economics)", shortName: "M.Sc. Economics", category: "PG", total: 5, male: 1, female: 4, femalePercentage: 80.0, malePercentage: 20.0 },
  { name: "M.Sc. (Chemistry)", shortName: "M.Sc. Chemistry", category: "PG", total: 22, male: 3, female: 19, femalePercentage: 86.4, malePercentage: 13.6 },
  { name: "M.Sc. (Mathematics)", shortName: "M.Sc. Mathematics", category: "PG", total: 26, male: 18, female: 8, femalePercentage: 30.8, malePercentage: 69.2 },
  { name: "Transportation Engineering", shortName: "M.Tech Transportation", category: "PG", total: 15, male: 12, female: 3, femalePercentage: 20.0, malePercentage: 80.0 },
  { name: "Machine Design", shortName: "M.Tech Machine Design", category: "PG", total: 15, male: 12, female: 3, femalePercentage: 20.0, malePercentage: 80.0 },
  { name: "Renewable Energy Systems", shortName: "M.Tech Renewable Energy Systems", category: "PG", total: 15, male: 12, female: 3, femalePercentage: 20.0, malePercentage: 80.0 },
  { name: "M.Sc. (Physics)", shortName: "M.Sc. Physics", category: "PG", total: 16, male: 12, female: 4, femalePercentage: 25.0, malePercentage: 75.0 }
];

const totalStats2027 = {
  total: 1557,
  ug: 1125,
  pg: 432,
  male: 1205,
  female: 352,
  malePercentage: 77.4,
  femalePercentage: 22.6
};


// ========================= 2028 Batch =========================

const programData2028 = [
  { name: "Computer Engineering", shortName: "CSE", category: "UG", total: 132, male: 106, female: 26, femalePercentage: 19.7, malePercentage: 80.3 },
  { name: "Information Technology", shortName: "IT", category: "UG", total: 65, male: 49, female: 16, femalePercentage: 24.6, malePercentage: 75.4 },
  { name: "Electronics & Communication Engineering", shortName: "ECE", category: "UG", total: 120, male: 96, female: 24, femalePercentage: 20.0, malePercentage: 80.0 },
  { name: "Electrical Engineering", shortName: "EE", category: "UG", total: 120, male: 96, female: 24, femalePercentage: 20.0, malePercentage: 80.0 },
  { name: "Mechanical Engineering", shortName: "ME", category: "UG", total: 105, male: 83, female: 22, femalePercentage: 21.0, malePercentage: 79.0 },
  { name: "Civil Engineering", shortName: "Civil", category: "UG", total: 119, male: 98, female: 21, femalePercentage: 17.6, malePercentage: 82.4 },
  { name: "Production & Industrial Engineering", shortName: "PIE", category: "UG", total: 40, male: 32, female: 8, femalePercentage: 20.0, malePercentage: 80.0 },
  { name: "Artificial Intelligence & Machine Learning (AIML)", shortName: "AIML", category: "UG", total: 60, male: 48, female: 12, femalePercentage: 20.0, malePercentage: 80.0 },
  { name: "Artificial Intelligence & Data Science (AI&DS)", shortName: "AI&DS", category: "UG", total: 60, male: 48, female: 12, femalePercentage: 20.0, malePercentage: 80.0 },
  { name: "Industrial Internet of Things (IIOT)", shortName: "IIOT", category: "UG", total: 60, male: 50, female: 10, femalePercentage: 16.7, malePercentage: 83.3 },
  { name: "Sustainable Energy Technologies (SET)", shortName: "SET", category: "UG", total: 55, male: 42, female: 13, femalePercentage: 23.6, malePercentage: 76.4 },
  { name: "Microelectronics & VLSI", shortName: "VLSI", category: "UG", total: 56, male: 44, female: 12, femalePercentage: 21.4, malePercentage: 78.6 },
  { name: "Robotics & Automation (RA)", shortName: "RA", category: "UG", total: 47, male: 39, female: 8, femalePercentage: 17.0, malePercentage: 83.0 },
  { name: "Mathematics & Computing", shortName: "MnC", category: "UG", total: 58, male: 46, female: 12, femalePercentage: 20.7, malePercentage: 79.3 }
];

const totalStats2028 = {
  total: 1097,
  ug: 1097,
  pg: 0,
  male: 875,
  female: 222,
  malePercentage: 79.8,
  femalePercentage: 20.2
};

// Male: dark navy/near-black | Female: site maroon — matches the site's theme instead of blue/cyan
const COLORS = {
  male: '#1F2937',
  female: '#7A0019',
  ug: '#3B82F6',
  pg: '#9333EA',
  textMain: '#111827',
  textMuted: '#374151',
  grid: '#9CA3AF'
};

const UG_PALETTE = [
  '#5FA8D3', '#D97A8C', '#9B8AE6', '#63B88C', '#D9A441', '#7C83D8', '#56B4AE', '#D873AF',
  '#5CB8D8', '#D98B57', '#8FBE52', '#A57BE5', '#E49BC0', '#73CFE2', '#E3A574', '#78C89A', '#9CA8F4'
];

// ========================= 2027 UG Doughnut =========================

const batch2027DoughnutData = [
  { name: "CSE", value: 18.9, total: 1125 },
  { name: "IT", value: 12.6, total: 1125 },
  { name: "ECE", value: 12.4, total: 1125 },
  { name: "EE", value: 12.1, total: 1125 },
  { name: "ME", value: 11.7, total: 1125 },
  { name: "Civil", value: 12.0, total: 1125 },
  { name: "PIE", value: 5.1, total: 1125 },
  { name: "MnC", value: 5.0, total: 1125 },
  { name: "IIOT", value: 5.2, total: 1125 },
  { name: "AIML", value: 5.0, total: 1125 }
];


// ========================= 2027 PG Doughnut =========================

const batch2027PGDoughnutData = [
  { name: "MCA", value: 21.1, total: 432 },
  { name: "M.Tech PIE", value: 0.9, total: 432 },
  { name: "M.Tech Structures", value: 3.9, total: 432 },
  { name: "M.Tech Control System", value: 2.3, total: 432 },
  { name: "M.Tech Cybersecurity", value: 6.9, total: 432 },
  { name: "M.Tech PED", value: 2.8, total: 432 },
  { name: "M.Tech Communication Systems", value: 2.8, total: 432 },
  { name: "M.Tech Geotech", value: 1.2, total: 432 },
  { name: "M.Tech Power System", value: 1.2, total: 432 },
  { name: "MBA", value: 10.9, total: 432 },
  { name: "M.Tech VLSI", value: 13.0, total: 432 },
  { name: "M.Tech Embedded System Design", value: 6.7, total: 432 },
  { name: "M.Sc. Economics", value: 1.2, total: 432 },
  { name: "M.Sc. Chemistry", value: 5.1, total: 432 },
  { name: "M.Sc. Mathematics", value: 6.0, total: 432 },
  { name: "M.Tech Transportation", value: 3.5, total: 432 },
  { name: "M.Tech Machine Design", value: 3.5, total: 432 },
  { name: "M.Tech Renewable Energy Systems", value: 3.5, total: 432 },
  { name: "M.Sc. Physics", value: 3.7, total: 432 }
];


// ========================= 2028 UG Doughnut =========================

const batch2028DoughnutData = [
  { name: "CSE", value: 12.0, total: 1097 },
  { name: "IT", value: 5.9, total: 1097 },
  { name: "ECE", value: 10.9, total: 1097 },
  { name: "EE", value: 10.9, total: 1097 },
  { name: "ME", value: 9.6, total: 1097 },
  { name: "Civil", value: 10.8, total: 1097 },
  { name: "PIE", value: 3.6, total: 1097 },
  { name: "MnC", value: 5.3, total: 1097 },
  { name: "IIOT", value: 5.5, total: 1097 },
  { name: "AIML", value: 5.5, total: 1097 },
  { name: "AI&DS", value: 5.5, total: 1097 },
  { name: "SET", value: 5.0, total: 1097 },
  { name: "VLSI", value: 5.1, total: 1097 },
  { name: "RA", value: 4.3, total: 1097 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 sm:p-4 border border-gray-100 shadow-xl rounded-xl max-w-[220px]">
        <p className="font-bold text-gray-900 mb-2 text-sm sm:text-base truncate">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2 text-sm sm:text-base">
            <div className="w-3 h-3 rounded-md flex-shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-700 font-semibold">{entry.name}:</span>
            <span className="text-gray-900 font-bold">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
  return isMobile;
};

const CustomizedAxisTick = ({ x, y, payload, isMobile }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0} y={0} dy={10} dx={isMobile ? -10 : -20}
      textAnchor="end" fill={COLORS.textMain} transform={isMobile ? "rotate(-90)" : "rotate(-45)"}
      style={{ fontSize: isMobile ? '11px' : '13px', fontWeight: 800 }}
    >
      {payload.value}
    </text>
  </g>
);

const DoughnutWithLegend = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full h-[260px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data} innerRadius="58%" outerRadius="90%" paddingAngle={2}
              dataKey="value" stroke="none" animationDuration={800} animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={UG_PALETTE[index % UG_PALETTE.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl sm:text-4xl font-black text-gray-900">{data[0].total}</span>
          <span className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Total</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 sm:gap-y-3 mt-6 sm:mt-8 w-full max-w-md">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2.5 min-w-0">
            <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: UG_PALETTE[index % UG_PALETTE.length] }} />
            <span className="text-xs sm:text-sm font-bold text-gray-800 truncate">{entry.name}</span>
            <span className="text-xs sm:text-sm font-black text-gray-500 ml-auto flex-shrink-0">{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Shared demographics content — used by both the standalone /demographics page
// and the collapsible accordion on the homepage. Does NOT render its own big
// page title (the parent — page header or accordion trigger — handles that).
export default function DemographicsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("UG");
  const [activeYear, setActiveYear] = useState(2027);
  const isMobile = useIsMobile(768);

  const activeProgramData = filter === "PG"
    ? programData2027
    : (activeYear === 2027 ? programData2027 : programData2028);

  const filteredData = useMemo(() => {
    return activeProgramData.filter(prog => {
      const sTerm = searchTerm.toLowerCase();
      // Common keyword mappings
      const keywordMap = {
        "computer": ["computer engineering", "ce", "cse"],
        "civil": ["civil engineering"],
        "mech": ["mechanical engineering", "me"],
        "electrical": ["electrical engineering", "ee"],
        "electronics": ["electronics & communication engineering", "ece"],
        "aiml": ["artificial intelligence & machine learning"],
        "aids": ["artificial intelligence & data science"],
        "vlsi": ["microelectronics & vlsi", "vlsi design"],
        "mnc": ["mathematics & computing"]
      };

      let matchesSearch = prog.name.toLowerCase().includes(sTerm) || 
                          (prog.shortName && prog.shortName.toLowerCase().includes(sTerm));
                          
      if (!matchesSearch) {
        for (const [key, targets] of Object.entries(keywordMap)) {
          if (key.includes(sTerm) || sTerm.includes(key)) {
            if (targets.some(t => prog.name.toLowerCase().includes(t) || (prog.shortName && prog.shortName.toLowerCase().includes(t)))) {
              matchesSearch = true;
              break;
            }
          }
        }
      }

      const matchesFilter = prog.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [activeProgramData, searchTerm, filter]);

  const activeTotalStats = useMemo(() => {
    let total = 0, male = 0, female = 0, ug = 0, pg = 0;
    filteredData.forEach(prog => {
      total += prog.total; male += prog.male; female += prog.female;
      if (prog.category === 'UG') ug += prog.total;
      if (prog.category === 'PG') pg += prog.total;
    });
    return {
      total, ug, pg, male, female,
      malePercentage: total > 0 ? ((male / total) * 100).toFixed(1) : 0,
      femalePercentage: total > 0 ? ((female / total) * 100).toFixed(1) : 0
    };
  }, [filteredData]);

  const isPGView = filter === 'PG';
  const doughnutSectionTitle = isPGView ? 'Postgraduate Programs' : 'Undergraduate Programs';
  const doughnut2027Data = isPGView ? batch2027PGDoughnutData : batch2027DoughnutData;
  const doughnut2028Data = batch2028DoughnutData;

  const xAxisKey = 'shortName';
  const verticalBarMargin = isMobile
    ? { top: 20, right: 15, left: -25, bottom: 90 }
    : { top: 20, right: 30, left: -20, bottom: 120 };
  const stackedBarMargin = verticalBarMargin;
  const xAxisTickHeight = isMobile ? 110 : 140;
  const legendHeight = isMobile ? 34 : 50;
  const legendFontSize = isMobile ? '11px' : '15px';
  const yAxisTickFontSize = isMobile ? 11 : 14;
  const barLabelFontSize = isMobile ? 10 : 13;
  const stackedBarSize = isMobile ? Math.max(14, Math.min(30, 260 / Math.max(filteredData.length, 1))) : 42;
  const rankingBarSize = isMobile ? 14 : 24;
  const rankingYAxisWidth = isMobile ? 160 : 250;
  const rankingYAxisFontSize = isMobile ? 9 : 13;
  const rankingXAxisFontSize = isMobile ? 10 : 14;
  const rankingLabelFontSize = isMobile ? 10 : 14;
  const totalLabelFontSize = isMobile ? 10 : 14;
  const totalLabelYOffset = isMobile ? 6 : 10;

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif" }}>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row justify-end items-start lg:items-center gap-4 mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text" placeholder="Search program..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-4 focus:ring-[#7A0019]/10 focus:border-[#7A0019] transition-all bg-white"
            />
          </div>

          <div className="flex p-1.5 bg-white border-2 border-gray-200 rounded-xl w-full sm:w-auto">
            {['UG', 'PG'].map(f => (
              <button
                key={f} onClick={() => setFilter(f)}
                className={`flex-1 sm:flex-none px-5 py-2 text-base font-bold rounded-lg transition-all ${
                  filter === f ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'
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
                  key={year} onClick={() => setActiveYear(year)}
                  className={`px-6 py-2 text-base font-bold rounded-lg transition-all ${
                    activeYear === year ? "bg-[#7A0019]/10 text-[#7A0019] shadow-sm" : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {year} Batch
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl p-1.5 w-full sm:w-auto shadow-sm">
              <button onClick={() => setActiveYear(2027)} className="px-6 py-2 text-base font-bold rounded-lg bg-[#7A0019]/10 text-[#7A0019] shadow-sm">
                2027 Batch
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <p className="text-base font-bold text-gray-600 mb-2 uppercase tracking-wide">Total Students</p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">{activeTotalStats.total}</h2>
          <div className="flex items-center gap-3 mt-4 text-sm font-bold">
            <span className="text-gray-900">{activeTotalStats.ug} <span className="text-gray-500 font-semibold">UG</span></span>
            <span className="text-gray-900">{activeTotalStats.pg} <span className="text-gray-500 font-semibold">PG</span></span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <p className="text-base font-bold text-gray-600 mb-2 uppercase tracking-wide">Male Students</p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">{activeTotalStats.male}</h2>
          <p className="mt-4 text-base font-bold text-gray-900">
            {activeTotalStats.malePercentage}% <span className="text-gray-500 font-semibold">of total</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <p className="text-base font-bold text-gray-600 mb-2 uppercase tracking-wide">Female Students</p>
          <h2 className="text-4xl sm:text-5xl font-black text-[#7A0019] tracking-tight">{activeTotalStats.female}</h2>
          <p className="mt-4 text-base font-bold text-gray-900">
            {activeTotalStats.femalePercentage}% <span className="text-gray-500 font-semibold">of total</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 flex flex-col justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="w-full h-5 bg-gray-100 rounded-full overflow-hidden flex shadow-inner">
            <div className="h-full bg-gradient-to-r from-[#111827] to-[#374151]" style={{ width: `${activeTotalStats.malePercentage}%`, transition: 'width 0.5s ease-in-out' }}></div>
            <div className="h-full bg-gradient-to-r from-[#5C0013] to-[#7A0019]" style={{ width: `${activeTotalStats.femalePercentage}%`, transition: 'width 0.5s ease-in-out' }}></div>
          </div>
          <div className="flex justify-between mt-5 text-base font-black">
            <span className="text-gray-900">{activeTotalStats.malePercentage}% MALE</span>
            <span className="text-[#7A0019]">{activeTotalStats.femalePercentage}% FEMALE</span>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 bg-white p-4 sm:p-8 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 sm:mb-8">Gender Distribution by Program</h3>
          <div className="h-[380px] sm:h-[450px] w-full overflow-x-auto overflow-y-hidden custom-scrollbar">
            <div style={{ minWidth: isMobile ? `${Math.max(filteredData.length * 35, 300)}px` : '100%', height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData} margin={verticalBarMargin} barGap={isMobile ? 2 : 6}>
                  <defs>
                    <linearGradient id="colorMaleBar" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#111827" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#374151" stopOpacity={1}/>
                    </linearGradient>
                    <linearGradient id="colorFemaleBar" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#5C0013" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#7A0019" stopOpacity={1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={COLORS.grid} strokeOpacity={0.6} />
                  <XAxis
                    dataKey={xAxisKey} axisLine={false} tickLine={false} interval={0} height={xAxisTickHeight}
                    tick={(props) => <CustomizedAxisTick {...props} isMobile={isMobile} />}
                  />
                  <YAxis
                    axisLine={false} tickLine={false}
                    tick={{ fill: COLORS.textMain, fontSize: yAxisTickFontSize, fontWeight: 800 }}
                    allowDecimals={false} width={isMobile ? 28 : 60}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                  <Legend
                    verticalAlign="top" height={legendHeight} iconType="square"
                    wrapperStyle={{ fontSize: legendFontSize, fontWeight: 800, color: COLORS.textMain }}
                  />
                  <Bar dataKey="female" name="Female" fill="url(#colorFemaleBar)" radius={[6, 6, 0, 0]} animationDuration={700} maxBarSize={isMobile ? 20 : 40}>
                    <LabelList dataKey="female" position="top" fill={COLORS.textMain} fontSize={barLabelFontSize} fontWeight="800" />
                  </Bar>
                  <Bar dataKey="male" name="Male" fill="url(#colorMaleBar)" radius={[6, 6, 0, 0]} animationDuration={700} maxBarSize={isMobile ? 20 : 40}>
                    <LabelList dataKey="male" position="top" fill={COLORS.textMain} fontSize={barLabelFontSize} fontWeight="800" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-8 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6">Overall Diversity</h3>
          <div className="flex-1 relative min-h-[260px] sm:min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <linearGradient id="pieMaleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#374151" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#111827" stopOpacity={1}/>
                  </linearGradient>
                  <linearGradient id="pieFemaleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7A0019" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#5C0013" stopOpacity={1}/>
                  </linearGradient>
                </defs>
                <Pie
                  data={[
                    { name: 'Male', value: activeTotalStats.male, color: "url(#pieMaleGrad)" },
                    { name: 'Female', value: activeTotalStats.female, color: "url(#pieFemaleGrad)" }
                  ]}
                  innerRadius="50%" outerRadius="75%" paddingAngle={3} dataKey="value" stroke="none"
                  animationDuration={700} animationEasing="ease-out"
                >
                  {[
                    { name: 'Male', color: "url(#pieMaleGrad)" },
                    { name: 'Female', color: "url(#pieFemaleGrad)" }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl sm:text-5xl font-black text-gray-900">{activeTotalStats.total}</span>
              <span className="text-xs sm:text-sm text-gray-600 font-bold uppercase tracking-widest mt-2">Total</span>
            </div>
          </div>
          <div className="flex justify-center gap-4 sm:gap-8 mt-4 sm:mt-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-4 h-4 rounded-md bg-gradient-to-b from-[#374151] to-[#111827] shadow-sm"></div>
              <span className="text-sm sm:text-base font-bold text-gray-900">Male ({activeTotalStats.malePercentage}%)</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-4 h-4 rounded-md bg-gradient-to-b from-[#7A0019] to-[#5C0013] shadow-sm"></div>
              <span className="text-sm sm:text-base font-bold text-gray-900">Female ({activeTotalStats.femalePercentage}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Undergraduate / Postgraduate Programs Section */}
      <div className="bg-white p-5 sm:p-10 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-10">
        <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-8 sm:mb-12 tracking-tight">{doughnutSectionTitle}</h3>
        <div className={`grid ${filter === "PG" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-10 lg:gap-24`}>
          <div className="flex flex-col items-center">
            <h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 sm:mb-8 tracking-wide">2027 Batch</h4>
            <DoughnutWithLegend data={doughnut2027Data} />
          </div>
          {filter === "UG" && (
            <div className="flex flex-col items-center">
              <h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 sm:mb-8 tracking-wide">2028 Batch</h4>
              <DoughnutWithLegend data={doughnut2028Data} />
            </div>
          )}
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6 mb-10">
        {/* <div className="bg-white p-4 sm:p-10 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 sm:mb-10">Total Strength Stacked</h3>
          <div className="h-[340px] sm:h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData} margin={stackedBarMargin} barSize={stackedBarSize}>
                <defs>
                  <linearGradient id="colorMaleStacked" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#111827" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#374151" stopOpacity={1}/>
                  </linearGradient>
                  <linearGradient id="colorFemaleStacked" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#5C0013" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#7A0019" stopOpacity={1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={COLORS.grid} strokeOpacity={0.6} />
                <XAxis
                  dataKey={xAxisKey} axisLine={false} tickLine={false} interval={0} height={xAxisTickHeight}
                  tick={(props) => <CustomizedAxisTick {...props} isMobile={isMobile} />}
                />
                <YAxis
                  axisLine={false} tickLine={false}
                  tick={{ fill: COLORS.textMain, fontSize: yAxisTickFontSize, fontWeight: 800 }}
                  allowDecimals={false} width={isMobile ? 28 : 60}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                <Legend
                  verticalAlign="top" height={legendHeight} iconType="square"
                  wrapperStyle={{ fontSize: legendFontSize, fontWeight: 800, color: COLORS.textMain }}
                />
                <Bar dataKey="male" name="Male" stackId="a" fill="url(#colorMaleStacked)" animationDuration={700}>
                  <LabelList dataKey="male" position="inside" fill="#fff" fontSize={isMobile ? 9 : 12} fontWeight="bold" />
                </Bar>
                <Bar dataKey="female" name="Female" stackId="a" fill="url(#colorFemaleStacked)" radius={[6, 6, 0, 0]} animationDuration={700}>
                  <LabelList dataKey="female" position="inside" fill="#fff" fontSize={isMobile ? 8 : 11} fontWeight="bold" />
                  <LabelList
                    content={(props) => {
                      const { x, y, width, index } = props;
                      const entry = filteredData[index];
                      if (!entry) return null;
                      return (
                        <text x={x + width / 2} y={y - totalLabelYOffset} textAnchor="middle" fill={COLORS.textMain} fontSize={totalLabelFontSize} fontWeight="800">
                          {entry.male}:{entry.female}
                        </text>
                      );
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div> */}

        <div className="bg-white p-4 sm:p-10 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10 gap-4">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900">Total Strength</h3>
            <div className="flex gap-3 sm:gap-6">
              <div className="flex items-center gap-2 sm:gap-3 bg-purple-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl">
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-md bg-gradient-to-r from-[#C084FC] to-[#7E22CE] shadow-sm"></div>
                <span className="text-sm sm:text-base font-black text-purple-900">UG Programs</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl">
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-md bg-gradient-to-r from-[#60A5FA] to-[#2563EB] shadow-sm"></div>
                <span className="text-sm sm:text-base font-black text-blue-900">PG Programs</span>
              </div>
            </div>
          </div>

          <div className="h-[480px] sm:h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                layout="vertical"
                data={[...filteredData].sort((a, b) => b.total - a.total)}
                margin={{ top: 40, right: isMobile ? 20 : 60, left: isMobile ? -10 : 30, bottom: 10 }}
                barSize={rankingBarSize}
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
                  type="number" orientation="top" axisLine={false} tickLine={false}
                  tick={{ fill: COLORS.textMain, fontSize: rankingXAxisFontSize, fontWeight: 800 }}
                />
                <YAxis
                  dataKey="shortName" type="category" axisLine={false} tickLine={false}
                  width={rankingYAxisWidth} interval={0}
                  tick={{ fill: COLORS.textMain, fontSize: rankingYAxisFontSize, fontWeight: 800 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                <Bar dataKey="total" name="Total Strength" radius={[0, 6, 6, 0]} animationDuration={700}>
                  <LabelList dataKey="total" position="right" fill={COLORS.textMain} fontSize={rankingLabelFontSize} fontWeight="800" />
                  {[...filteredData].sort((a, b) => b.total - a.total).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.category === 'UG' ? "url(#colorPgGrad)" : "url(#colorUgGrad)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Report Table */}
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="px-5 sm:px-8 py-5 sm:py-8 border-b border-gray-200 flex justify-between items-center bg-white">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900">Detailed Report</h3>
          <span className="text-sm sm:text-base font-black text-gray-700 bg-gray-100 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full">{filteredData.length} RECORDS</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#F8F9FA]">
              <tr>
                <th className="px-8 py-5 text-left text-sm font-black text-gray-600 uppercase tracking-widest">Program</th>
                <th className="px-8 py-5 text-left text-sm font-black text-gray-600 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-left text-sm font-black text-gray-600 uppercase tracking-widest">Total Students</th>
                <th className="px-8 py-5 text-left text-sm font-black text-gray-600 uppercase tracking-widest">Male</th>
                <th className="px-8 py-5 text-left text-sm font-black text-gray-600 uppercase tracking-widest">Female</th>
                <th className="px-8 py-5 text-left text-sm font-black text-gray-600 uppercase tracking-widest">Gender %</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredData.map((prog, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors duration-150">
                  <td className="px-8 py-5 whitespace-nowrap text-base font-bold text-gray-900">{prog.shortName}</td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-black tracking-wider ${
                      prog.category === 'UG' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {prog.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-base font-black text-gray-900">{prog.total}</td>
                  <td className="px-8 py-5 whitespace-nowrap text-base font-bold text-gray-700">{prog.male}</td>
                  <td className="px-8 py-5 whitespace-nowrap text-base font-bold text-[#7A0019]">{prog.female}</td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex flex-col gap-1.5 w-32">
                      <div className="flex justify-between text-xs font-black tracking-wider">
                        <span className="text-gray-900">{prog.malePercentage}%</span>
                        <span className="text-[#7A0019]">{prog.femalePercentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
                        <div className="h-full bg-gray-900" style={{ width: `${prog.malePercentage}%` }}></div>
                        <div className="h-full bg-[#7A0019]" style={{ width: `${prog.femalePercentage}%` }}></div>
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
  );
}