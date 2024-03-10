import errorImg from '@/assets/images/error.png'

export const ErrorBlock = () => {
    return (
        <div className="grid gap-3">
            <div className="w-44">
                <img className="max-w-full" src={errorImg} alt="" />
            </div>
            <p className="font-medium">Error in loading data :(</p>
        </div>
    )
}
