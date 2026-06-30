import useAuth from "../../hooks/useAuth";

const Navbar = () => {

    const { user } = useAuth();

    return (
        <header className="h-16 bg-white shadow flex items-center justify-between px-8">

            <h2 className="text-xl font-semibold">
                Dashboard
            </h2>

            <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">

                    {user?.name?.charAt(0).toUpperCase()}

                </div>

                <div>

                    <p className="font-semibold">
                        {user?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                        {user?.email}
                    </p>

                </div>

            </div>

        </header>
    );
};

export default Navbar;