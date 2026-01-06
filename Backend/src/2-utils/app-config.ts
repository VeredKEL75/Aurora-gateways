import dotenv from "dotenv";

// Load ".env" file into process.env object:
dotenv.config();

class AppConfig {
    // Indicates if the app is running in dev or production mode
    public readonly isDevelopment = (process.env.ENVIRONMENT === "development");
    public readonly isProduction = (process.env.ENVIRONMENT === "production");
    public readonly port = 4040;

    // MongoDB connection string from environment variables
    public readonly mongoDbConnectionString = process.env.MONGODB_CONNECTION_STRING!;
    // Base URL for serving images
    public readonly baseImageUrl = process.env.BASE_IMAGE_URL!;
    // Secret key for JWT token creation
    public readonly jwtSecretKey = process.env.JWT_SECRET_KEY!;
    // Salt key for password hashing
    public readonly hashSaltKey = process.env.HASH_SALT_KEY!;

}

export const appConfig = new AppConfig();
