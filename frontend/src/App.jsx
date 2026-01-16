import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, User, BarChart2, CheckCircle, Users, X, Eye, ArrowRight, Layers } from 'lucide-react';

const API_URL = 'http://localhost:5000/api'; // Change to deployed URL

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        {/* Login Card - High Contrast */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center relative overflow-hidden">
          
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-20 h-20 rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/50">
            <Layers className="text-white" size={40} />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">CRM Portal</h2>
          <p className="text-slate-400 mb-8">Manage your leads with clarity.</p>
          
          <button 
            onClick={() => setIsAuthenticated(true)}
            className="w-full bg-white text-slate-900 font-bold py-4 rounded-xl btn-3d hover:bg-gray-100 flex items-center justify-center gap-2"
          >
            Enter Dashboard <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return <Dashboard />;
}

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [metrics, setMetrics] = useState({ total: 0, converted: 0, newLeads: 0 });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('date');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/analytics`).then(res => setMetrics(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [page, search, status, sort]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/leads`, {
        params: { page, limit: 10, search, status, sort }
      });
      setLeads(res.data.leads);
      setTotalPages(res.data.totalPages);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const getStatusStyle = (status) => {
    // High contrast badges
    switch(status) {
      case 'Qualified': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'Lost': return 'bg-rose-500/20 text-rose-400 border-rose-500/50';
      case 'Contacted': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans text-slate-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
              Dashboard
            </h1>
            <p className="text-slate-400 mt-1">Real-time lead analytics</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-800/80 px-5 py-2 rounded-full border border-slate-700 shadow-lg">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-500"></div>
            <span className="font-semibold text-white text-sm">Admin User</span>
          </div>
        </header>
        
        {/* Metrics - High Contrast Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <MetricCard 
            title="Total Leads" 
            value={metrics.total} 
            icon={<Users size={24} className="text-white" />} 
            gradient="from-blue-600 to-indigo-700"
          />
          <MetricCard 
            title="Converted" 
            value={metrics.converted} 
            icon={<CheckCircle size={24} className="text-white" />} 
            gradient="from-emerald-500 to-teal-700"
          />
          <MetricCard 
            title="New Opportunities" 
            value={metrics.newLeads} 
            icon={<BarChart2 size={24} className="text-white" />} 
            gradient="from-violet-600 to-purple-700"
          />
        </div>

        {/* Controls - Solid backgrounds for inputs */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-5 rounded-2xl shadow-xl mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-1/3 group">
            <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search name or email..." 
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <select 
              className="px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>

            <select 
              className="px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="date">Newest First</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* Table - High Contrast */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-950 border-b border-slate-700 text-slate-400 uppercase text-xs tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-5 text-left">Name</th>
                  <th className="px-6 py-5 text-left">Status</th>
                  <th className="px-6 py-5 text-left">Source</th>
                  <th className="px-6 py-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {loading ? (
                  <tr><td colSpan="4" className="text-center py-12 text-slate-400 animate-pulse">Syncing Data...</td></tr>
                ) : leads.map((lead, idx) => (
                  <tr 
                    key={lead._id} 
                    className="hover:bg-slate-800/50 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-white text-lg">{lead.name}</div>
                      <div className="text-sm text-slate-400">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border backdrop-blur-sm shadow-sm ${getStatusStyle(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{lead.source}</td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => setSelectedLead(lead)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700 transition-all hover:scale-110 active:scale-95 shadow-lg"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => p - 1)}
              className="px-5 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-all text-white"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-slate-300 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
              Page <span className="text-white">{page}</span> of {totalPages}
            </span>
            <button 
              disabled={page === totalPages} 
              onClick={() => setPage(p => p + 1)}
              className="px-5 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-all text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal - Solid Background for Readability */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-600 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative scale-100 animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-2xl"></div>
            <button 
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-full transition-all"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                 <User size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedLead.name}</h2>
                <p className="text-indigo-400 text-sm">Lead Details</p>
              </div>
            </div>
            
            <div className="space-y-4 bg-black/20 p-6 rounded-xl border border-slate-800">
              <DetailRow label="Email" value={selectedLead.email} />
              <DetailRow label="Phone" value={selectedLead.phone} />
              <DetailRow label="Source" value={selectedLead.source} />
              <DetailRow label="Status" value={
                 <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusStyle(selectedLead.status)}`}>
                   {selectedLead.status}
                 </span>
              } />
              <DetailRow label="Date" value={new Date(selectedLead.createdAt).toLocaleDateString()} />
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setSelectedLead(null)}
                className="btn-3d bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl w-full"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const MetricCard = ({ title, value, icon, gradient }) => (
  <div className={`relative p-6 rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-xl border border-white/10`}>
    {/* Background Gradient */}
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`}></div>
    
    <div className="relative z-10 flex items-center justify-between">
      <div>
        <p className="text-blue-100 font-semibold mb-1 opacity-90">{title}</p>
        <h3 className="text-4xl font-bold text-white drop-shadow-md tracking-tight">{value}</h3>
      </div>
      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md border border-white/20 shadow-inner">
        {icon}
      </div>
    </div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-slate-800 pb-3 last:border-0 last:pb-0">
    <span className="text-slate-400 text-sm font-medium">{label}</span>
    <span className="text-white text-sm font-bold tracking-wide">{value}</span>
  </div>
);

export default App;