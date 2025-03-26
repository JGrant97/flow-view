import { z } from "zod";

const thumbnailFileSizeLimit = 10 * 1024 * 1024; // 10MB
const contentFileSizeLimit = 1000 * 1024 * 1024; // 1GB

export const uploadContentFormSchema = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    thumbnail: z
        .instanceof(File)
        .refine(
            (file) =>
                [
                    "image/png",
                    "image/jpeg",
                    "image/jpg",
                ].includes(file.type),
            { message: "Invalid image file type" }
        )
        .refine((file) => file.size <= thumbnailFileSizeLimit, {
            message: "File size should not exceed 10MB",
        }),
    content: z
        .instanceof(File)
        .refine(
            (file) =>
                [
                    "video/mp4",
                ].includes(file.type),
            { message: "Invalid content file type" }
        )
        .refine((file) => file.size <= contentFileSizeLimit, {
            message: "File size should not exceed 10MB",
        }),
    releaseData: z.string().optional(),
});