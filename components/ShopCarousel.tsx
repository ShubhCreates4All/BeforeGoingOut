import React from 'react';
import { Product } from '../types';
import { ExternalLink, ShoppingBag, ArrowRight } from 'lucide-react';

interface Props {
  products: Product[];
}

const ShopCarousel: React.FC<Props> = ({ products }) => {
  return (
    <div className="w-full mt-12 pt-8 border-t border-slate-200">
      <div className="flex items-center justify-between mb-6 px-1">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <ShoppingBag className="text-slate-400" size={20} />
          Shop the Look
        </h3>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
          View all <ArrowRight size={14} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="h-40 bg-slate-100 relative overflow-hidden">
               <img 
                 src={`https://picsum.photos/seed/${product.id}/400/300`} 
                 alt={product.name}
                 className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
               />
               <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
                 {product.price}
               </div>
            </div>
            
            <div className="p-5">
              <h4 className="text-slate-800 text-sm font-bold truncate mb-3">{product.name}</h4>
              <button className="w-full py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                Buy Now <ExternalLink size={12} className="opacity-50" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCarousel;