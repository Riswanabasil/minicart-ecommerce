import type { Product } from "../types/product";

interface Props {
  cart: Product[];
  removeFromCart: (index: number) => void;
  goHome: () => void;
}

const Cart = ({ cart, removeFromCart, goHome }: Props) => {
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="font-body min-h-screen bg-[#FAF7F2] text-[#1A1612]">
       <div className="w-full">

          {/* ── Page Header ── */}
          <div className="pt-14 pb-7 border-b border-[#E2D9CE] flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#C8553D]">
                Review
              </span>
              <h1 className="font-display text-5xl font-semibold leading-none tracking-tight text-[#1A1612]">
                Your Cart
              </h1>
            </div>

            <button
              onClick={goHome}
              className="flex items-center gap-2 text-[13px] font-medium text-[#3D3530] border border-[#E2D9CE] px-4 py-2 rounded-md hover:bg-[#F0EBE3] hover:border-[#3D3530] transition-all duration-200 cursor-pointer bg-transparent outline-none pb-1"
            >
              ← Continue Shopping
            </button>
          </div>

          {/* ── Empty State ── */}
          {cart.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-[#8A7F76]">
              <span className="text-5xl opacity-40 mb-4">◎</span>
              <p className="font-display text-2xl font-medium text-[#3D3530] mb-2">Your cart is empty</p>
              <p className="text-sm font-light mb-6">Add some products to get started</p>
              <button
                onClick={goHome}
                className="px-6 py-2 text-[13px] font-medium text-[#FAF7F2] bg-[#1A1612] rounded-md hover:bg-[#C8553D] transition-colors duration-200 cursor-pointer border-none outline-none"
              >
                Browse Products
              </button>
            </div>
          )}

          {/* ── Cart Items ── */}
          {cart.length > 0 && (
            <div className="py-8 flex flex-col lg:flex-row gap-10 items-start">

              {/* Items list */}
              <div className="flex-1 flex flex-col gap-3">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white border border-[#E2D9CE] rounded-xl px-4 py-3 hover:shadow-[0_4px_16px_rgba(26,22,18,0.07)] transition-shadow duration-200"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#F5F0E8] shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-[17px] font-semibold text-[#1A1612] leading-tight truncate">
                        {item.name}
                      </h4>
                      <p className="text-[12px] font-medium tracking-[0.1em] uppercase text-[#8A7F76] mt-0.5">
                        {item.category}
                      </p>
                    </div>

                    {/* Price */}
                    <span className="font-display text-xl font-bold text-[#1A1612] shrink-0">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(index)}
                      className="ml-2 w-8 h-8 flex items-center justify-center rounded-full border border-[#E2D9CE] text-[#8A7F76] hover:border-[#C8553D] hover:text-[#C8553D] hover:bg-[#FDF0EE] transition-all duration-200 cursor-pointer bg-transparent outline-none text-lg leading-none shrink-0"
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* ── Order Summary ── */}
              <div className="w-full lg:w-72 shrink-0 bg-white border border-[#E2D9CE] rounded-xl overflow-hidden sticky top-6">
                <div className="px-6 py-4 border-b border-[#E2D9CE]">
                  <h2 className="font-display text-xl font-semibold text-[#1A1612]">Order Summary</h2>
                </div>

                <div className="px-6 py-4 flex flex-col gap-3">
                  <div className="flex justify-between text-[13px] text-[#3D3530]">
                    <span className="font-light">Subtotal ({cart.length} item{cart.length > 1 ? "s" : ""})</span>
                    <span className="font-medium">₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-[13px] text-[#3D3530]">
                    <span className="font-light">Shipping</span>
                    <span className="font-medium text-[#C8553D]">Free</span>
                  </div>

                  <div className="border-t border-[#E2D9CE] pt-3 flex justify-between items-end">
                    <span className="text-[13px] font-medium text-[#3D3530]">Total</span>
                    <span className="font-display text-2xl font-bold text-[#1A1612]">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <button className="w-full py-2.5 text-[13px] font-medium tracking-wide text-[#3D3530] bg-[#1A1612] rounded-md hover:bg-[#C8553D] transition-colors duration-200 cursor-pointer border-none outline-none">
                    Checkout
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Cart;