export const isString = (str: any) => typeof str === 'string';

export function isEmpty(value: any): boolean {
    if (Array.isArray(value)) {
        return value.length === 0;
    }

    return value === undefined || value === null || value === '';
}

export const getEthereum = () => {
    return (window as any).ethereum;
};
