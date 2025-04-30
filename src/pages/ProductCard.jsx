const ProductCard = ({ product }) => {
  const imageLink = product?.imageLink || "";
  const title = product?.title || "";
  const description = product?.description || "";
  const priceAmount = product?.price?.amount ?? "";
  const priceCurrency = product?.price?.currency ?? "";
  const clickUrl = product?.linkCode?.clickUrl || "#";

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 h-full flex flex-col">
      {/* Product Image */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        {imageLink ? (
          <img
            src={imageLink}
            alt={title}
            className="object-contain w-full h-full"
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-sm font-semibold mb-2">{title}</h3>
        {/* <p className="text-sm text-gray-600 mb-2">{description}</p> */}

        <p className="text-sm font-bold mb-4">
          {priceAmount} {priceCurrency}
        </p>

        <a
          href={clickUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#E6F48C] text-black p-4 w-full rounded-md font-medium hover:bg-black hover:text-white mt-auto text-center"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
