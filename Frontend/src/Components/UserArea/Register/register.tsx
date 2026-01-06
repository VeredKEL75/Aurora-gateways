
import { useForm } from "react-hook-form";
import { userService } from "../../../Services/UserService";
import { UserModel } from "../../../Models/UserModel";
import { notify } from "../../../Utils/Notify";
import "./Register.css";




export function Register() {

    const { register, handleSubmit } = useForm<UserModel>();

    async function send(user: UserModel) {
        try {
            await userService.register(user);
            notify.success("Welcome");
        }
        catch (err: any) {
            notify.error(err);
        }

    }

    return (
        <div className="Register">
            <h1>Register</h1>

            <form onSubmit={handleSubmit(send)}>

                <label htmlFor="">First Name:</label>
                <input type="text" {...register("firstName")} />

                <label htmlFor="">Last Name:</label>
                <input type="text" {...register("lastName")} />


                <label htmlFor="">Email:</label>
                <input type="email" {...register("email")} />

                <label htmlFor="">Password:</label>
                <input type="text" {...register("password")} />

                <button type="submit"> Register </button>

            </form>
        </div>
    );
}