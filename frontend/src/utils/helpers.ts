export function shortenAddress(address?: string, chars = 4) {
    if (!address) return "unknown address";
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function todayYYYYMMDD() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${month}-${day}`;
}

export function commaInNumbers(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function elipsize(str: string, length = 6) {
    if (str.length <= length) return str;
    return str.slice(0, length) + "...";
}
