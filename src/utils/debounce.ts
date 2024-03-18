/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const debounce = (func: (...arg: any[]) => any, delay: number) => {
    let timeoutId: NodeJS.Timeout

    return function (this: any) {
        const context = this
        const args = Array.from(arguments)

        clearTimeout(timeoutId)
        timeoutId = setTimeout(function () {
            func.apply(context, args)
        }, delay)
    }
}
