export declare function ok<T>(data: T, message?: string): {
    success: boolean;
    message: string;
    data: T;
};
export declare function fail(message: string, details?: unknown): {
    success: boolean;
    error: {
        message: string;
        details: unknown;
    };
};
//# sourceMappingURL=apiResponse.d.ts.map