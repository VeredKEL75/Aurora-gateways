class AppConfig {
    // vacation
    public readonly vacationsUrl = "http://localhost:4040/api/vacations/";
    public readonly likeUrl = "http://localhost:4040/api/like-vacations/";
    public readonly unlikeUrl = "http://localhost:4040/api/unlike-vacations/";

    // user
    public readonly registerUrl = "http://localhost:4040/api/register/";
    public readonly loginUrl = "http://localhost:4040/api/login/";


}

export const appConfig = new AppConfig();
