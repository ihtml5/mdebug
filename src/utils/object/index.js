export const toArrayObject = (value) => {
    if (Array.isArray(value)) {
        return value;
    }
    if (typeof value === 'object') {
        const xmlInfo = {};
        for (const key in value) {
            xmlInfo[key] = value[key];
        }
        return xmlInfo;
    }
    return false;
}