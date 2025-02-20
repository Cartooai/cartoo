const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 h-full flex flex-col">
      {/* Product Image Placeholder */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <img src={product.imageUrl} alt={product.title} className="object-cover w-full h-full" />
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.productType}</p>

        {/* Recommendation Score */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-full bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${product.recommendation.score}%` }}
              />
            </div>
            <span className="text-sm font-medium">{product.recommendation.score}%</span>
          </div>
        </div>

        {/* Recommendation Reasoning */}
        <p className="text-sm text-gray-600 mb-4">{product.recommendation.reasoning}</p>

        <button className="bg-[#E6F48C] text-black p-4 w-full rounded-md font-medium hover:bg-black hover:text-white mt-auto">View more</button>
      </div>
    </div>

  );
};

export default ProductCard;