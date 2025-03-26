export type UploadContentState = | {
    errors?: {
        title?: string[];
        description?: string[];
        thumbnail?: string[];
        content?: string[];
        releaseData?: string[];
    };
    message?: string;
} | undefined;