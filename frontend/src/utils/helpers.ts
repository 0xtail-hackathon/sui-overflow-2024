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

export function capitalizeFirstLetter(str: string) {
	if (str.length === 0) {
		return str; // 빈 문자열일 경우 그대로 반환
	}

	return str.charAt(0).toUpperCase() + str.slice(1);
}
