import { Session } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthState, User } from "../../types/global";
import { supabase } from "../lib/supabase";

// Create AuthContext with a default value
const AuthContext = createContext<AuthState>({
  user: null,
  mount: true,
  session: null,
});

// AuthProvider Component
export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [mount, setMount] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // Get the current session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Error fetching session:", sessionError);
          setMount(false);
          return;
        }

        setSession(session);

        // Fetch user details if session exists
        if (session) {
          const { data: user, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (userError) {
            console.error("Error fetching user data:", userError);
          } else {
            setUser(user);
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setMount(false);
      }
    };

    // Call fetchSession initially
    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, mount, user }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
