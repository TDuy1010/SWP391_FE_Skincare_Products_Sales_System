/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Minus, Plus, Heart, Star, ShoppingBag } from "lucide-react";
import { getProductDetail } from "../../../service/product/index";
import { addItemToCart } from "../../../service/cart/cart";
import imgProduct from "../../../assets/Rectangle 3.png";
import { toast } from "react-toastify";

// Components tách biệt để tăng tính tái sử dụng và dễ đọc
const ProductImages = ({ product, mainImage, setMainImage }) => (
  <div className="space-y-6">
    <div className="w-full h-[450px] md:h-[500px] bg-gray-50 rounded-lg overflow-hidden">
      <img
        src={product.thumbnail || mainImage}
        alt={product.name}
        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
      />
    </div>
    
    {product.images && Array.isArray(product.images) && product.images.length > 0 && (
      <div className="grid grid-cols-4 gap-2">
        {[product.thumbnail, ...product.images].filter(Boolean).slice(0, 4).map((img, idx) => (
          <button 
            key={idx} 
            className={`border rounded-md overflow-hidden h-20 ${mainImage === img ? 'ring-2 ring-black' : 'opacity-70 hover:opacity-100'}`}
            onClick={() => setMainImage(img)}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    )}
  </div>
);

const RatingStars = ({ rating = 5, size = 16 }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        className={i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}
      />
    ))}
  </div>
);

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

const ReviewItem = ({ review, onHelpful }) => (
  <div className="border-b border-gray-200 pb-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-900">{review.name}</p>
        <div className="mt-1"><RatingStars rating={review.rating} size={14} /></div>
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
        <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(imgProduct);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  
  // Product specifications (mẫu dữ liệu, sẽ được thay thế bằng dữ liệu API)
  const [productSpecs] = useState({
    parameters: [
      { name: "Skin Type", value: "All Skin Types" },
      { name: "Product Type", value: "Serum" },
      { name: "Texture", value: "Lightweight, Non-greasy" },
      { name: "Size", value: "30ml" },
      { name: "Country of Origin", value: "Korea" }
    ],
    usage: [
      "Apply 2-3 drops to clean, dry skin",
      "Gently pat into face and neck",
      "Allow to absorb before applying moisturizer",
      "Use morning and evening for best results",
      "Avoid direct contact with eyes"
    ],
    ingredients: "Water, Butylene Glycol, Glycerin, Niacinamide, Pentylene Glycol, 1,2-Hexanediol, Sodium Hyaluronate, Hydroxyethylcellulose, Tocopherol, Carbomer, Panthenol, Allantoin, Arginine, Ethylhexylglycerin, Adenosine, Hydrolyzed Hyaluronic Acid, Sodium Acetylated Hyaluronate"
  });
  
  // Review states
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    content: "",
    rating: 5
  });
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      rating: 5,
      date: "2025-01-15",
      content: "Sản phẩm rất tốt, làm da mình mềm mịn hơn sau 2 tuần sử dụng. Mùi hương nhẹ nhàng và thấm nhanh không gây nhờn rít.",
      helpful: 12
    },
    {
      id: 2,
      name: "Trần Thị B",
      rating: 4,
      date: "2025-02-01",
      content: "Mình khá hài lòng với sản phẩm này. Chỉ tiếc là giá hơi cao một chút.",
      helpful: 5
    }
  ]);

  // Fetch product data
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await getProductDetail(slug);
        if (!response.error) {
          setProduct(response.result);
          if (response.result.thumbnail) {
            setMainImage(response.result.thumbnail);
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

  // Handle form input changes
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    try {
      const response = await addItemToCart(product.id, quantity);
      if (!response.error) {
        toast.success("Thêm vào giỏ hàng thành công!");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
    }
  };
  //Handle buy now
  const handleBuyNow = async () => {
    try {
      const response = await addItemToCart(product.id, quantity);
      if (!response.error) {
        navigate("/cart");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
    }
  };

  // Submit review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    const { name, email, content, rating } = reviewForm;
    
    if (!name || !email || !content) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      name,
      rating,
      date: new Date().toISOString().split('T')[0],
      content,
      helpful: 0
    };

    setReviews([...reviews, newReview]);
    setReviewForm({ name: "", email: "", content: "", rating: 5 });
    setShowReviewForm(false);
    toast.success("Cảm ơn bạn đã đánh giá sản phẩm!");
  };

  // Mark review as helpful
  const handleHelpful = (id) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, helpful: review.helpful + 1 } : review
    ));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center">
        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="text-xl font-medium text-red-600">Không tìm thấy sản phẩm</h3>
          <p className="mt-2 text-gray-600">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Product Images */}
          <ProductImages product={product} mainImage={mainImage} setMainImage={setMainImage} />

          {/* Product Info */}
          <div className="flex flex-col space-y-6">
            {/* Brand & Title */}
            <div className="space-y-4">
              <div className="text-sm font-medium uppercase tracking-wider text-gray-500">
                {typeof product.brand === 'string' ? product.brand : 'SKYN BEAUTY'}
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              
              {/* Price */}
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </span>
                {product.comparePrice && (
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.comparePrice)}
                  </span>
                )}
              </div>
              
              {/* Ratings */}
              <div className="flex items-center">
                <RatingStars rating={product.rating || 5} />
                <span className="ml-2 text-sm text-gray-600">
                  {product.reviewCount || reviews.length} reviews
                </span>
              </div>
            </div>

            {/* Description
            <div className="text-gray-600 text-sm">
              {typeof product.description === 'string' 
                ? product.description.length > 200 
                  ? `${product.description.substring(0, 200)}...` 
                  : product.description
                : 'No description available'}
            </div> */}

            {/* Availability */}
            <div className="py-4 border-t border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-700">Availability:</span>
                <span className="text-green-600">In Stock</span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {/* Quantity */}
                <div className="flex items-center border rounded-md p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 rounded-md"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
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
                  <span>ADD TO CART</span>
                </button>

                <button className="p-3 border rounded-md hover:bg-gray-50">
                  <Heart size={18} />
                </button>
              </div>

              <button 
               onClick={handleBuyNow}
               className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-md font-medium transition-colors">
                BUY IT NOW
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
                    Description
                  </TabButton>
                  <TabButton 
                    isActive={activeTab === "parameters"} 
                    onClick={() => setActiveTab("parameters")}
                  >
                    Parameters
                  </TabButton>
                  <TabButton 
                    isActive={activeTab === "usage"} 
                    onClick={() => setActiveTab("usage")}
                  >
                    How to Use
                  </TabButton>
                  <TabButton 
                    isActive={activeTab === "ingredients"} 
                    onClick={() => setActiveTab("ingredients")}
                  >
                    Ingredients
                  </TabButton>
                  <TabButton 
                    isActive={activeTab === "reviews"} 
                    onClick={() => setActiveTab("reviews")}
                  >
                    Reviews ({reviews.length})
                  </TabButton>
                </nav>
              </div>

              <div className="py-4">
                {/* Description Tab */}
                {activeTab === "description" && (
                  <div className="text-gray-600 leading-relaxed text-sm">
                    {typeof product.description === 'string' ? product.description : 'No description available'}
                  </div>
                )}

                {/* Parameters Tab */}
                {activeTab === "parameters" && (
                  <div className="text-gray-600 text-sm">
                    <div className="overflow-hidden bg-white rounded-md">
                      <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="divide-y divide-gray-200">
                          {productSpecs.parameters.map((param, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                              <td className="py-3 px-4 text-sm font-medium text-gray-900 w-1/3">{param.name}</td>
                              <td className="py-3 px-4 text-sm text-gray-600">{param.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Usage Tab */}
                {activeTab === "usage" && (
                  <div className="text-gray-600 text-sm">
                    <h3 className="font-medium text-gray-900 mb-3">How to Use:</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      {productSpecs.usage.map((step, idx) => (
                        <li key={idx} className="pl-1">{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Ingredients Tab */}
                {activeTab === "ingredients" && (
                  <div className="text-gray-600 text-sm">
                    <h3 className="font-medium text-gray-900 mb-3">Ingredients:</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="leading-relaxed">{productSpecs.ingredients}</p>
                    </div>
                    <p className="mt-3 text-xs italic text-gray-500">
                      * Ingredient list may change. Please refer to the product packaging for the most up-to-date list.
                    </p>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                      <button 
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="text-sm font-medium text-gray-600 hover:text-gray-900"
                      >
                        {showReviewForm ? "Cancel Review" : "Write a Review"}
                      </button>
                    </div>

                    {showReviewForm && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-base font-medium text-gray-900 mb-3">
                          Share your thoughts
                        </h4>
                        <form onSubmit={handleSubmitReview} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Rating
                            </label>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                                  className="focus:outline-none"
                                >
                                  <Star
                                    size={24}
                                    className={`${
                                      reviewForm.rating >= star
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-gray-300"
                                    } cursor-pointer hover:text-amber-400`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={reviewForm.name}
                                onChange={handleReviewChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={reviewForm.email}
                                onChange={handleReviewChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Review
                            </label>
                            <textarea
                              name="content"
                              rows="4"
                              value={reviewForm.content}
                              onChange={handleReviewChange}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
                              placeholder="Share your experience with this product"
                              required
                            />
                          </div>

                          <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none"
                          >
                            Submit Review
                          </button>
                        </form>
                      </div>
                    )}

                    <div className="space-y-6">
                      {reviews.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">
                          No reviews yet. Be the first to leave a review!
                        </p>
                      ) : (
                        reviews.map((review) => (
                          <ReviewItem 
                            key={review.id} 
                            review={review} 
                            onHelpful={handleHelpful} 
                          />
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;