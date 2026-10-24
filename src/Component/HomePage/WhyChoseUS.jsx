
import {
    FiCompass,
    FiHeart,
    FiHome,
} from "react-icons/fi";

const benefits = [
    {
        icon: FiCompass,
        number: "01",
        title: "Find your fit",
        description:
            "Explore spaces that match your lifestyle and preferences.",
    },
    {
        icon: FiHome,
        number: "02",
        title: "Know your space",
        description:
            "Discover property details to help you choose with confidence.",
    },
    {
        icon: FiHeart,
        number: "03",
        title: "Feel at home",
        description:
            "Find a place that feels right for your next chapter.",
    },
];

const WhyChoseUS = () => {
    return (
        <section className="bg-[#F8F5F0] py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid gap-8 lg:grid-cols-[0.8fr_2.2fr] lg:gap-14">
                    {/* Section introduction */}
                    <div>
                        <div className="mb-3 flex items-center gap-3">
                            <span className="h-px w-7 bg-[#98786F]" />
                            <p className="text-[9px] uppercase tracking-[0.22em] text-[#8A6E68]">
                                Why RENTORA
                            </p>
                        </div>

                        <h2 className="max-w-xs font-serif text-3xl leading-tight tracking-[-0.04em] sm:text-4xl">
                            Finding home,
                            <span className="italic text-[#98786F]">
                                {" "}made personal.
                            </span>
                        </h2>
                    </div>

                    {/* Three minimal benefits */}
                    <div className="grid border-t border-[#DED7CF] sm:grid-cols-3 sm:border-l">
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon;

                            return (
                                <article
                                    key={benefit.number}
                                    className="group flex gap-4 border-b border-[#DED7CF] py-5 sm:flex-col sm:border-b-0 sm:border-r sm:px-5 sm:py-4 lg:px-6"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#DED7CF] text-[#98786F] transition-colors duration-300 group-hover:border-[#98786F] group-hover:bg-[#98786F] group-hover:text-white">
                                        <Icon size={17} strokeWidth={1.4} />
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <span className="text-[8px] tracking-[0.16em] text-[#A69A90]">
                                                {benefit.number}
                                            </span>
                                            <h3 className="font-serif text-xl">
                                                {benefit.title}
                                            </h3>
                                        </div>

                                        <p className="max-w-xs text-xs leading-6 text-[#77716C]">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChoseUS;
