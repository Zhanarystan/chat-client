import React, { useState } from "react";
import { useStore } from "../../app/stores/store";

export default function LoginPage(){

    const {userStore} = useStore();

    const {login} = userStore;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="card mx-auto" style={{
                height: "250px",
                width:"50%", 
            }}>
            <div className="card-body">
                <form onSubmit={(e) => {e.preventDefault(); login({email, password})}} className="mt-5">
                    <div className="form-group">
                        <input 
                            className="form-control" 
                            type="text" 
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <input 
                            className="form-control" 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>    
                    <div className="d-grid gap-2 mt-4">
                        <button className="btn btn-success" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}