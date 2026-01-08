import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        const success = login(username, password);

        if (success) {
            navigate('/');
        } else {
            setError('Nieprawidłowy login lub hasło');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '40px', border: '1px solid var(--color-border)', textAlign: 'center'}}>
            <h1 style={{ marginBottom: '30px' }}>Zaloguj się</h1> 

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <input 
                    type="text"
                    placeholder="Login"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                
                <input 
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>

                {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

                <button type="submit" style={{ padding: '15px', fontWeight: 'bold' }}>
                    ZALOGUJ
                </button>
            </form>
        </div>
    )
}

export default Login;