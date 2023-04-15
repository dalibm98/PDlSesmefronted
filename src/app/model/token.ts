import { TokenType } from "./token-type";
import { User } from "./user";

export interface Token {
    id: number;
    token: string;
    tokenType: TokenType;
    revoked: boolean;
    expired: boolean;
    user: User;
}
