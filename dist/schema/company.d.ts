import z from "zod";
export declare const companySchema: z.ZodObject<{
    name: z.ZodString;
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    industry: z.ZodString;
    bio: z.ZodOptional<z.ZodString>;
    about: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    avatar: z.ZodDefault<z.ZodString>;
    cover: z.ZodDefault<z.ZodString>;
    presentation_video_url: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodEnum<{
        Small: "Small";
        Medium: "Medium";
        Large: "Large";
    }>>;
    verified: z.ZodDefault<z.ZodBoolean>;
}, z.z.core.$strip>;
export declare const updateCompanySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    industry: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    about: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    cover: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    presentation_video_url: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodEnum<{
        Small: "Small";
        Medium: "Medium";
        Large: "Large";
    }>>;
    verified: z.ZodDefault<z.ZodBoolean>;
}, z.z.core.$strip>;
//# sourceMappingURL=company.d.ts.map