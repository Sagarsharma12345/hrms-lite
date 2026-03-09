import { Menu } from "lucide-react";

const TopNav = ({ setIsSidebarOpen }) => {
  return (
    <header className="h-14 bg-[#232F3E] sticky top-0 z-[60] px-4 md:px-8 flex items-center justify-between text-white shadow-md">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden p-1.5 text-[#FF9900] hover:bg-white/10 rounded-md transition-colors"
        >
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
};

export default TopNav;
