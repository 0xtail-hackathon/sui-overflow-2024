function shortenAddress(address?: string, chars = 4) {
    if (!address) return "unknown address";
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export { shortenAddress };
