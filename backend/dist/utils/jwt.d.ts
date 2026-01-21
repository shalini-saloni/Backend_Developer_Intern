export type JwtPayload = {
    userId: string;
    role: "USER" | "ADMIN";
};
export declare function signJwt(payload: JwtPayload): string;
export declare function verifyJwt(token: string): JwtPayload;
export declare function decodeJwt(token: string): JwtPayload | null;
//# sourceMappingURL=jwt.d.ts.map