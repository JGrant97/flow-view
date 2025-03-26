"use server"

import { uploadContentFormSchema } from "./uploadContentFormSchema";
import { UploadContentState } from "./uploadContentState";

export async function uploadContentAction(state: UploadContentState, formData: FormData) {
    const validatedFields = uploadContentFormSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        thumbnail: formData.get('thumbnail'),
        content: formData.get('content'),
        releaseData: formData.get('releaseData'),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
}