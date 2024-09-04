// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { AppContext } from '../context/GlobalContext';

// Import React icons
import { IoMdHeart } from 'react-icons/io';
import { FaAnglesRight , FaAnglesLeft  } from "react-icons/fa6";


// import required modules
import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const SimilarProduct = () => {
    const similarProductsContext = useContext(AppContext);

    if (similarProductsContext === null) {
        throw new Error("useContext must be used within an AppProvider");
    }

    const { data, wishList, handleHeartClick } = similarProductsContext;

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    const handleSwiper = (swiper: any) => {
        if (swiper.params.navigation) {
            const navigation = swiper.params.navigation;
            if (prevRef.current && nextRef.current) {
                navigation.prevEl = prevRef.current;
                navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
            }
        }
    };

    return (
        <div className='lg:mt-[40px] mt-[20px] relative'>
           <div className=' flex items-center justify-between'>
            <h1 className='mb-[20px] text-[40px]'>
                <b>You May Also Like</b>
            </h1>

            <div className="flex items-center gap-4 z-20">
                <button ref={prevRef} className="swiper-button-prev custom-nav-button">
                    <FaAnglesLeft size={30}  className='text-[#ccc] hover:text-[#333]' />
                </button>
                <button ref={nextRef} className="swiper-button-next custom-nav-button">
                    <FaAnglesRight  size={30} className='text-[#ccc] hover:text-[#333]' />
              
                </button>
            </div>

            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={false}
                navigation={true}  
                modules={[Autoplay, Pagination, Navigation]}
                onSwiper={handleSwiper}  
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}
                className="mySwiper"
            >
                {
                    data?.map((products) => (
                        <SwiperSlide key={products.id}>
                            <div className="bg-white border border-solid border-[#ccc] border-opacity-60 rounded-lg overflow-hidden relative mb-4 p-4">
                                <Link
                                    to={`/details/${products.id}`}
                                    className="relative mb-3 block overflow-hidden w-full z-10 pt-[100%]"
                                >
                                    <img
                                        src={products.image}
                                        alt="product_images"
                                        className="w-full h-[100%] absolute block top-0 left-0 object-contain"
                                    />
                                </Link>
                                <div
                                    className="absolute right-[10px] top-[10px] z-[10] cursor-grab"
                                    onClick={() => handleHeartClick(products)}
                                >
                                    <IoMdHeart size={24} className={`${wishList.findIndex((fav) => fav.id === products.id) !== -1 ? "text-[#e91e63]" : "text-[#ccc]"}`} />
                                </div>
                                <div className="mb-5">
                                    <h2 className="text-lg font-semibold truncate">
                                        {products.title}
                                    </h2>

                                    <div className="flex justify-between items-center mb-3 px-3">
                                        <p className="text-gray-600">{products.category}</p>
                                        <b className="text-[22px] text-[#b5895e]">
                                            $ {products.price}
                                        </b>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

          
        </div>
    );
};

export default SimilarProduct;
