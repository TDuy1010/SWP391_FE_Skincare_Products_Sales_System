import { useState } from "react";
import { Minus, Plus, Heart, ChevronDown, MessageCircleMoreIcon, UploadCloudIcon } from "lucide-react";
import imgProduct from "../../../assets/Rectangle 3.png";
import avatar from "../../../assets/img/shein icon.jpg";
import { Button, Modal, Rate, Upload } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(imgProduct);
  const [openSection, setOpenSection] = useState(null);
  const [isHovered, setIsHovered] = useState(null);
  const thumbnailImages = [imgProduct, imgProduct, imgProduct, imgProduct];
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [feedbackList, setFeedbackList] = useState([
    {
      feedBackId: 'f001',
      courseId: 'c001',
      userId: 'u001',
      detail: 'Great course! I learned a lot.',
      rating: 5,
      attachment: avatar,
      createdDate: '2025-02-01T10:00:00Z',
      updatedDate: '2025-02-01T10:30:00Z',
      userName: 'John Doe'
    },
    {
      feedBackId: 'f002',
      courseId: 'c002',
      userId: 'u002',
      detail: 'Good content, but could use more examples.',
      rating: 4,
      attachment: 'https://example.com/attachment2.jpg',
      createdDate: '2025-02-10T12:15:00Z',
      updatedDate: '2025-02-10T12:30:00Z',
      userName: 'Jane Smith'
    },
    {
      feedBackId: 'f003',
      courseId: 'c003',
      userId: 'u003',
      detail: 'The course was too advanced for me.',
      rating: 3,
      attachment: 'https://example.com/attachment3.jpg',
      createdDate: '2025-02-15T09:45:00Z',
      updatedDate: '2025-02-15T10:00:00Z',
      userName: 'Mark Johnson'
    }
  ]);

  const [userId, setUserId] = useState("u001");
  const [feedbackId, setFeedbackId] = useState("");
  const [rating, setRating] = useState(0);
  const [detail, setDetail] = useState("");
  const [isFeedbackVisible, setFeedbackVisible] = useState(false);
  const [typeOfButton, setTypeOfButton] = useState("add");
  const [attachment, setAttachment] = useState("");
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [attachmentName, setAttachmentName] = useState("");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const showFeedBackBox = (
    feedbackId,
    rating,
    detail,
    type,
    attachment
  ) => {
    setFeedbackId(feedbackId);
    setRating(rating);
    setDetail(detail);
    setTypeOfButton(type);
    setAttachment(attachment || "");
    setFileList(attachment ? [{
      uid: '-1',
      name: 'Current Image',
      status: 'done',
      url: attachment,
    }] : []);
    setFeedbackVisible(true);
  };

  const closeFeedbackBox = () => {
    setFeedbackVisible(false);
  };

  const handleDetailChange = (event) => {
    setDetail(event.target.value);
  };

  const handleDeleteFeedback = () => {

  }

  const handleSubmit = () => {
  
  }  

  const uploadProps = {
    // beforeUpload: (file) => {
    //   const isImage = file.type.startsWith('image/');
    //   if (!isImage) {
    //     toast.error('You can only upload image files!');
    //     return false;
    //   }
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   if (!isLt2M) {
    //     toast.error('Image must be smaller than 2MB!');
    //     return false;
    //   }
    //   handleUpload(file);
    //   return false;
    // },
    // fileList,
    // onRemove: () => {
    //   setAttachment('');
    //   setAttachmentName('');
    //   setFileList([]);
    // },
  };

  const handleUpload = () => {

  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-lg shadow-sm">
        {/* Image Section */}
        <div className="relative space-y-6">
          <div className="w-full h-[500px] rounded-lg overflow-hidden bg-gray-50 transition-all duration-300">
            {mainImage ? (
              <img
                src={mainImage}
                alt="Acne Treatment Mask"
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <span className="text-gray-500">No Image Available</span>
            )}
          </div>
          <div className="flex justify-start space-x-4 mt-4 overflow-x-auto pb-2">
            {thumbnailImages.map((image, index) => (
              <div
                key={index}
                className={`relative ${isHovered === index ? 'scale-105' : ''
                  } transition-all duration-200`}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 rounded-md cursor-pointer object-cover ${mainImage === image
                      ? 'border-2 border-black'
                      : 'border border-gray-200 hover:border-gray-400'
                    }`}
                  onClick={() => setMainImage(image)}
                />
              </div>
            ))}
          </div>

          {/* Overview Section */}
          <div className="mt-8 space-y-3">
            {[
              "Product Overview",
              "How To Use",
              "Add To Glance",
              "Ingredients",
              "Other Details",
            ].map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <button
                  className="w-full flex justify-between items-center text-left font-medium p-4 hover:bg-gray-50 transition-all duration-300"
                  onClick={() => toggleSection(section)}
                >
                  <span className="text-gray-800">{section}</span>
                  <ChevronDown
                    size={20}
                    className={`transform transition-all duration-300 ease-in-out text-gray-500
                    ${openSection === section ? 'rotate-180' : 'rotate-0'}
                  `}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out
                  ${openSection === section
                      ? 'max-h-[500px] opacity-100'
                      : 'max-h-0 opacity-0'
                    }
                `}
                >
                  <div className="p-4 bg-gray-50">
                    <p className="text-gray-600 leading-relaxed">
                      Details about {section}.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">Lorem Ipsum Dolor</h1>
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 line-through text-xl">Rs. 275</span>
              <span className="text-red-600 text-3xl font-bold">Rs. 262</span>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">Save 5%</span>
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
          </p>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">Vendor:</span>
              <span className="text-gray-800">Skin White</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">SKU:</span>
              <span className="text-gray-800">8964002548705</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">Availability:</span>
              <span className="text-green-600 font-medium">In Stock</span>
            </div>
          </div>

          {/* Quantity and Cart */}
          <div className="pt-6 space-y-4">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md px-4 py-2 bg-gray-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="hover:text-red-500 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-6 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <button className="bg-black hover:bg-gray-700 text-white px-8 py-2 rounded-md flex-1 transition-colors duration-300">
                  ADD TO CART
                </button>
                <button className="p-2 border rounded-md hover:border-red-500 hover:text-red-500 transition-all duration-300">
                  <Heart size={22} />
                </button>
              </div>
              <button className="bg-black hover:bg-gray-700 text-white px-8 py-3 rounded-md w-full transition-colors duration-300">
                BUY IT NOW
              </button>
            </div>
          </div>

          {/* Delivery & Returns */}
          <div className="pt-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-800">Delivery & Returns</h3>
            <p className="text-gray-600 leading-relaxed">
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>

      {/* Review products */}
      <AnimatePresence>
        {isFeedbackVisible && (
          <Modal
            open={isFeedbackVisible}
            onCancel={closeFeedbackBox}
            footer={null}
            width={448}
            centered
            maskClosable={true}
            className="p-0"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Share your review about product
              </h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="mb-6 flex justify-center"
              >
                <Rate
                  value={rating}
                  onChange={(value) => setRating(value)}
                  className="text-3xl"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 
                            focus:ring-blue-500 focus:border-transparent transition-all duration-300
                            text-gray-700 resize-none"
                  rows={5}
                  placeholder="Please share your experience..."
                  value={detail}
                  onChange={handleDetailChange}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.35 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="mt-4"
              >
                <Upload {...uploadProps} maxCount={1}>
                  <Button
                    icon={<UploadCloudIcon />}
                    loading={uploading}
                    className="flex items-center gap-2"
                  >
                    {uploading ? 'Uploading...' : 'Upload Image'}
                  </Button>
                </Upload>
                {attachmentName && (
                  <div className="mt-2 text-sm text-gray-600">
                    Attached: {attachmentName}
                  </div>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.1 } }}
                className="mt-6 flex justify-end gap-3"
              >
                <Button
                  onClick={closeFeedbackBox}
                  className="min-w-[100px] hover:bg-gray-100 transition-colors"
                >
                  Close
                </Button>
                <Button
                  type="primary"
                  onClick={() => handleSubmit(typeOfButton)}
                  className="min-w-[100px] bg-gradient-to-r from-blue-500 to-blue-600 
                            hover:from-blue-600 hover:to-blue-700 border-none shadow-lg"
                >
                  {typeOfButton === "update" ? "Update" : "Submit"}
                </Button>
              </motion.div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      <div className="border border-black bg-white relative my-14 max-w-[78rem] mx-auto">
        <div className="flex justify-between items-center border-b border-black">
          <h2 className="text-2xl font-bold p-6">
            Reviews
          </h2>
          <div className="mr-6"> 
            <Button
              type="primary"
              icon={<MessageCircleMoreIcon />}
              onClick={() => showFeedBackBox("", 0, "", "add")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 
                      hover:from-blue-600 hover:to-blue-700 border-none shadow-lg 
                      hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105
                      text-white font-semibold px-6 py-2 h-auto"
            >
              <span>Rate this product</span>
            </Button>
          </div>
        </div>
        <div className="p-6">
          {isLoadingFeedback ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-600">Loading reviews...</p>
            </div>
          ) : feedbackList.length > 0 ? (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold">
                  {(feedbackList.reduce((acc, curr) => acc + curr.rating, 0) / feedbackList.length).toFixed(1)}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <span
                        key={index}
                        className={`text-xl ${(feedbackList.reduce((acc, curr) => acc + curr.rating, 0) / feedbackList.length) >= index
                            ? "text-yellow-400"
                            : "text-gray-300"
                          }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-500">
                    ({feedbackList.length} {feedbackList.length === 1 ? 'rating' : 'ratings'})
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {feedbackList
                  .sort((a, b) => {
                    const createDateA = new Date(a.createdDate).getTime();
                    const updateDateA = new Date(a.updatedDate).getTime();
                    const createDateB = new Date(b.createdDate).getTime();
                    const updateDateB = new Date(b.updatedDate).getTime();

                    const isInvalidA = (a.createdDate === '-infinity' && a.updatedDate === '-infinity');
                    const isInvalidB = (b.createdDate === '-infinity' && b.updatedDate === '-infinity');

                    if (!isInvalidA && !isInvalidB) {
                      const maxDateA = Math.max(createDateA, updateDateA);
                      const maxDateB = Math.max(createDateB, updateDateB);
                      return maxDateB - maxDateA;
                    }

                    if (isInvalidA && !isInvalidB) {
                      return 1;
                    } else if (!isInvalidA && isInvalidB) {
                      return -1;
                    }

                    return 0;
                  })
                  .slice(0, 10)
                  .map((feedback) => (
                    <div
                      key={feedback.feedBackId}
                      className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4 items-start">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={avatar}
                            alt={`${feedback.userName}'s avatar`}
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {feedback.userName}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((index) => (
                                  <span
                                    key={index}
                                    className={`text-sm ${feedback.rating >= index
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                      }`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {feedback.updatedDate !== "0001-01-01T00:00:00"
                                  ? new Date(feedback.updatedDate).toLocaleDateString()
                                  : new Date(feedback.createdDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* update button */}
                        {feedback.userId === userId && (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                showFeedBackBox(
                                  feedback.feedBackId,
                                  feedback.rating,
                                  feedback.detail,
                                  "update",
                                  feedback.attachment
                                )
                              }
                              className="text-gray-400 hover:text-gray-600"
                              title="Edit feedback"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                                <circle cx="8" cy="2" r="2" />
                                <circle cx="8" cy="8" r="2" />
                                <circle cx="8" cy="14" r="2" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteFeedback(feedback.feedBackId)}
                              className="text-red-400 hover:text-red-600"
                              title="Delete feedback"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                        {feedback.detail}
                      </p>
                      {feedback.attachment && (
                        <div className="mt-3">
                          <img
                            src={feedback.attachment}
                            alt="Feedback attachment"
                            className="max-w-[200px] rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => window.open(feedback.attachment, '_blank')}
                          />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-600 text-lg mb-2">
                No reviews yet
              </p>
              <p className="text-gray-500">
                Be the first to review this course
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
