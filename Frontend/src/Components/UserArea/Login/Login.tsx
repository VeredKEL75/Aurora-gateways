import "./Login.css";
import { useForm } from "react-hook-form";
import { notify } from "../../../Utils/Notify";
import { userService } from "../../../Services/UserService";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../../Utils/UseTitle";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineEyeInvisible } from "react-icons/ai";


export function Login() {
    useTitle("Login");
    const { register, handleSubmit } = useForm<CredentialsModel>();
    //for the eye icon
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();


    function toRegister() {
        navigate("/register");
    }
    async function send(credential: CredentialsModel) {
        try {
            await userService.login(credential);

            notify.success("Welcome Back");
            console.log(localStorage.getItem("token"));

            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }

    }

    return (
        <div className="Login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit(send)}>

                <label htmlFor="">Email:</label>
                <input type="email" {...register("email")} required />
                {/* setting the password to be visible or not and showing the eye icon */}
                <label htmlFor="password" className="flex self-center mx-8 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">Password:</label>

                <div className="passwordWrapper">
                    <input className="passwordInput" type={visible ? "text" : "password"}  {...register("password")} required minLength={4} />
                    <div className="eyeIcon" onClick={() => setVisible(!visible)}>{visible ? <AiOutlineEyeInvisible /> : <IoEyeOutline />}</div>

                </div>

                <button type="submit">Log in</button>

            </form>
            <p>Don't have an account?</p>
            <button onClick={toRegister}>Register now</button>
        </div>
    );
}