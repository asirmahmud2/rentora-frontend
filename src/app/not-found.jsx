
import Link from "next/link";
import {
    FiArrowLeft,
    FiArrowUpRight,
    FiCompass,
} from "react-icons/fi";

const NotFound = () => {
    return (
        <main className="flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#FDFCF9] px-5 py-16 text-[#1A1A1A]">
            <div className="container mx-auto w-full max-w-4xl">
                {/* Brand signature */}
                <div className="mb-14 flex items-center justify-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center border border-[#8A6E68]/50 font-serif text-xl">
                        R
                    </span>

                    <div>
                        <p className="text-xs tracking-[0.28em]">
                            RENTORA
                        </p>
                        <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#938780]">
                            A place to belong
                        </p>
                    </div>
                </div>

                {/* Editorial 404 composition */}
                <div className="relative border-y border-[#DED7CF] py-12 text-center sm:py-16">
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden font-serif text-[clamp(12rem,35vw,25rem)] leading-none tracking-[-0.1em] text-[#EEE9E4]/80"
                    >
                        404
                    </span>

                    <div className="relative z-10">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#DCD3CA] bg-[#FDFCF9] text-[#8A6E68]">
                            <FiCompass size={21} strokeWidth={1.3} />
                        </div>

                        <p className="mt-7 text-[9px] uppercase tracking-[0.28em] text-[#8A6E68]">
                            A little off the map
                        </p>

                        <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.045em] sm:text-6xl">
                            This isn't the
                            <br />
                            <span className="italic text-[#8A6E68]">
                                place you're looking for.
                            </span>
                        </h1>

                        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#77716D]">
                            Looks like this address doesn't exist—or the
                            page has moved. Let's help you find your way home.
                        </p>

                        {/* Navigation actions */}
                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                href="/"
                                className="group inline-flex h-12 items-center justify-center gap-3 bg-[#1A1A1A] px-7 text-[9px] uppercase tracking-[0.17em] text-white transition-colors hover:bg-[#8A6E68]"
                            >
                                <FiArrowLeft className="text-sm transition-transform group-hover:-translate-x-1" />
                                Back to home
                            </Link>

                            <Link
                                href="/properties"
                                className="group inline-flex h-12 items-center justify-center gap-3 border border-[#DCD3CA] px-7 text-[9px] uppercase tracking-[0.17em] text-[#5E5854] transition-colors hover:border-[#8A6E68] hover:text-[#8A6E68]"
                            >
                                Explore properties
                                <FiArrowUpRight className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Editorial footer */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[8px] uppercase tracking-[0.2em] text-[#A09790]">
                        RENTORA / 404
                    </span>

                    <span className="font-serif text-sm italic text-[#8A6E68]">
                        Every journey leads somewhere.
                    </span>
                </div>
            </div>
        </main>
    );
};

export default NotFound;
