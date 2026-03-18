import { Menu } from "lucide-react";

const TopNav = ({ setIsSidebarOpen }) => {
  return (
    <header className="h-14 bg-white sticky top-0 z-[60] px-4 md:px-8 flex items-center justify-between text-[#1F2937] border-b border-[#E5E7EB] shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden p-1.5 text-[#4B5563] hover:bg-[#F3F4F6] rounded-md transition-colors"
        >
          <Menu size={22} />
        </button>
      </div>

      <div className="flex items-center"></div>
    </header>
  );
};

export default TopNav;
