declare module "react-native-config" {
    export interface NativeConfig {
        API_URL: string;
        OPENAI_API_KEY: string;
        GROQ_API_KEY: string;
    }

    export const Config: NativeConfig;
    export default Config;
}
