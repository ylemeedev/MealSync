export interface PayloadUpdateMe {
    email: string;
    userName: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    dateOfBirth?: Date;
}

export interface UserState {
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    dateOfBirth: Date;
    userPreferences: UserPreferences[];
}

export interface UserPreferences {
    preference: Preference;
}

export interface Preference {
    id: number;
    code: string;
    label: string;
    category: PreferenceCategory;
}

export type PreferenceCategory = "diet" | "exclusion" | "goal" | "lifestyle";

export interface UserSettingsHeaderProps {
    title: string
} 
