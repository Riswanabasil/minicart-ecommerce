import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

interface Props {
  addToCart: (product: Product) => void;
  search: string;
}

const Home = ({ addToCart, search }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 4;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
      {/* Font import only — no styling here */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body   { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="font-body min-h-screen bg-[#FAF7F2] text-[#1A1612]">

        {/* ── Header ── */}
        <header className="px-10 pt-14 pb-7 border-b border-[#E2D9CE] flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#C8553D]">
              Catalogue
            </span>
            <h1 className="font-display text-5xl font-semibold leading-none tracking-tight text-[#1A1612]">
              Products
            </h1>
          </div>
          <p className="text-sm font-light text-[#8A7F76] pb-1">
            {filteredProducts.length} items available
          </p>
        </header>

        {/* ── Category Pills ── */}
        <div className="px-10 py-4 border-b border-[#E2D9CE] flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#8A7F76] mr-2">
            Filter
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[13px] border transition-all duration-200 cursor-pointer
                ${category === cat
                  ? "bg-[#1A1612] border-[#1A1612] text-[#3D3530]"
                  : "bg-transparent border-[#E2D9CE] text-[#3D3530] hover:border-[#3D3530] hover:bg-[#F5F0E8]"
                }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* ── Product Grid ── */}
        <section className="px-10 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  addToCart={addToCart}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-24 text-[#8A7F76]">
                <span className="text-5xl opacity-40 mb-4">◎</span>
                <p className="font-display text-2xl font-medium text-[#3D3530] mb-2">
                  No products found
                </p>
                <p className="text-sm font-light">
                  Try adjusting your search or filter
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── Pagination ── */}
        <div className="px-10 pb-16 pt-2 border-t border-[#E2D9CE] flex items-center justify-center">
          <div className="flex items-center mt-8">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="w-11 h-11 flex items-center justify-center border border-[#E2D9CE] rounded-l-md text-[#3D3530] text-lg transition-all duration-200 hover:bg-[#F5F0E8] hover:border-[#3D3530] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              ←
            </button>

            <div className="h-11 px-5 flex items-center gap-1.5 border-t border-b border-[#E2D9CE] font-display text-lg font-medium text-[#1A1612]">
              <span className="text-[#C8553D] font-bold">{currentPage}</span>
              <span className="text-[#8A7F76] font-light">/</span>
              <span>{totalPages || 1}</span>
            </div>

            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="w-11 h-11 flex items-center justify-center border border-[#E2D9CE] rounded-r-md text-[#3D3530] text-lg transition-all duration-200 hover:bg-[#F5F0E8] hover:border-[#3D3530] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              →
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default Home;