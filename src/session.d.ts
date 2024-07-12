import { SessionData } from "./sessiondata";
declare const initialSession: import("grammy").MiddlewareFn<import("grammy").Context & import("grammy").SessionFlavor<SessionData>>;
export default initialSession;
