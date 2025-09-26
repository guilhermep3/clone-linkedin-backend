import type { Request } from "express";

export type ownerType = 'user' | 'company'

export type ExtendedRequest = Request & {
  usernameLogged?: string;
  userFound?: any;
  accountType?: ownerType
}