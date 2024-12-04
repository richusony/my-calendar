"use client"
import axios from "axios";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const signUp = () => {
  const data = {
    id: 1,
    name: "Richu Sony",
    email: "sonyrichu4@gmail.com",
    createdAt: "08/12/2024"
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
  
    await axios.post("http://localhost:3000/signup/api", data);
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