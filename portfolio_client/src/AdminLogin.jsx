import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PostInput } from "./postInput";

export function AdminLogin() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important for Flask session cookies
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMsg(err.error || "Login failed");
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("Logged in:", data);

      // Redirect only on success
      navigate("/");
    } catch (err) {
      console.error(err);
      setErrorMsg("Server unreachable. Make sure Flask is running on port 5555.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="section-header">Admin Login</h1>

      {errorMsg && <p className="error-text">{errorMsg}</p>}

      <PostInput
        labelTitle={"Email:"}
        inputType={"text"}
        placeholder={"Please enter email"}
        register={register("email", {
          required: "Please enter your email",
        })}
      />

      <PostInput
        labelTitle={"Password:"}
        inputType={"password"}
        placeholder={"Please enter password"}
        register={register("password", {
          required: "Please enter your password",
        })}
      />

      <button disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}


// import { useState } from "react"
// import { useFetch } from "./useFetch"
// import { useForm } from "react-hook-form"
// import { usePost } from "./usePost"
// import { PostInput } from "./postInput"
// import { useNavigate } from "react-router-dom"

// export function AdminLogin(){
//     const [loggedInUser, setLoggedInUser] = useState(false)
//     const navigate = useNavigate()
    
//     const{
//         register,
//         handleSubmit,
//         formState: {errors}
//     } = useForm()

//     const onSubmit = (formData) => {
//         usePost("/api/login", formData, loggedInUser, setLoggedInUser, null)
//         navigate("/")
//     }

//     return(
//         <form
//             className="form"
//             onSubmit={handleSubmit(onSubmit)}
//         >
//             <h1
//                 className="section-header"
//             >
//                 Login
//             </h1>

//             <PostInput 
//                 labelTitle={"Email: "}
//                 inputType={"text"}
//                 placeholder={"Please enter email"}
//                 additionalClassName={null}
//                 register={register("email", {
//                     required: "Please enter your email"
//                 })}
//             />

//             <PostInput 
//                 labelTitle={"Password: "}
//                 inputType={"password"}
//                 placeholder={"Please enter password"}
//                 additionalClassName={null}
//                 register={register("password", {
//                     required: "Please enter your password"
//                 })}
//             />

//             <button>
//                 Login
//             </button>
//         </form>
//     )
// }