import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
    username: string;
    role: 'admin' | 'user';
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const MOCK_USERS = [
    { username: 'student', password: '123', role: 'user' },
    { username: 'prowadzacy', password: '123', role: 'admin' },
    { username: 'Iga', password: '123', role: 'user' }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    // useEffect(() =>  {
    //     const savedUser = localStorage.getItem('user');
    //     if (savedUser) {
    //         setUser(JSON.parse(savedUser));
    //     }
    // }, []);

    useEffect(() =>  {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                // Próbujemy parsować. Jak się nie uda, to zadziała catch
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error("Błąd odczytu użytkownika z localStorage:", error);
                localStorage.removeItem('user'); // Czyścimy błędne dane
            }
        }
    }, []);

    const login = (username: string, password: string) => {
        const foundUser = MOCK_USERS.find(u => u.username === username && u.password === password);

        if (foundUser) {
            const userData = { 
                username: foundUser.username, 
                role: foundUser.role as 'user' | 'admin' 
            };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(("useAuth musi być używane wewnątrz AuthProvider"));
    }
    return context;
}