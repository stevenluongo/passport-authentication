import { useUser } from "../lib/hooks"

export default function Home() {
  const user = useUser();
  return (
    <div className="app">
      <h1>E-commerce App With Passport and Next.js</h1>
      {user && <h3>Currently Logged in as: {user.username}</h3>}
    </div>
  )
}
