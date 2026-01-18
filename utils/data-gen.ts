import { randomUUID } from "crypto";

export type EmployeeData = {
    firstName: string;
    lastName: string;
    email: string;

    // Optional fields 
    phoneNumber?: string;
    jobTitle?: string;
    startDate?: string; // yyyy-mm-dd
    sendRegistrationEmail?: boolean; // default true
};

function uniq(): string {
    return randomUUID();
}

// Generates realistic, unique employee test data
 
export function buildEmployee(overrides: Partial<EmployeeData> = {}): EmployeeData {
    const id = uniq();

    return {
        firstName: `Test${id.slice(-4)}`,
        lastName: `User${id.slice(-3)}`,
        email: `ryanb1463+e2e-${id}@gmail.com`,
        phoneNumber: `07${Math.floor(100000000 + Math.random() * 900000000)}`,
        jobTitle: `QA ${id.slice(-5)}`,
        startDate: "2026-01-18",
        sendRegistrationEmail: true,
        ...overrides,
    };
}
