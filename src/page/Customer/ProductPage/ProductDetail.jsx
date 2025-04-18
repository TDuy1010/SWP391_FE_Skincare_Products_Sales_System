import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Minus, Plus, Star, ShoppingBag } from "lucide-react";
import {
  getProductDetail,
  createProductFeedback,
} from "../../../service/product";
import { addItemToCart } from "../../../service/cart/cart";
import { toast } from "react-toastify";
import { useCart } from '../../../context/CartContext';

// Add TabButton component definition
const TabButton = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`pb-4 text-sm font-medium border-b-2 ${
      isActive
        ? "border-black text-black"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`}
  >
    {children}
  </button>
);

const ProductImages = ({ product, mainImage, setMainImage }) => (
  <div className="space-y-6">
    <div className="w-full h-[450px] md:h-[500px] bg-gray-50 rounded-lg overflow-hidden">
      <img
        src={product.thumbnail || mainImage}
        alt={product.name}
        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
      />
    </div>

    {product.images &&
      Array.isArray(product.images) &&
      product.images.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {[product.thumbnail, ...product.images]
            .filter(Boolean)
            .slice(0, 4)
            .map((img, idx) => (
              <button
                key={idx}
                className={`border rounded-md overflow-hidden h-20 ${
                  mainImage === img
                    ? "ring-2 ring-black"
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setMainImage(img)}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
        </div>
      )}
  </div>
);

const RatingStars = ({ rating = 5, totalRatings = 0, size = 16 }) => {
  const roundedRating = Math.round(rating * 2) / 2; // Làm tròn đến 0.5

  return (
    <div className="flex items-center">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((index) => {
          const difference = roundedRating - index;
          
          // Sao đầy
          if (difference >= 0) {
            return (
              <Star
                key={index}
                size={size}
                className="fill-amber-400 text-amber-400"
              />
            );
          }
          // Nửa sao
          else if (difference > -1 && difference < 0) {
            return (
              <div key={index} className="relative">
                <Star size={size} className="text-gray-300" />
                <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                  <Star size={size} className="fill-amber-400 text-amber-400" />
                </div>
              </div>
            );
          }
          // Sao rỗng
          return (
            <Star
              key={index}
              size={size}
              className="text-gray-300"
            />
          );
        })}
      </div>
      {totalRatings > 0 && (
        <span className="ml-2 text-sm text-gray-600">
          {roundedRating.toFixed(1)} ({totalRatings} đánh giá)
        </span>
      )}
    </div>
  );
};

// Add ReviewItem component definition
const ReviewItem = ({ review, onHelpful }) => (
  <div className="border-b border-gray-200 pb-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-900">{review.name}</p>
        <div className="mt-1">
          <RatingStars rating={review.rating} size={14} />
        </div>
      </div>
      <p className="text-sm text-gray-500">{review.date}</p>
    </div>
    <div className="mt-3">
      <p className="text-sm text-gray-600">{review.content}</p>
    </div>
    <div className="mt-3 flex items-center">
      <button
        onClick={() => onHelpful(review.id)}
        className="flex items-center text-sm text-gray-500 hover:text-gray-700"
      >
        <svg
          className="mr-1 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          />
        </svg>
        Helpful ({review.helpful})
      </button>
    </div>
  </div>
);

const ProductDetail = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");
  const { updateCartItemCount, refreshCart } = useCart();

  // Cập nhật productSpecs để chỉ chứa cấu trúc rỗng
  const [productSpecs, setProductSpecs] = useState({
    parameters: [],
    usage: [],
    ingredients: "",
  });

  // Remove review form states
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      rating: 5,
      date: "2025-01-15",
      content: "Sản phẩm rất tốt, làm da mình mềm mịn hơn sau 2 tuần sử dụng.",
      helpful: 12,
    },
    {
      id: 2,
      name: "Trần Thị B",
      rating: 4,
      date: "2025-02-01",
      content:
        "Mình khá hài lòng với sản phẩm này. Chỉ tiếc là giá hơi cao một chút.",
      helpful: 5,
    },
  ]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await getProductDetail(slug);
        if (!response.error) {
          setProduct(response.result);

          // Update productSpecs with data from API
          if (response.result.specification) {
            const specData = response.result.specification;
            const parameters = Object.entries(specData).map(([key, value]) => {
              // Map API keys to Vietnamese labels
              const nameMap = {
                origin: "Xuất xứ",
                brandOrigin: "Nguồn gốc thương hiệu",
                manufacturingLocation: "Nơi sản xuất",
                skinType: "Loại da",
              };

              return {
                name: nameMap[key] || key,
                value: value,
              };
            });

            setProductSpecs((prev) => ({
              ...prev,
              parameters,
              ingredients: response.result.ingredient || "",
              usage: response.result.usageInstruction
                ? [response.result.usageInstruction]
                : prev.usage,
            }));
          }
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra khi tải thông tin sản phẩm");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetail();
  }, [slug]);

  const handleAddToCart = async () => {
    try {
      const response = await addItemToCart(product.id, quantity);
      if (!response.error) {
        await refreshCart();
        toast.success("Thêm vào giỏ hàng thành công!");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
    }
  };

  const handleBuyNow = async () => {
    try {
      const response = await addItemToCart(product.id, quantity);
      if (!response.error) {
        await refreshCart();
        navigate("/cart");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
    }
  };

  // Add this helper function to safely render HTML content
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  // Remove review submission handlers
  const handleHelpful = (id) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, helpful: review.helpful + 1 } : review
      )
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Product Images */}
          <ProductImages
            product={product}
            mainImage={mainImage}
            setMainImage={setMainImage}
          />

          {/* Product Info */}
          <div className="flex flex-col space-y-6">
            {/* Brand & Category */}
            <div className="space-y-4">
              <div className="flex space-x-2 text-sm font-medium uppercase tracking-wider text-gray-500">
                <span>{product.brand?.name || "SKYN BEAUTY"}</span>
                <span>•</span>
                <span>{product.category?.name}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Price */}
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </span>
              </div>

              {/* Ratings */}
              <div className="flex items-center">
                <RatingStars 
                  rating={product.rating || 0} 
                  totalRatings={product.feedBacks?.length || 0}
                />
              </div>
            </div>

            {/* Availability */}
            <div className="py-4 border-t border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-700">Tình trạng:</span>
                {product.stock > 0 ? (
                  <span className="text-green-600">
                    Còn hàng ({product.stock} sản phẩm)
                  </span>
                ) : (
                  <span className="text-red-600">Hết hàng</span>
                )}
              </div>
              {/* Add expiration date display */}
              {product.expirationTime && (
                <div className="flex items-center space-x-2 mt-2">
                  <span className="font-medium text-gray-700">
                    Hạn sử dụng:
                  </span>
                  <span className="text-gray-600">
                    {new Date(product.expirationTime)
                      .toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .replace(/\//g, "/")}
                  </span>
                </div>
              )}
            </div>

            {/* Quantity and Cart - Moved up */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center border rounded-md p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 rounded-md"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value > 0) {
                        setQuantity(value);
                      } else if (e.target.value === "") {
                        setQuantity("");
                      }
                    }}
                    onBlur={() => {
                      if (quantity === "" || quantity < 1) {
                        setQuantity(1);
                      }
                    }}
                    className="w-12 text-center font-medium border-none focus:ring-0 focus:outline-none"
                  />
                  <button
                    onClick={() =>
                      setQuantity(quantity === "" ? 1 : quantity + 1)
                    }
                    className="p-2 hover:bg-gray-100 rounded-md"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center space-x-2 transition-colors"
                >
                  <ShoppingBag size={18} />
                  <span>THÊM VÀO GIỎ HÀNG</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-md font-medium transition-colors"
              >
                MUA NGAY
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-6 pt-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-6 overflow-x-auto pb-px">
                  <TabButton
                    isActive={activeTab === "description"}
                    onClick={() => setActiveTab("description")}
                  >
                    Mô tả
                  </TabButton>
                  <TabButton
                    isActive={activeTab === "parameters"}
                    onClick={() => setActiveTab("parameters")}
                  >
                    Thông số
                  </TabButton>
                  <TabButton
                    isActive={activeTab === "usage"}
                    onClick={() => setActiveTab("usage")}
                  >
                    Cách sử dụng
                  </TabButton>
                  <TabButton
                    isActive={activeTab === "ingredients"}
                    onClick={() => setActiveTab("ingredients")}
                  >
                    Thành phần
                  </TabButton>
                  <TabButton
                    isActive={activeTab === "reviews"}
                    onClick={() => setActiveTab("reviews")}
                  >
                    Đánh giá ({product.feedBacks?.length || 0})
                  </TabButton>
                </nav>
              </div>

              <div className="py-4">
                {/* Description Tab */}
                {activeTab === "description" && (
                  <div className="prose prose-sm max-w-none">
                    <div
                      dangerouslySetInnerHTML={createMarkup(
                        product.description
                      )}
                    />
                  </div>
                )}

                {/* Parameters Tab */}
                {activeTab === "parameters" && (
                  <div className="overflow-hidden bg-white">
                    <table className="min-w-full divide-y divide-gray-200">
                      <tbody className="divide-y divide-gray-200">
                        {productSpecs.parameters.map((param, idx) => (
                          <tr
                            key={idx}
                            className={
                              idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }
                          >
                            <td className="py-3 px-4 text-sm font-medium text-gray-900 w-1/3">
                              {param.name}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {param.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Usage Tab */}
                {activeTab === "usage" && (
                  <div className="space-y-4">
                    {product.usageInstruction ? (
                      <div
                        dangerouslySetInnerHTML={createMarkup(
                          product.usageInstruction
                        )}
                      />
                    ) : (
                      <ol className="list-decimal pl-5 space-y-2">
                        {productSpecs.usage.map((step, idx) => (
                          <li key={idx} className="text-gray-600">
                            {step}
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                )}

                {/* Ingredients Tab */}
                {activeTab === "ingredients" && (
                  <div className="space-y-4">
                    {product.ingredient ? (
                      <div
                        dangerouslySetInnerHTML={createMarkup(
                          product.ingredient
                        )}
                      />
                    ) : (
                      <p className="text-gray-600">
                        {productSpecs.ingredients}
                      </p>
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">
                        Đánh giá từ khách hàng
                      </h3>
                    </div>

                    {/* Reviews List - Use feedBacks from API */}
                    <div className="space-y-6">
                      {product.feedBacks && product.feedBacks.length > 0 ? (
                        product.feedBacks.map((feedback) => (
                          <div
                            key={feedback.id}
                            className="border-b border-gray-200 pb-6"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {feedback.userResponse.firstName}{" "}
                                  {feedback.userResponse.lastName}
                                </p>
                                <div className="mt-1">
                                  <RatingStars rating={feedback.rating} size={14} />
                                </div>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-sm text-gray-600">
                                {feedback.description}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">
                          Chưa có đánh giá nào cho sản phẩm này.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery & Returns */}
            <div className="pt-6 space-y-3">
              <h3 className="text-xl font-semibold text-gray-800">
                Giao hàng & Đổi trả
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Giao hàng miễn phí cho đơn hàng từ 500.000đ. Đổi trả miễn phí
                trong vòng 30 ngày nếu sản phẩm còn nguyên vẹn và có hóa đơn mua
                hàng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
