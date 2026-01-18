import * as dotenv from "dotenv";

dotenv.config();

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value || value.trim() === "") {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}

export const env = {
    BASE_URL: requireEnv("BASE_URL"),
    EMAIL: requireEnv("BRIGHTHR_EMAIL"),
    PASSWORD: requireEnv("BRIGHTHR_PASSWORD"),
} as const;