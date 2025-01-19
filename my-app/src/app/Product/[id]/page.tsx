// "use client";

// import { useState, useEffect } from "react";
// import { useCart } from "@/app/context/CartContext";

// const fetchProduct = async (productName: string) => {
//   const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
//   const data = await res.json();
//   return data.data.find((item: any) => item.productName === productName) || null;
// };

// export default function ProductPage({ params }: { params: { id: string } }) {
//   const [product, setProduct] = useState(null);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchData = async () => {
//       const productData = await fetchProduct(decodeURIComponent(params.id));
//       setProduct(productData);
//     };

//     fetchData();
//   }, [params.id]);

//   const handleAddToCart = () => {
//     if (product) {
//       addToCart({
//         productName: product.productName,
//         image: product.image,
//         price: product.price,
//         quantity: 1,
//       });
//     }
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="container mx-auto px-4 md:flex md:items-center">
//         <div className="w-full md:w-1/2 flex justify-center">
//           <img
//             src={product.image}
//             alt={product.productName}
//             width={500}
//             height={500}
//             className="rounded-lg"
//           />
//         </div>
//         <div className="md:w-1/2 mt-6 h-[413px] w-[374px] md:mt-0 md:pl-10">
//           <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
//           <p className="text-gray-700 mb-6">{product.description}</p>
//           <p className="text-2xl font-bold mb-6">₹{product.price.toLocaleString()}</p>
//           <button
//             onClick={handleAddToCart}
//             className="bg-black text-white px-6 py-3 text-sm font-medium rounded-lg hover:bg-gray-800"
//           >
//             Add To Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";

const fetchProduct = async (productName: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  // Check if data exists and is structured correctly
  if (!data?.data) {
    throw new Error("Invalid data structure");
  }

  return (
    data.data.find((item: any) => item.productName === productName) || null
  );
};

// Explicitly type the props
interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: any) {
  const [product, setProduct] = useState<any>(null); // Type this properly if you know the structure
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const productData = await fetchProduct(decodeURIComponent(params.id));
      setProduct(productData);
    };

    fetchData();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        productName: product.productName,
        image: product.image,
        price: product.price,
        quantity: 1,
      });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container mx-auto px-4 md:flex md:items-center">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.productName}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div className="md:w-1/2 mt-6 h-[413px] w-[374px] md:mt-0 md:pl-10">
          <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <p className="text-2xl font-bold mb-6">
            ₹{product.price.toLocaleString()}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 text-sm font-medium rounded-lg hover:bg-gray-800"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
