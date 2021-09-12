import { useUser } from "../lib/hooks"
import { useIdentity } from "../lib/withIdentity";

export default function Home() {
  const user = useUser();
  const identity = useIdentity();
  return (
    <div className="app">
      <h1>E-commerce App With Passport and Next.js</h1>
      {user && <h3>Currently Logged in as: {user.username}</h3>}
      {identity && <h3>Currently Logged in as: {identity.username}</h3>}

    </div>
  )
}
