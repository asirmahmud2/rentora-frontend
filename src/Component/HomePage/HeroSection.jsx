
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input, Label, ListBox, Select } from "@heroui/react";
import {
    FiArrowDownRight,
    FiArrowUpRight,
    FiMapPin,
    FiSearch,
} from "react-icons/fi";

const propertyTypes = [
    ["all", "All property types"],
    ["Apartment", "Apartment"],
    ["House", "House"],
    ["Villa", "Villa"],
    ["Studio", "Studio"],
    ["Condo", "Condo"],
    ["Townhouse", "Townhouse"],
    ["Office", "Office"],
];

const HeroSection = () => {
    const router = useRouter();

    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [sort, setSort] = useState("recommended");

    const handleSearch = (event) => {
        event.preventDefault();

        const params = new URLSearchParams();
        const searchLocation = location.trim();

        if (searchLocation) params.set("location", searchLocation);

        if (propertyType && propertyType !== "all") {
            params.set("propertyType", propertyType);
        }

        if (sort && sort !== "recommended") {
            params.set("sort", sort);
        }

        const query = params.toString();
        router.push(query ? `/properties?${query}` : "/properties");
    };

    return (
        <section className="overflow-hidden bg-[#F8F5F0] text-[#24211F]">
            <div className="container mx-auto px-4 pb-8 pt-9 sm:px-6 sm:pb-12 sm:pt-12 lg:px-10 lg:pt-14">

                {/* Magazine masthead */}
                <div className="mb-9 flex items-center justify-between border-y border-[#DCD3CA] py-3.5 sm:mb-12">
                    <span className="font-serif text-lg tracking-[-0.04em] sm:text-xl">
                        RENTORA<span className="text-[#98786F]">.</span>
                    </span>

                    <span className="hidden text-[9px] uppercase tracking-[0.22em] text-[#81766D] sm:block">
                        The Address Journal
                    </span>

                    <span className="text-[9px] uppercase tracking-[0.17em] text-[#81766D]">
                        Vol. 01 — Find Your Place
                    </span>
                </div>

                {/* Entirely new asymmetric editorial layout */}
                <div className="grid gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch lg:gap-10 xl:gap-14">

                    {/* Left: typography-led cover story */}
                    <div className="flex min-w-0 flex-col justify-between lg:py-3">
                        <div>
                            <div className="mb-6 flex items-center gap-3">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#B59B8F] font-serif text-xs text-[#8A6E68]">
                                    01
                                </span>

                                <span className="text-[9px] uppercase tracking-[0.2em] text-[#8A6E68]">
                                    A different way to find home
                                </span>
                            </div>

                            <h1 className="font-serif text-[clamp(3.65rem,7.5vw,7.4rem)] leading-[0.86] tracking-[-0.065em]">
                                Life looks
                                <br />
                                better
                                <br />
                                <span className="font-normal italic text-[#98786F]">
                                    from here.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-md text-sm leading-7 text-[#716963] sm:mt-8 sm:text-base sm:leading-8">
                                Not just another address. A space that makes
                                slow mornings better, evenings feel warmer,
                                and everyday life feel a little more yours.
                            </p>

                            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                                <Link
                                    href="/properties"
                                    className="group inline-flex items-center gap-4 bg-[#24211F] px-5 py-4 text-[9px] uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#8A6E68] sm:px-6"
                                >
                                    Explore the collection
                                    <FiArrowUpRight className="text-base transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </Link>

                                <span className="font-serif text-sm italic text-[#8D8178]">
                                    Find your kind of home.
                                </span>
                            </div>
                        </div>

                        {/* Editorial footer on the text column */}
                        <div className="mt-10 border-t border-[#DCD3CA] pt-5 lg:mt-12">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#8A6E68]">
                                What makes a place yours?
                            </p>

                            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-serif text-lg text-[#49413C] sm:text-xl">
                                <span>Comfort.</span>
                                <span>Character.</span>
                                <span className="italic text-[#98786F]">
                                    Belonging.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: photographic editorial collage */}
                    <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-4 lg:h-[590px] lg:grid-cols-[1.08fr_0.82fr] lg:grid-rows-[1.05fr_0.95fr]">

                        {/* Dominant photograph */}
                        <div className="group relative col-span-2 aspect-[4/3] overflow-hidden bg-[#DED4C9] lg:col-span-1 lg:row-span-2 lg:aspect-auto">
                            <Image
                                src="https://i.ibb.co.com/67sXfd5G/149e7e9f-5cef-4ab7-8c3b-8c7a9fb175c5.jpg"
                                alt="Warm, thoughtfully designed contemporary living space"
                                fill
                                priority
                                sizes="(max-width: 1023px) 100vw, 48vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                            />

                            <div className="absolute left-4 top-4 bg-[#F8F5F0] px-4 py-3 sm:left-5 sm:top-5">
                                <p className="text-[8px] uppercase tracking-[0.2em] text-[#8A6E68]">
                                    The living edit
                                </p>
                                <p className="mt-1 font-serif text-lg leading-tight">
                                    Room to breathe.
                                </p>
                            </div>

                            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 border-b border-white/65 pb-3 sm:bottom-6 sm:left-5 sm:right-5">
                                <span className="text-[9px] uppercase tracking-[0.15em] text-white">
                                    Spaces that stay with you
                                </span>
                                <FiArrowDownRight className="shrink-0 text-xl text-white" />
                            </div>
                        </div>

                        {/* Supporting photograph */}
                        <div className="group relative aspect-[4/5] overflow-hidden bg-[#DDD4CA] lg:aspect-auto">
                            <Image
                                src="https://i.ibb.co.com/q8r2RBx/ed5dc1ae-6290-405a-9373-e31970e3977d.jpg"
                                alt="Elegant residential interior with a calm neutral palette"
                                fill
                                sizes="(max-width: 1023px) 50vw, 22vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            />

                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4 sm:p-5">
                                <span className="text-[8px] uppercase tracking-[0.2em] text-white/80">
                                    The everyday
                                </span>
                                <p className="mt-1 font-serif text-xl text-white sm:text-2xl">
                                    Made for living.
                                </p>
                            </div>
                        </div>

                        {/* Graphic editorial tile — not another photo */}
                        <div className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden bg-[#8A6E68] p-4 text-[#F8F3ED] sm:p-6 lg:aspect-auto lg:p-5 xl:p-6">
                            <span className="text-[8px] uppercase tracking-[0.22em] text-white/75">
                                A note on home
                            </span>

                            <span className="pointer-events-none absolute -bottom-12 -right-2 font-serif text-[180px] leading-none text-white/[0.08] sm:text-[220px]">
                                R
                            </span>

                            <div className="relative z-10">
                                <p className="font-serif text-3xl leading-[0.98] tracking-[-0.04em] sm:text-4xl xl:text-[3.25rem]">
                                    Find
                                    <br />
                                    your
                                    <br />
                                    <span className="italic text-[#E7D4C5]">
                                        place.
                                    </span>
                                </p>

                                <div className="mt-5 h-px w-10 bg-[#E7D4C5]/80" />

                                <p className="mt-4 max-w-[180px] text-xs leading-5 text-white/80">
                                    For the life you live today and the one
                                    you are growing into.
                                </p>
                            </div>

                            <Link
                                href="/properties"
                                className="relative z-10 flex items-center justify-between border-t border-white/30 pt-3 text-[8px] uppercase tracking-[0.15em] transition-colors hover:text-[#E7D4C5]"
                            >
                                Find your address
                                <FiArrowUpRight className="text-base" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Search: a clean editorial strip, not a floating card */}
                <div className="mt-10 border-y border-[#D4C8BE] py-7 sm:mt-12 sm:py-8 lg:mt-14">
                    <div className="grid gap-6 lg:grid-cols-[0.72fr_2.28fr] lg:items-end lg:gap-10">

                        <div>
                            <p className="text-[9px] uppercase tracking-[0.22em] text-[#8A6E68]">
                                Start with the essentials
                            </p>

                            <h2 className="mt-2 font-serif text-2xl leading-tight tracking-[-0.04em] sm:text-3xl">
                                Find your coordinates.
                            </h2>

                            <p className="mt-2 max-w-xs text-xs leading-5 text-[#81766D]">
                                Tell us a little about the place you have in mind.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSearch}
                            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_auto] lg:items-end"
                        >
                            {/* Location */}
                            <div className="min-w-0">
                                <Label
                                    htmlFor="hero-location"
                                    className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-[#716963]"
                                >
                                    Location
                                </Label>

                                <div className="relative">
                                    <FiMapPin className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-sm text-[#8A6E68]" />

                                    <Input
                                        id="hero-location"
                                        name="location"
                                        value={location}
                                        onChange={(event) =>
                                            setLocation(event.target.value)
                                        }
                                        placeholder="Area or city"
                                        variant="secondary"
                                        className="h-12 w-full rounded-none border border-[#DCD3CA] bg-white pl-10 pr-3 text-sm shadow-none focus-within:border-[#8A6E68]"
                                    />
                                </div>
                            </div>

                            {/* Property type */}
                            <div className="min-w-0">
                                <Label className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-[#716963]">
                                    Property type
                                </Label>

                                <Select
                                    name="propertyType"
                                    value={propertyType || null}
                                    onChange={(value) =>
                                        setPropertyType(value || "")
                                    }
                                    placeholder="Any type"
                                    variant="secondary"
                                    className="w-full"
                                >
                                    <Select.Trigger className="h-12 rounded-none border border-[#DCD3CA] bg-white shadow-none">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>

                                    <Select.Popover className="rounded-none border border-[#DCD3CA] bg-[#FDFCF9] shadow-lg">
                                        <ListBox>
                                            {propertyTypes.map(([id, label]) => (
                                                <ListBox.Item
                                                    key={id}
                                                    id={id}
                                                    textValue={label}
                                                >
                                                    {label}
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            {/* Sort */}
                            <div className="min-w-0">
                                <Label className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-[#716963]">
                                    Sort by
                                </Label>

                                <Select
                                    name="sort"
                                    value={sort}
                                    onChange={(value) =>
                                        setSort(value || "recommended")
                                    }
                                    variant="secondary"
                                    className="w-full"
                                >
                                    <Select.Trigger className="h-12 rounded-none border border-[#DCD3CA] bg-white shadow-none">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>

                                    <Select.Popover className="rounded-none border border-[#DCD3CA] bg-[#FDFCF9] shadow-lg">
                                        <ListBox>
                                            <ListBox.Item
                                                id="recommended"
                                                textValue="Recommended"
                                            >
                                                Recommended
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>

                                            <ListBox.Item
                                                id="price-asc"
                                                textValue="Price: Low to High"
                                            >
                                                Price: Low to High
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>

                                            <ListBox.Item
                                                id="price-desc"
                                                textValue="Price: High to Low"
                                            >
                                                Price: High to Low
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            {/* Search action */}
                            <div className="sm:col-span-2 lg:col-span-1">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="h-12 w-full rounded-none bg-[#24211F] px-6 text-[9px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#8A6E68] lg:min-w-[125px]"
                                >
                                    <FiSearch className="text-base" />
                                    Search
                                    <FiArrowUpRight className="text-base" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Closing editorial signature */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-5">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#8B8077]">
                        Thoughtfully find your next home
                    </p>

                    <p className="font-serif text-sm italic text-[#8A6E68]">
                        A good place changes everything.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
