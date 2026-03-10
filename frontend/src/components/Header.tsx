
interface Props {
  cartCount: number;
  goHome: () => void;
  goCart: () => void;
  search: string;
  setSearch: (value: string) => void;
}

const Header = ({ cartCount, goHome, goCart, search, setSearch }: Props) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }
      `}</style>

  <header className="w-full bg-[#e7e1db] border-b">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* ── Brand ── */}
          <button
            onClick={goHome}
            className="font-display text-xl font-semibold text-[#1A1612] hover:text-[#C8553D] transition-colors duration-200 cursor-pointer bg-transparent border-none outline-none shrink-0 tracking-tight"
          >
            MiniCart
          </button>

          {/* ── Search ── */}
          <div className="relative w-52 shrink-0">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A7F76] pointer-events-none text-sm">
              ⌕
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-md border border-[#E2D9CE] bg-[#F5F0E8] text-[#1A1612] text-[13px] font-light placeholder-[#8A7F76] focus:outline-none focus:border-[#8A7F76] focus:bg-white transition-all duration-200"
            />
          </div>

          {/* ── Nav ── */}
          <nav className="flex items-center gap-2 shrink-0">
            <button
              onClick={goHome}
              className="px-4 py-1.5 text-[13px] font-medium text-[#3D3530] rounded-md hover:bg-[#F0EBE3] hover:text-[#1A1612] transition-all duration-200 cursor-pointer bg-transparent border border-[#E2D9CE] outline-none tracking-wide"
            >
              Home
            </button>

            <button
              onClick={goCart}
              className="px-4 py-1.5 text-[13px] font-medium text-[#3D3530] bg-[#1A1612] rounded-md hover:bg-[#C8553D] transition-all duration-200 cursor-pointer border-none outline-none tracking-wide flex items-center gap-2"
            >
              <span>Cart</span>
              {cartCount > 0 ? (
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#C8553D] text-[#FAF7F2] text-[9px] font-bold ring-1 ring-white">
                  {cartCount}
                </span>
              ) : (
                <span className="text-[#8A7F76] text-[11px]">0</span>
              )}
            </button>
          </nav>

        </div>
      </header>
    </>
  );
};

export default Header;