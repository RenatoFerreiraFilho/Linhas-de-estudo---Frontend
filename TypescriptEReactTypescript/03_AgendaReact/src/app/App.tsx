import { CalendarScreen } from "./CalendarScreen";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { IUser, getUserEndpoint, signOutEndpoint } from "./backend";
import { LoginScreen } from "./LoginScreen";
import { authContext } from "./authContext";

function App() {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        getUserEndpoint().then(setUser, () => setUser(null));
    }, []);

    function signOut() {
        setUser(null);
        signOutEndpoint();
    }

    if (user) {
        return (
            <authContext.Provider value={{ user, signOut }}>
                <Routes>
                    <Route
                        path="/calendar/:month"
                        element={<CalendarScreen />}
                    />
                </Routes>
            </authContext.Provider>
        );
    } else {
        return <LoginScreen onSignIn={setUser} />;
    }
}

export default App;
