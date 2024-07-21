export const getObjWithoutEmptyValues = (obj: Record<string, unknown>) => {
    const notEmptyValues: Record<string, unknown> = {}

    for (const key in obj) {
        if (obj[key]) {
            if (Array.isArray(obj[key]) && obj[key]) {
                if ((obj[key] as unknown[]).length) {
                    notEmptyValues[key] = obj[key]
                }
            } else {
                notEmptyValues[key] = obj[key]
            }
        }
    }

    return notEmptyValues
}
