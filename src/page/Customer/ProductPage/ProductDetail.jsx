/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Minus,
  Plus,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import { getProductDetail } from "../../../service/product";
import { addItemToCart } from "../../../service/cart/cart";
import { addProductFeedback } from "../../../service/feedback";
import LoginModal from "../LoginPage/LoginPage"; 
import imgProduct from "../../../assets/Rectangle 3.png";
import { toast } from "react-toastify";
import ProductDetailTabs from "./ProductDetailTabs"; 
import { RatingStars } from "./FeedbackSection"; 

// ProductImages component definition (không thay đổi)
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

// Sửa phần custom hook useAuthCheck để thực sự lắng nghe sự thay đổi trong localStorage
const useAuthCheck = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null
  });

  useEffect(() => {
    // Hàm kiểm tra đăng nhập
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userJson = localStorage.getItem("user");
      
      if (token && userJson) {
        try {
          const user = JSON.parse(userJson);
          setAuthState({
            isAuthenticated: true,
            user: user,
            token: token
          });
        } catch (error) {
          console.error("Error parsing user data:", error);
          setAuthState({
            isAuthenticated: false,
            user: null,
            token: null
          });
        }
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
          token: null
        });
      }
    };

    // Kiểm tra ngay khi component mount
    checkAuth();

    // Thêm event listener để bắt sự kiện thay đổi localStorage
    window.addEventListener('storage', checkAuth);

    // Làm sạch event listener khi component unmount
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return authState;
};

// Helper function to safely render HTML content
const createMarkup = (htmlContent) => {
  return { __html: htmlContent || "" };
};

const ProductDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(imgProduct);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");
  
  // Sử dụng custom hook thay thế cho useAuth
  const { isAuthenticated, user } = useAuthCheck();
  
  // Add these new states for the complete UI
  const [productSpecs, setProductSpecs] = useState({
    parameters: [
      { name: "Nguồn gốc", value: "Chưa có thông tin" },
      { name: "Loại sản phẩm", value: "Chưa có thông tin" },
      { name: "Loại da", value: "Chưa có thông tin" },
      { name: "Xuất xứ thương hiệu", value: "Chưa có thông tin" },
      { name: "Nơi sản xuất", value: "Chưa có thông tin" },
    ],
    usage: ["Chưa có thông tin về cách sử dụng"],
    ingredients: "Chưa có thông tin về thành phần"
  });

  // Updated states for reviews using API data
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    description: "",
    rating: 5,
  });
  const [reviews, setReviews] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  // Thêm state mới cho filter đánh giá và modal đăng nhập
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [redirectAfterLogin, setRedirectAfterLogin] = useState("");

  // Load product details including feedback
  useEffect(() => {
    const fetchProductDetail = async () => {
      setIsLoading(true);
      try {
        const response = await getProductDetail(slug);
        if (!response.error) {
          setProduct(response.result);
          if (response.result.thumbnail) {
            setMainImage(response.result.thumbnail);
          }
          
          // Lấy danh sách feedback từ response
          if (response.result.feedBacks && Array.isArray(response.result.feedBacks)) {
            setReviews(response.result.feedBacks);
          }
          
          // Cập nhật thông tin specs từ response
          const specs = {
            parameters: [
              { name: "Nguồn gốc", value: response.result.specification?.origin || "Chưa có thông tin" },
              { name: "Loại sản phẩm", value: response.result.category?.name || "Chưa có thông tin" },
              { name: "Loại da", value: response.result.specification?.skinType || "Tất cả loại da" },
              { name: "Xuất xứ thương hiệu", value: response.result.specification?.brandOrigin || "Chưa có thông tin" },
              { name: "Nơi sản xuất", value: response.result.specification?.manufacturingLocation || "Chưa có thông tin" },
            ],
            usage: response.result.usageInstruction ? 
              response.result.usageInstruction.split('\n').filter(line => line.trim()) : 
              ["Chưa có thông tin về cách sử dụng"],
            ingredients: response.result.ingredient || "Chưa có thông tin về thành phần"
          };
          
          setProductSpecs(specs);
          
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

  // Kiểm tra người dùng đã đánh giá sản phẩm này chưa
  useEffect(() => {
    const checkUserReview = () => {
      if (!isAuthenticated || !user || !product || !product.feedBacks) {
        return;
      }

      // Kiểm tra xem user hiện tại đã có feedback trong danh sách chưa
      const userReview = product.feedBacks.find(
        feedback => feedback.userResponse && feedback.userResponse.id === user.id
      );

      if (userReview) {
        setHasReviewed(true);
        // Nếu muốn cho phép chỉnh sửa, có thể điền form với dữ liệu hiện tại
        setReviewForm({
          description: userReview.description || "",
          rating: userReview.rating || 5
        });
      }
    };

    checkUserReview();
  }, [isAuthenticated, user, product]);

  // Thêm useEffect để lọc đánh giá
  useEffect(() => {
    if (!reviews || !reviews.length) {
      setFilteredReviews([]);
      return;
    }
    
    let result = [...reviews];
    
    // Lọc theo rating
    if (activeFilter !== "all") {
      result = result.filter(review => review.rating === parseInt(activeFilter));
    }
    
    // Lọc theo search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(review => 
        review.description?.toLowerCase().includes(term) || 
        `${review.userResponse?.firstName || ''} ${review.userResponse?.lastName || ''}`.toLowerCase().includes(term)
      );
    }
    
    setFilteredReviews(result);
  }, [reviews, activeFilter, searchTerm]);

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

  // Handler for reviews/feedback
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  // Thay đổi cách xử lý đăng nhập để mở modal
  const handleLoginRequired = () => {
    // Lưu current path để redirect sau khi đăng nhập
    setRedirectAfterLogin(location.pathname);
    setIsLoginModalOpen(true);
  };
  
  // Cập nhật hàm handleSubmitReview để gọi API đúng
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!product?.id) {
      toast.error("Không thể xác định sản phẩm để gửi đánh giá");
      return;
    }
    
    // Kiểm tra lại token trong localStorage trực tiếp
    const token = localStorage.getItem("token");
    if (!token) {
      handleLoginRequired();
      return;
    }
    
    setSubmitLoading(true);
    
    try {
      // Chuẩn bị dữ liệu đánh giá - chỉ gồm description và rating
      const feedbackData = {
        description: reviewForm.description,
        rating: parseInt(reviewForm.rating)
      };
      
      // Log để debug
      console.log("Product ID:", product.id);
      console.log("Sending feedback data:", feedbackData);
      
      // Gọi API để gửi đánh giá - thay đổi cách gọi API
      const response = await addProductFeedback(product.id, feedbackData);
      
      console.log("API response:", response);
      
      if (response.error) {
        if (response.requireAuth || response.code === 1201) {
          // Mở modal đăng nhập thay vì chuyển hướng
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          handleLoginRequired();
        } else {
          toast.error(response.message || "Không thể gửi đánh giá");
        }
      } else {
        // Xử lý thành công
        const newReview = response.result;
        
        // Thêm đánh giá mới vào đầu danh sách
        setReviews(prevReviews => [newReview, ...prevReviews]);
        
        // Reset form và hiển thị thông báo thành công
        setReviewForm({ description: "", rating: 5 });
        setShowReviewForm(false);
        setHasReviewed(true);
        toast.success("Cảm ơn bạn đã đánh giá sản phẩm!");
        
        // Refresh lại danh sách đánh giá từ sản phẩm
        try {
          const updatedProduct = await getProductDetail(slug);
          if (!updatedProduct.error) {
            setProduct(updatedProduct.result);
            if (updatedProduct.result.feedBacks) {
              setReviews(updatedProduct.result.feedBacks);
            }
          }
        } catch (refreshError) {
          console.error("Error refreshing reviews:", refreshError);
        }
      }
    } catch (error) {
      console.error("Review submission error:", error);
      toast.error("Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại sau.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-gray-700" />
        <span className="ml-2 text-xl text-gray-700">Đang tải...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy sản phẩm</h2>
          <p className="text-gray-600 mb-4">Sản phẩm này không còn tồn tại hoặc đã bị xóa.</p>
          <button 
            onClick={() => navigate('/shop')}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Quay lại cửa hàng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Thêm Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      
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
                <span>{product.category?.name || "Không phân loại"}</span>
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
                <RatingStars rating={product.rating || 5} />
                <span className="ml-2 text-sm text-gray-600">
                  {reviews.length} đánh giá
                </span>
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
            </div>

            {/* Quantity and Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center border rounded-md p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 rounded-md"
                    disabled={product.stock <= 0}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 rounded-md"
                    disabled={product.stock <= 0 || quantity >= product.stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center space-x-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={product.stock <= 0}
                >
                  <ShoppingBag size={18} />
                  <span>THÊM VÀO GIỎ HÀNG</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-md font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={product.stock <= 0}
              >
                MUA NGAY
              </button>
            </div>

            {/* Tabs - Đã được tách ra file riêng */}
            <ProductDetailTabs 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              product={product}
              productSpecs={productSpecs}
              reviews={reviews}
              setReviews={setReviews}
              handleLoginRequired={handleLoginRequired}
              slug={slug}
              createMarkup={createMarkup}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;