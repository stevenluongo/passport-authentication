import { NextApiRequest } from "next";
import { UserProps } from "../../../domain/entities/user";

export type NextRouteApiRequest = NextApiRequest & {
    user: Omit<UserProps, 'id' | 'salt' | 'hash' | 'password'>
};