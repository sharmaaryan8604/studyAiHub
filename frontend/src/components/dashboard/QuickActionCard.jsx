const QuickActionCard = ({ title, description, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-lg transition"
        >
            <h3 className="text-lg font-semibold">
                {title}
            </h3>

            <p className="text-gray-500 mt-2">
                {description}
            </p>
        </div>
    );
};

export default QuickActionCard;