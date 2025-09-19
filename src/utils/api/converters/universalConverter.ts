export function universalConverter<T>(obj: any): any {
	if (Array.isArray(obj)) {
		return obj.map(universalConverter);
	} else if (obj !== null && typeof obj === "object") {
		return Object.keys(obj).reduce((acc, key) => {
			const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
			acc[camelKey] = universalConverter(obj[key]);
			return acc;
		}, {} as Record<string, any>);
	} else {
		return obj;
	}
}
