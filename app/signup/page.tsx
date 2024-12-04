"use client"
import axios from "axios";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

const signUp = () => {
  const user = useUser();
  const data = {
    id: 1,
    name: "Richu Sony",
    email: "sonyrichu4@gmail.com",
    createdAt: "08/12/2024"
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const reqData = user
    // const res = await axios.post("http://localhost:3000/signup/api", reqData);
    console.log(user);
  }

  return (
    <div>
      <button onClick={handleSubmit}>submit</button>
      <SignedOut><SignInButton/></SignedOut>
      <SignedIn><UserButton /></SignedIn>
    </div>
  )
}
export default signUp