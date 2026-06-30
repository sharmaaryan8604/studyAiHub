const Input = ({ label, type = "text", ...props }) => {
    return (
        <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
                {label}
            </label>

            <input
                type={type}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                {...props}
            />
        </div>
    );
};

export default Input;