const Button = ({ children, ...props }) => {
    return (
        <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;