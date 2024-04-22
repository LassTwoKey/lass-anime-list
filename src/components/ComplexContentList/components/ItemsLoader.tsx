export const ItemsLoader = () => {
    return (
        <div className="flex justify-center mt-4 py-2 md:py-4">
            <div className="rounded-md h-8 w-8 border-4 border-t-4 border-green-600 animate-spin absolute"></div>
            <span className="text-white relative z-10 text-xl font-medium">
                Loading...
            </span>
        </div>
    )
}
