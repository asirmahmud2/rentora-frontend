
import { FiArrowUpRight } from "react-icons/fi";

const Loading = () => {
    return (
        <section
            role="status"
            aria-live="polite"
            aria-label="Loading RENTORA"
            className="flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#FDFCF9] px-5 py-16 text-[#1A1A1A]"
        >
            <div className="w-full max-w-md">
                {/* Brand */}
                <div className="flex items-center justify-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border border-[#8A6E68]/50 font-serif text-xl">
                        R
                    </div>

                    <div>
                        <p className="font-sans text-xs tracking-[0.28em]">
                            RENTORA
                        </p>
                        <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#938780]">
                            A place to belong
                        </p>
                    </div>
                </div>

                {/* Loading animation */}
                <div className="my-12 flex flex-col items-center">
                    <div className="relative flex h-14 w-14 items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-[#E5DDD5]" />

                        <div className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-[#8A6E68]" />

                        <span className="font-serif text-lg italic text-[#8A6E68]">
                            R
                        </span>
                    </div>

                    <h1 className="mt-7 text-center font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
                        Finding your
                        <span className="block italic text-[#8A6E68]">
                            place.
                        </span>
                    </h1>

                    <p className="mt-4 text-center text-xs leading-6 text-[#81766D]">
                        Preparing something lovely for you.
                    </p>

                    {/* Animated progress accent */}
                    <div className="mt-8 h-px w-36 overflow-hidden bg-[#E5DDD5]">
                        <div className="h-full w-1/3 animate-pulse bg-[#8A6E68]" />
                    </div>
                </div>

                {/* Editorial footer */}
                <div className="flex items-center justify-center gap-3 border-t border-[#E5DDD5] pt-5">
                    <span className="text-[8px] uppercase tracking-[0.2em] text-[#A09790]">
                        Good spaces
                    </span>

                    <span className="h-1 w-1 rounded-full bg-[#8A6E68]" />

                    <span className="text-[8px] uppercase tracking-[0.2em] text-[#A09790]">
                        Better beginnings
                    </span>

                    <FiArrowUpRight
                        aria-hidden="true"
                        className="ml-1 text-sm text-[#8A6E68]"
                    />
                </div>
            </div>
        </section>
    );
};

export default Loading;
