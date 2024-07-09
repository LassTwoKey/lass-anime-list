export const getObjWithoutEmptyValues = (obj: Record<string, unknown>) => {
    const notEmptyValues: Record<string, unknown> = {}

    for (const key in obj) {
        if (obj[key]) {
            notEmptyValues[key] = obj[key]
        }
    }

    return notEmptyValues
}
