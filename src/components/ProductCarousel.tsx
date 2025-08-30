"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";

const products = [
  {
    name: "Vitamin D3 5000 IU",
    price: "$14.99",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    link: "https://www.amazon.com/dp/B07Z5QJZCL?tag=youraffiliatetag-20",
  },
  {
    name: "Vitamin C 1000mg",
    price: "$12.49",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    link: "https://www.amazon.com/dp/B01N6S4A2U?tag=youraffiliatetag-20",
  },
  {
    name: "Multivitamin for Women",
    price: "$19.99",
    image: "https://images.pexels.com/photos/3683077/pexels-photo-3683077.jpeg?auto=compress&w=400&q=80",
    link: "https://www.amazon.com/dp/B00JM1GC9K?tag=youraffiliatetag-20",
  },
  {
    name: "Omega-3 Fish Oil",
    price: "$16.99",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    link: "https://www.amazon.com/dp/B00O2LNEV8?tag=youraffiliatetag-20",
  },
];

const ProductCarousel = () => {
  const { t } = useI18n();
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {t('products.featured') !== 'products.featured' ? t('products.featured') : 'Featured Products'}
        </h2>
        <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-thin scrollbar-thumb-gray-300">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="min-w-[250px] bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow flex-shrink-0 border border-gray-100"
            >
              <div className="w-full h-48 relative bg-white rounded-t-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded-t-lg"
                  sizes="(max-width: 768px) 80vw, 250px"
                  priority={idx === 0}
                />
              </div>
              <div className="p-4 flex flex-col items-center">
                <h3 className="font-semibold text-lg mb-2 text-center">{product.name}</h3>
                <p className="text-green-600 font-bold mb-2">{product.price}</p>
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded transition-colors"
                >
                  {t('products.viewOnAmazon')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
