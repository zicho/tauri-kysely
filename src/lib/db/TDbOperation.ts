export type TDbOperation<T> = {
  result: T | null;
  success: boolean;
  message: string;
};

export function successfulOperation<T>({ data }: { data: T }): TDbOperation<T> {
  return {
    result: data,
    success: true,
    message: 'Success!'
  };
}

export function failedOperation<T>({
  message = "Database operation failed",
  error
}: {
  message?: string;
  error?: unknown
} = {}): TDbOperation<T> {
  const errorMessage = error && typeof error === "object" && "message" in error ? (error as { message: string }).message : "Unknown error";

  console.error(errorMessage);
  
  return {
    result: null,
    success: false,
    message: errorMessage || message,
  };
}
