import { useState } from "react";
import Login, { type LoginPayload } from "./screens/Login";
import Chat from "./screens/Chat";

export default function App() {
  const [session, setSession] = useState<LoginPayload | null>(null);

  return (
    <div className="h-full w-full">
      {session ? (
        <Chat
          company={session.company}
          initialRole={session.role}
          onSignOut={() => setSession(null)}
        />
      ) : (
        <Login onLogin={setSession} />
      )}
    </div>
  );
}
