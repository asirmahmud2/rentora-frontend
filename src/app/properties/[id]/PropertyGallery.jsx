"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import {
    FiArrowUpRight,
    FiChevronLeft,
    FiChevronRight,
    FiHeart,
    FiShield,
} from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PropertyGallery = ({
    property,
    isFavorite,
    onFavorite,
    onBook,
    formatRent,
}) => {
    const [activeImage, setActiveImage] = useState(0);
    const swiperRef = useRef(null);

    const images = property.images || [];

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">
                {/* IMAGE GALLERY */}
                <div className="min-w-0">
                    <div className="relative">
                        <Swiper
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            spaceBetween={0}
                            slidesPerView={1}
                            speed={600}
                            onSlideChange={(swiper) =>
                                setActiveImage(swiper.activeIndex)
                            }
                            className="rentora-property-swiper aspect-[16/10] overflow-hidden bg-[#EEE9E4] sm:aspect-[16/9]"
                        >
                            {images.length > 0 ? (
                                images.map((image, index) => (
                                    <SwiperSlide key={`${image}-${index}`}>
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={image}
                                                alt={`${property.title} image ${index + 1}`}
                                                fill
                                                priority={index === 0}
                                                sizes="(max-width: 1024px) 100vw, 70vw"
                                                className="object-cover"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <SwiperSlide>
                                    <div className="flex h-full items-center justify-center">
                                        <span className="font-serif text-7xl text-[#C3BBB5]">
                                            R
                                        </span>
                                    </div>
                                </SwiperSlide>
                            )}
                        </Swiper>

                        {/* Image index */}
                        <div className="absolute bottom-4 left-4 z-10 bg-[#FDFCF9]/90 px-3 py-2 backdrop-blur-sm">
                            <span className="font-sans text-[8px] uppercase tracking-[0.15em] text-[#8A6E68]">
                                {images.length > 0
                                    ? String(activeImage + 1).padStart(2, "0")
                                    : "00"}
                                {" / "}
                                {String(images.length).padStart(2, "0")}
                            </span>
                        </div>

                        {/* Slider controls */}
                        {images.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => swiperRef.current?.slidePrev()}
                                    aria-label="Previous property image"
                                    className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/50 bg-[#1A1A1A]/60 text-white backdrop-blur-sm transition hover:bg-[#8A6E68]"
                                >
                                    <FiChevronLeft />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => swiperRef.current?.slideNext()}
                                    aria-label="Next property image"
                                    className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/50 bg-[#1A1A1A]/60 text-white backdrop-blur-sm transition hover:bg-[#8A6E68]"
                                >
                                    <FiChevronRight />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {images.length > 1 && (
                        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                            {images.map((image, index) => (
                                <button
                                    key={`${image}-${index}`}
                                    type="button"
                                    onClick={() => swiperRef.current?.slideTo(index)}
                                    aria-label={`View image ${index + 1}`}
                                    className={`relative h-20 w-28 shrink-0 overflow-hidden bg-[#EEE9E4] sm:h-24 sm:w-36 ${
                                        activeImage === index
                                            ? "ring-1 ring-[#8A6E68] ring-offset-2"
                                            : ""
                                    }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${property.title} thumbnail ${index + 1}`}
                                        fill
                                        sizes="144px"
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* BOOKING PANEL */}
                <aside className="self-start lg:sticky lg:top-8">
                    <div className="bg-[#EEE9E4] p-6 sm:p-7 lg:p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#A09A95]">
                                    Reserve this property
                                </p>

                                <p className="mt-2 font-serif text-2xl">
                                    {formatRent(property.rent)}
                                    <span className="ml-1 font-sans text-[9px] uppercase tracking-[0.1em] text-[#8A6E68]">
                                        / {property.rentType}
                                    </span>
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={onFavorite}
                                aria-label={
                                    isFavorite
                                        ? "Remove from favorites"
                                        : "Add to favorites"
                                }
                                className={`flex h-10 w-10 items-center justify-center border transition duration-300 ${
                                    isFavorite
                                        ? "border-[#8A6E68] bg-[#8A6E68] text-white"
                                        : "border-[#1A1A1A]/15 text-[#5E5854] hover:border-[#8A6E68] hover:text-[#8A6E68]"
                                }`}
                            >
                                <FiHeart
                                    className={`text-sm ${isFavorite ? "fill-current" : ""}`}
                                />
                            </button>
                        </div>

                        <div className="my-6 h-px bg-[#1A1A1A]/10" />

                        {/* Property stats */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                [property.bedrooms, "Bedrooms"],
                                [property.bathrooms, "Bathrooms"],
                                [
                                    Number(property.propertySize || 0).toLocaleString(),
                                    property.sizeUnit || "sqft",
                                ],
                            ].map(([value, label]) => (
                                <div key={label}>
                                    <p className="font-serif text-lg">{value}</p>
                                    <p className="mt-1 font-sans text-[8px] uppercase tracking-[0.12em] text-[#918A85]">
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <Button
                            type="button"
                            variant="primary"
                            onPress={onBook}
                            className="mt-7 h-13 w-full rounded-none bg-[#1A1A1A] font-sans text-[9px] uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-[#8A6E68]"
                        >
                            Book Property
                            <FiArrowUpRight className="text-sm" />
                        </Button>

                        <div className="mt-4 flex items-start gap-3 border-t border-[#1A1A1A]/10 pt-5">
                            <FiShield className="mt-0.5 shrink-0 text-sm text-[#8A6E68]" />

                            <p className="font-sans text-[9px] leading-5 text-[#817A75]">
                                Secure your reservation through RENTORA and
                                complete payment through our secure payment
                                process.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default PropertyGallery;