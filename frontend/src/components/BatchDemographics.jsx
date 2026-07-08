import React, { useState, useMemo } from 'react';
import { Search, Users, ArrowUpDown, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';

const demographicsData = [
  // UG
  { program: 'B.Tech CSE', type: 'UG', batch: '2027', male: 169, female: 44, total: 213 },
  { program: 'B.Tech CSE', type: 'UG', batch: '2028', male: 106, female: 26, total: 132 },
  { program: 'B.Tech Mathematics & Computing', type: 'UG', batch: '2027', male: 43, female: 13, total: 56 },
  { program: 'B.Tech Mathematics & Computing', type: 'UG', batch: '2028', male: 46, female: 12, total: 58 },
  { program: 'B.Tech AIML', type: 'UG', batch: '2027', male: 42, female: 14, total: 56 },
  { program: 'B.Tech AIML', type: 'UG', batch: '2028', male: 48, female: 12, total: 60 },
  { program: 'B.Tech Information Technology', type: 'UG', batch: '2027', male: 114, female: 28, total: 142 },
  { program: 'B.Tech Information Technology', type: 'UG', batch: '2028', male: 49, female: 16, total: 65 },
  { program: 'B.Tech IIOT', type: 'UG', batch: '2027', male: 46, female: 12, total: 58 },
  { program: 'B.Tech IIOT', type: 'UG', batch: '2028', male: 50, female: 10, total: 60 },
  { program: 'B.Tech ECE', type: 'UG', batch: '2027', male: 114, female: 26, total: 140 },
  { program: 'B.Tech ECE', type: 'UG', batch: '2028', male: 96, female: 24, total: 120 },
  { program: 'B.Tech EE', type: 'UG', batch: '2027', male: 110, female: 26, total: 136 },
  { program: 'B.Tech EE', type: 'UG', batch: '2028', male: 96, female: 24, total: 120 },
  { program: 'B.Tech Mechanical', type: 'UG', batch: '2027', male: 107, female: 25, total: 132 },
  { program: 'B.Tech Mechanical', type: 'UG', batch: '2028', male: 83, female: 22, total: 105 },

  // PG
  { program: 'MCA', type: 'PG', batch: '2027', male: 73, female: 18, total: 91 },
  { program: 'MCA', type: 'PG', batch: '2028', male: 81, female: 25, total: 106 }
];

const COLORS = {
  male: '#1f2937', // gray-800
  female: '#7A0019', // primary brand color
};

const programKeywords = {
  'B.Tech CSE': 'computer science engineering computing software programming coding cs cse ce',
  'B.Tech Information Technology': 'information technology computer computing software programming coding it',
  'MCA': 'computer application computing software programming coding mca',
  'B.Tech ECE': 'electronics communication engineering ece ec vlsi embedded elec',
  'B.Tech EE': 'electrical engineering ee elec',
  'B.Tech Mechanical': 'mechanical engineering mechan me transportation',
  'B.Tech Civil': 'civil engineering ce structure geotech',
  'B.Tech Mathematics & Computing': 'mathematics math computing computer mnc mac',
  'B.Tech AIML': 'artificial intelligence machine learning ai ml aiml',
  'B.Tech PIE': 'production industrial engineering pie',
  'B.Tech IIOT': 'industrial internet things iiot',
};

const isFuzzyMatch = (str, pattern) => {
  if (!pattern) return true;
  pattern = pattern.split('').join('.*?');
  const re = new RegExp(pattern, 'i');
  return re.test(str);
};

const getSearchScore = (program, query) => {
  if (!query) return 1;
  const q = query.toLowerCase().trim();
  const p = program.toLowerCase();
  
  let score = 0;
  if (p === q) score += 100;
  else if (p.startsWith(q)) score += 50;
  else if (p.includes(q)) score += 20;

  let correctedQ = q;
  if (q === 'computr' || q === 'comput') correctedQ = 'computer';
  if (q === 'mathmatics' || q === 'maths' || q === 'math') correctedQ = 'mathematics';
  if (q === 'mechnical' || q === 'mechan') correctedQ = 'mechanical';
  if (q === 'elec') correctedQ = 'electrical';

  const keywords = (programKeywords[program] || '').toLowerCase();
  
  if (keywords.includes(correctedQ)) {
    score += 10;
  } else {
    const qWords = correctedQ.split(' ');
    let wordMatchCount = 0;
    qWords.forEach(word => {
      if (word.length > 1 && keywords.includes(word)) {
        score += 5;
        wordMatchCount++;
      }
    });
    if (wordMatchCount === qWords.length && qWords.length > 1) {
      score += 15;
    }
  }

  if (score === 0 && isFuzzyMatch(p + ' ' + keywords, correctedQ)) {
    score += 1;
  }

  return score;
};

export default function BatchDemographics() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState('2027');
  const [programType, setProgramType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'total', direction: 'desc' });

  const batches = ['2027', '2028'];
  const programTypes = ['All', 'UG', 'PG'];

  const uniquePrograms = useMemo(() => {
    return Array.from(new Set(demographicsData.map(d => d.program)));
  }, []);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    return uniquePrograms
      .map(p => ({ program: p, score: getSearchScore(p, searchQuery) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.program)
      .filter(p => p !== searchQuery);
  }, [searchQuery, uniquePrograms]);

  const filteredData = useMemo(() => {
    return demographicsData.filter(item => {
      // Batch logic: Filter by explicit batch property
      if (item.batch !== selectedBatch) return false;
      
      // Program Type logic
      if (programType !== 'All' && item.type !== programType) return false;
      
      // Search logic
      if (searchQuery) {
        if (getSearchScore(item.program, searchQuery) === 0) return false;
      }
      
      return true;
    }).map(item => ({
      ...item,
      searchScore: searchQuery ? getSearchScore(item.program, searchQuery) : 1,
      femalePercent: ((item.female / item.total) * 100).toFixed(1)
    }));
  }, [selectedBatch, programType, searchQuery]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    
    if (searchQuery) {
      sortableItems.sort((a, b) => b.searchScore - a.searchScore);
    } else if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig, searchQuery]);

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) return <ArrowUpDown className="w-4 h-4 ml-1 inline text-gray-400" />;
    return sortConfig.direction === 'asc' ? 
      <ArrowUp className="w-4 h-4 ml-1 inline text-[#7A0019]" /> : 
      <ArrowDown className="w-4 h-4 ml-1 inline text-[#7A0019]" />;
  };

  const summary = useMemo(() => {
    const totals = filteredData.reduce(
      (acc, curr) => {
        acc.total += curr.total;
        acc.ug += curr.type === 'UG' ? curr.total : 0;
        acc.pg += curr.type === 'PG' ? curr.total : 0;
        acc.male += curr.male;
        acc.female += curr.female;
        return acc;
      },
      { total: 0, ug: 0, pg: 0, male: 0, female: 0 }
    );
    totals.malePercent = totals.total > 0 ? ((totals.male / totals.total) * 100).toFixed(1) : 0;
    totals.femalePercent = totals.total > 0 ? ((totals.female / totals.total) * 100).toFixed(1) : 0;
    return totals;
  }, [filteredData]);

  const pieData = [
    { name: 'Male', value: summary.male },
    { name: 'Female', value: summary.female },
  ];

  return (
    <div className="mt-20 pt-16 border-t border-gray-200">
      
      {/* Collapsible Card Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300">
        
        {/* Accordion Header */}
        <div 
          className="px-6 py-5 cursor-pointer hover:bg-gray-50 flex justify-between items-center transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsExpanded(!isExpanded); } }}
          aria-expanded={isExpanded}
          aria-controls="demographics-content"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <h2 className="text-xl font-bold text-gray-900">
                Batch Strength Demographics
              </h2>
            </div>
            <p className="text-gray-500 text-sm mt-1 ml-9">View student demographics by batch, branch, and gender</p>
          </div>
          <div className="text-gray-400">
            <ChevronDown 
              className={`w-6 h-6 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            />
          </div>
        </div>

        {/* Collapsible Content */}
        <div 
          id="demographics-content"
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
          <div className="overflow-hidden">
            <div className="px-6 pt-6 pb-6 border-t border-gray-100">

              {/* Filters */}
              <div className="flex flex-col sm:flex-row justify-end mb-8 gap-3 w-full">
                {/* Search */}
                <div 
                  className="relative z-50" 
                  onFocus={() => setShowSuggestions(true)} 
                  onBlur={() => setShowSuggestions(false)}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#7A0019] focus:border-transparent outline-none transition"
                    placeholder="Search program..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {searchSuggestions.map(prog => (
                        <li 
                          key={prog} 
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setSearchQuery(prog);
                            setShowSuggestions(false);
                          }}
                        >
                          {prog}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Program Type Filter */}
                <div className="inline-flex bg-gray-100 rounded-lg p-1 overflow-x-auto max-w-full scrollbar-hide">
                  {programTypes.map(pt => (
                    <button
                      key={pt}
                      onClick={() => setProgramType(pt)}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                        programType === pt
                          ? 'bg-white shadow-sm text-[#7A0019]'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {pt}
                    </button>
                  ))}
                </div>

                {/* Batch Filter */}
                <div className="inline-flex bg-gray-100 rounded-lg p-1 overflow-x-auto max-w-full scrollbar-hide">
                  {batches.map(batch => (
                    <button
                      key={batch}
                      onClick={() => setSelectedBatch(batch)}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                        selectedBatch === batch
                          ? 'bg-white shadow-sm text-[#7A0019]'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {batch}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <p className="text-sm text-gray-500 font-medium mb-1">Total Students</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-gray-900">{summary.total}</h3>
            <Users className="w-5 h-5 text-gray-400 mb-1" />
          </div>
          <div className="mt-2 text-xs text-gray-500 flex gap-3">
            <span><strong className="text-gray-700">{summary.ug}</strong> UG</span>
            <span><strong className="text-gray-700">{summary.pg}</strong> PG</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <p className="text-sm text-gray-500 font-medium mb-1">Male Students</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-gray-800">{summary.male}</h3>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            <strong className="text-gray-700">{summary.malePercent}%</strong> of total
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-5">
          <p className="text-sm text-gray-500 font-medium mb-1">Female Students</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-[#7A0019]">{summary.female}</h3>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            <strong className="text-[#7A0019]">{summary.femalePercent}%</strong> of total
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-5 flex items-center justify-center">
          <div className="w-full h-full flex flex-col items-center justify-center">
             <div className="flex w-full h-2 rounded-full overflow-hidden bg-gray-100 mb-2">
               <div style={{ width: `${summary.malePercent}%` }} className="bg-gray-800 h-full"></div>
               <div style={{ width: `${summary.femalePercent}%` }} className="bg-[#7A0019] h-full"></div>
             </div>
             <div className="flex justify-between w-full text-xs font-medium">
               <span className="text-gray-800">{summary.malePercent}% M</span>
               <span className="text-[#7A0019]">{summary.femalePercent}% F</span>
             </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart 1: Grouped Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Gender Distribution by Program</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedData} margin={{ top: 5, right: 0, left: -20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="program" 
                  tick={{ fontSize: 10, fill: '#6b7280' }} 
                  angle={-45} 
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }}/>
                <Bar dataKey="male" name="Male" fill={COLORS.male} radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="female" name="Female" fill={COLORS.female} radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Doughnut Chart */}
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Overall Diversity</h3>
          <div className="flex-grow flex items-center justify-center h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={COLORS.male} />
                  <Cell fill={COLORS.female} />
                </Pie>
                <RechartsTooltip 
                  formatter={(value) => [`${value} Students`, '']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-gray-900">{summary.total}</span>
              <span className="text-xs text-gray-500 font-medium">Total</span>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-800"></div>
              <span className="text-sm text-gray-600 font-medium">Male ({summary.malePercent}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#7A0019]"></div>
              <span className="text-sm text-gray-600 font-medium">Female ({summary.femalePercent}%)</span>
            </div>
          </div>
        </div>

        {/* Chart 3: Stacked Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 lg:col-span-3">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Total Strength Stacked</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedData} layout="horizontal" margin={{ top: 5, right: 0, left: -20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="program" 
                  tick={{ fontSize: 10, fill: '#6b7280' }} 
                  angle={-45} 
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }}/>
                <Bar dataKey="male" name="Male" stackId="a" fill={COLORS.male} maxBarSize={40} />
                <Bar dataKey="female" name="Female" stackId="a" fill={COLORS.female} radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Horizontal Bar Chart (Ranking) */}
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 lg:col-span-3">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Program Ranking by Total Strength</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={[...sortedData].sort((a, b) => b.total - a.total)} 
                layout="vertical" 
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis 
                  type="category" 
                  dataKey="program" 
                  tick={{ fontSize: 10, fill: '#4b5563' }} 
                  axisLine={false} 
                  tickLine={false} 
                  width={100}
                  tickFormatter={(tickItem) => {
                    if (!tickItem) return '';
                    let short = tickItem.replace('B.Tech ', '').replace('M.Tech ', '').replace(' Information Technology', 'IT');
                    return short.length > 14 ? short.substring(0, 12) + '..' : short;
                  }}
                />
                <RechartsTooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="total" name="Total Students" fill="#9ca3af" radius={[0, 4, 4, 0]} maxBarSize={20}>
                  {
                    [...sortedData].sort((a, b) => b.total - a.total).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.type === 'UG' ? '#3b82f6' : '#8b5cf6'} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600 font-medium">UG Programs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm text-gray-600 font-medium">PG Programs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-900">Detailed Report</h3>
          <span className="text-sm text-gray-500 font-medium">{filteredData.length} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
            <thead>
              <tr className="bg-white border-b border-gray-200">
                <th className="px-6 py-4 font-semibold text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition" onClick={() => requestSort('program')}>
                  Program {getSortIcon('program')}
                </th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition" onClick={() => requestSort('type')}>
                  Category {getSortIcon('type')}
                </th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition" onClick={() => requestSort('total')}>
                  Total Students {getSortIcon('total')}
                </th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition" onClick={() => requestSort('male')}>
                  Male {getSortIcon('male')}
                </th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition" onClick={() => requestSort('female')}>
                  Female {getSortIcon('female')}
                </th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition" onClick={() => requestSort('femalePercent')}>
                  Female % {getSortIcon('femalePercent')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {row.program}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${row.type === 'UG' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                    {row.total}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {row.male}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#7A0019] font-medium">
                    {row.female}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="w-8">{row.femalePercent}%</span>
                      <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full bg-[#7A0019]" style={{ width: `${row.femalePercent}%` }}></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {sortedData.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
