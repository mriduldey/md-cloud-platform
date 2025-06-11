import { Buffer } from 'buffer';

export function uploadFile(fileName: string, data: Buffer): boolean {
    console.log(`Uploading ${fileName}...`);
    // simulate upload
    return true;
}
