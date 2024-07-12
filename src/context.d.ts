import type { Context, SessionFlavor } from "grammy";
import { SessionData } from "./sessiondata";
export type MainContext = Context & SessionFlavor<SessionData>;
