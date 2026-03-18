const StatsCard = ({ label, value, type, onClick }) => {
  const config = {
    total: { border: "border-l-[#0073BB]", dot: "bg-[#0073BB]" },
    success: { border: "border-l-[#1D8102]", dot: "bg-[#1D8102]" },
    warning: { border: "border-l-[#D13212]", dot: "bg-[#D13212]" },
  };

  const style = config[type] || config.total;

  return (
    <div
      onClick={onClick}
      className={`bg-white p-5 border border-[#D5DBDB] border-l-4 ${style.border} shadow-sm transition-all hover:shadow-md group`}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">
          {label}
        </span>
        <div
          className={`w-1.5 h-1.5 rounded-full ${style.dot} opacity-50 group-hover:opacity-100 transition-opacity`}
        ></div>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-black text-[#232F3E] tracking-tighter">
          {value}
        </span>
        <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">
          Units
        </span>
      </div>
    </div>
  );
};

export default StatsCard;
