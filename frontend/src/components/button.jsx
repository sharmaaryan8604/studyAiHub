const Button = ({ children, ...props }) => {
    return (
        <button
            className="w-full rounded-2xl bg-[#1f2937] py-3.5 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#a1662f] disabled:cursor-not-allowed disabled:bg-slate-300"
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
