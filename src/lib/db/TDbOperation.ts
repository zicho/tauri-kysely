export type TDbOperation<T> = {
	result: T | null;
	success: boolean;
	message: string;
};

export function successfulOperation<T>({ data }: { data: T }): TDbOperation<T> {
	return {
		result: data,
		success: true,
		message: 'success'
	};
}

export function failedOperation<T>({ message = "Failed to retrieve data" }: { message?: string } = {}): TDbOperation<T> {
	return {
		result: null,
		success: false,
		message
	};
}
