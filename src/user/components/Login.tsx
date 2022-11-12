import { CleaningServices } from "@mui/icons-material"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../hooks/zustand/auth"
import { loginApi } from "../service/Authentication"

export type LoginFormData = {
    username: string
    password: string
}

function Login() {
    const {
        register,
        handleSubmit,
    } = useForm<LoginFormData>()

    let [loginError, setLoginError] = useState();

    let navigate = useNavigate()

    const updateAuth = useAuthStore((state) => state.updateAuth)
    const handleFormSubmit: SubmitHandler<LoginFormData> = async (data) => {
        console.log(data.username, data.password)
        // loginApi
        //   .add({ username: 'hoangnd25@fpt.com.vn', password: 'ArianaGrande2' })
        //   .then((res) => {
        //     dispatch(logIn({ username: 'hoang', password: 'hoang123' }))
        //   })
        //   .catch((err) => console.log(err))
        try {
            const response = await loginApi(data.username, data.password)
            console.log('in')
            console.log('response.data.id ', response.data.id )
            updateAuth({ newAccessToken: response.data.accessToken, newRole: response.data.type, newName: response.data.name, newId: response.data.id })
            navigate('/shop')
        } catch (error: any) {
            setLoginError(error);
            console.log('this bug', error)
        }

    }

    return (
        <div className="login-container">
            <div className="account section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="login-form border p-5">
                                <div className="text-center heading">
                                    <h2 className="mb-2">Login</h2>
                                    <p className="lead">Don’t have an account? <a href="#">Create a free account</a></p>
                                </div>
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <div className="form-group mb-4">
                                        <label htmlFor="#">Enter username</label>
                                        <input type="text" className="form-control" placeholder="Enter Username" {...register('username')} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="#">Enter Password</label>
                                        <a className="float-right" href="">Forget password?</a>
                                        <input type="password" className="form-control" placeholder="Enter Password" {...register('password')} required />
                                    </div>
                                    {loginError && <p className="text-danger my-4">{loginError}</p>}
                                    <input type="submit" className="btn btn-main mt-3 btn-block" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login