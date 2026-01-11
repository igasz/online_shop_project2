import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import bgImage from '../assets/new_collection.jpg';

function LandingPage() {
    const { user } = useAuth();

    const containerStyle = {
        display: 'flex',
        height: 'calc(100vh - 85px)',
        width: '100%',
        overflow: 'hidden'
    };

    const leftSideStyle = {
        flex: '1', 
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative' as const,
        textDecoration: 'none'
    };

    const overlayStyle = {
        position: 'absolute' as const,
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)'
    };

    const titleStyle = {
        position: 'relative' as const,
        color: '#fff',
        fontFamily: 'var(--font-heading)',
        fontSize: '4rem',
        textTransform: 'uppercase' as const,
        letterSpacing: '5px',
        textAlign: 'center' as const,
        border: '2px solid #fff',
        padding: '20px 40px'
    };

    const rightColStyle = {
        flex: '1', 
        display: 'flex',
        flexDirection: 'column' as const
    };

    const tileStyle = {
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        borderLeft: '1px solid #fff'
    };

    return (
        <div style={containerStyle}>
            
            <Link to="/shop" style={leftSideStyle}>
                <div style={overlayStyle}></div>
                <h1 style={titleStyle}>
                    NOWA<br />KOLEKCJA
                </h1>
            </Link>

            <div style={rightColStyle}>
                <Link to="/login" style={{ ...tileStyle, backgroundColor: '#f4f1ea', color: 'var(--color-text-main)' }} 
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eaddcf'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f4f1ea'}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', letterSpacing: '2px', margin: 0 }}>ZALOGUJ SIĘ</h2>
                    </div>
                </Link>
                
                <Link to="/register" style={{ ...tileStyle, backgroundColor: 'var(--color-text-main)', color: '#efe8dc' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3e2b22'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-text-main)'}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', letterSpacing: '2px', margin: 0, color: '#f4f1ea' }}>UTWÓRZ KONTO</h2>
                    </div>
                </Link>
                
            </div>
        </div>
    );
}

export default LandingPage;