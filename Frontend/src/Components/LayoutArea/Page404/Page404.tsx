import "./Page404.css";
import imgSource from "../../../../public/images/404.png"

export function Page404() {

    return (
        <div className="Page404">
            <h1>404</h1>
            <h2>The page you are looking for doesn't exist.</h2>
            <img src={imgSource} alt="" />
        </div>
    );
}
