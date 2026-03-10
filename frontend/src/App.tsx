
import './App.css'
import { useState } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Cart from "./components/Cart";
import type { Product } from "./types/product";

function App() {

  const [cart, setCart] = useState<Product[]>([]);
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  return (
    <div>

       <Header
      cartCount={cart.length}
      goHome={() => setPage("home")}
      goCart={() => setPage("cart")}
      search={search}
      setSearch={setSearch}
    />

    <main className="max-w-7xl mx-auto px-6 py-10">

      {page === "home" && (
        <Home
          addToCart={addToCart}
          search={search}
        />
      )}

      {page === "cart" && (
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          goHome={() => setPage("home")}
        />
      )}

    </main>

    </div>
  );
}

export default App;