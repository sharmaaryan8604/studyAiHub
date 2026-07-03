const Input = ({ label, ...props }) => {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </label>

            <input
                className="w-full rounded-2xl border border-slate-200 bg-[#fcfaf6] px-4 py-3.5 text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#c8864b] focus:bg-white focus:ring-4 focus:ring-[#f2dcc7]"
                {...props}
            />
        </div>
    );
};

export default Input;
