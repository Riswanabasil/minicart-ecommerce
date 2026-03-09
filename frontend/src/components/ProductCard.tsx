import type { Product } from "../types/product";

interface Props {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard = ({ product, addToCart }: Props) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }
        .card-img { transition: transform 0.4s ease; }
        .product-card:hover .card-img { transform: scale(1.04); }
      `}</style>

      <div className="font-body product-card group border border-[#E2D9CE] rounded-xl bg-white flex flex-col overflow-hidden hover:shadow-[0_8px_32px_rgba(26,22,18,0.10)] transition-shadow duration-300">

        {/* ── Image ── */}
        <div className="relative overflow-hidden bg-[#F5F0E8] h-48">
          <img
            src={product.image}
            alt={product.name}
            className="card-img h-full w-full object-cover"
          />
          {/* Category pill over image */}
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#FAF7F2]/90 border border-[#E2D9CE] text-[10px] font-medium tracking-[0.12em] uppercase text-[#8A7F76]">
            {product.category}
          </span>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col flex-1 px-4 pt-4 pb-5 gap-3">

          <div className="flex flex-col gap-0.5">
            <h3 className="font-display text-[19px] font-semibold leading-snug text-[#1A1612] tracking-tight">
              {product.name}
            </h3>
          </div>

          <div className="flex items-end justify-between mt-auto pt-2 border-t border-[#F0EBE3]">
            <span className="font-display text-2xl font-bold text-[#1A1612] leading-none">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            <button
              onClick={() => addToCart(product)}
              className=" px-4 py-1.5 text-[12px] font-medium tracking-wide text-[#3D3530] bg-[#1A1612] rounded-md hover:bg-[#C8553D] transition-colors duration-200 cursor-pointer border-none outline-none"
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProductCard;