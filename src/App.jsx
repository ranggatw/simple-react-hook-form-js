import "./App.css"
import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

function App() {

  const schema = z.object({
    firstName: z.string().min(2, { message: "First Name must be at least 2 characters long" }),
    lastName: z.string().min(2, { message: "Last Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    age: z.number().min(18, { message: "You must be at least 18 years old" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  }).refine( (data) => data.password === data.confirmPassword, { message: "Passwords must match", path: ["confirmPassword"] })

  const { register, handleSubmit, formState: { errors } } = useForm({resolver: zodResolver(schema)})
  
  const onSubmit = (data) => {
    console.log(data, "data submit")
  }

  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>First Name: </label>
          <input type="text" {...register("firstName")} />
          {errors.firstName && <span>{errors.firstName.message}</span>}
          <label>Last Name: </label>
          <input type="text" {...register("lastName")} />
          {errors.lastName && <span>{errors.lastName.message}</span>}
          <label>Email: </label>
          <input type="email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
          <label>Age: </label>
          <input type="number" {...register("age", { valueAsNumber: true})} />
          {errors.age && <span>{errors.age.message}</span>}
          <label>Password: </label>
          <input type="password" {...register("password")} />
          {errors.password && <span>{errors.password.message}</span>}
          <label>Confirm Password: </label>
          <input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

          <input type="submit" />
        </form>
      </div>
    </>
  );
}

export default App
