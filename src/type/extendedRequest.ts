import type { Request } from "express";

export type ExtendedRequest = Request & {
  usernameLogged?: string;
  userFound?: any;
  accountType?: string
}