import z from "zod";
/**
 * Pré-processador para aceitar data enviada como string (ex: "1990-01-01")
 * e transformar em Date, ou aceitar undefined/null.
 */
export const parseOptionalDate = z.preprocess((arg) => {
    if (typeof arg === "string" && arg.trim() !== "") {
        const d = new Date(arg);
        return isNaN(d.getTime()) ? arg : d;
    }
    return undefined;
}, z.date().optional());
//# sourceMappingURL=parseDate.js.map