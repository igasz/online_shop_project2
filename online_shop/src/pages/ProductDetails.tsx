import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: {
        rate: number;
        count: number;
    };
}

interface Review {
    id: number;
    author: string;
    email: string;
    rating: number;
    text: string;
}

function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    const [quantity, setQuantity] = useState<number>(1);
    const [stock] = useState<number>(Math.floor(Math.random() * 20) + 1);

    const [reviews, setReviews] = useState<Review[]>([
        { id: 1, author: "Paweł M.", email: "pawel@interia.pl", rating: 5, text: "Absolutnie uwielbiam ten produkt! Wygląda jeszcze lepiej na żywo." },
        { id: 2, author: "Filip Sz.", email: "filip@gmail.com", rating: 4, text: "Dobra jakość, szybka przesyłka." }
    ]);

    const [newReviewText, setNewReviewText] = useState("");
    const [newReviewEmail, setNewReviewEmail] = useState("");
    const [newReviewRating, setNewReviewRating] = useState(5);
    const [error, setError] = useState("");
    const [hover, setHover] = useState(0);

    useEffect(() => {
        if (!id) return;

        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then((data: Product) => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => console.error("Błąd:", err));
    }, [id]);

    const handleAddReview = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        if (!user) {
            navigate('/login');
            return;
        }
        
        if (!newReviewText || !newReviewEmail) {
            setError("Wszystkie pola (e-mail i treść) są wymagane.");
            return;
        }

        const alreadyReviewed = reviews.some(r => r.author === user.username);
        if (alreadyReviewed) {
            setError("Dodałeś już opinię o tym produkcie.");
            return;
        }

        const review: Review = {
            id: Date.now(),
            author: user.username,
            email: newReviewEmail,
            rating: newReviewRating,
            text: newReviewText
        };

        setReviews(prevReviews => [...prevReviews, review]);
        
        setNewReviewText("");
        setNewReviewEmail("");
        setNewReviewRating(5); 
        
        alert("Dziękujemy za opinię!"); 
    };

    const handleDeleteReview = (reviewId: number, author: string) => {
        if (user?.role === 'admin' || user?.username === author) {
            setReviews(reviews.filter(r => r.id !== reviewId));
        }
    };

    const handleButtonClick = () => {
        if (!user) {
            navigate('/login');
        }
    };

    if (loading) {
        return <div style={{textAlign: 'center', marginTop: '50px'}}>Ładowanie detali...</div>;
    }
    if (!product) {
        return <div>Nie znaleziono produktu.</div>;
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

            <div style={{marginBottom: '40px'}}>
                <Link to="/" style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--color-text-sec)', letterSpacing: '1px' }}>
                &larr; Powrót do sklepu
                </Link>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', alignItems: 'center' }}>
                <div style={{ flex: '1 1 400px', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>                
                    <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }}/>
                </div>

                <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', lineHeight: '1.2' }}>
                    {product.title}
                    </h1>

                    <p style={{ fontSize: '1.5rem', color: 'var(--color-accent)', fontWeight: 'bold', margin: '0 0 30px 0' }}>
                    ${product.price}
                    </p>

                    <p style={{ lineHeight: '1.8', color: 'var(--color-text-sec)', marginBottom: '30px' }}>
                    {product.description}
                    </p>

                    <div>
                        <p>
                            {stock < 5 ? `Ostatnie sztuki (${stock} szt.)` : `W magazynie (${stock} szt.)`}
                        </p>
                        <div>
                            <button 
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                style={{ padding: '10px 15px', background: 'transparent', color: 'var(--color-text-main)', fontSize: '1.2rem' }}
                            >-</button>
                            <span style={{ width: '40px', textAlign: 'center', fontWeight: 'bold', fontFamily: 'var(--font-body)' }}>
                                {quantity}
                            </span>
                            <button 
                                onClick={() => setQuantity(q => Math.min(stock, q + 1))}
                                style={{ padding: '0 15px', height: '100%', background: 'transparent', color: 'var(--color-text-main)', fontSize: '1.2rem' }}
                            >+</button>
                        </div>

                        <button 
                            onClick={() => { 
                                    addToCart(product, quantity); 
                                    alert("Dodano do koszyka!"); 
                                }}
                            style={{ flexGrow: 1, backgroundColor: 'var(--color-text-main)', color: '#efe8dc', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                            Dodaj do koszyka
                        </button>
                    </div>
                </div>
            </div>

            <hr style={{ margin: '40px 0', border: '0', borderTop: '1px solid var(--color-border)' }} />

            <section>
                <h2>Opinie ({reviews.length})</h2>

                <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                    <h3>Dodaj swoją opinię</h3>
                    {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
                    
                    <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input 
                            type="email" 
                            placeholder="Twój e-mail" 
                            value={newReviewEmail}
                            onChange={(e) => setNewReviewEmail(e.target.value)}
                            style={{ padding: '10px' }}
                        />
    
                        {/* <div class="rating-container">
                            <p>Twoja ocena:</p>
                            <div class="star-rating">
                                <input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="5 gwiazdek">★</label>
                                <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="4 gwiazdki">★</label>
                                <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="3 gwiazdki">★</label>
                                <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="2 gwiazdki">★</label>
                                <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="1 gwiazdka">★</label>
                            </div>
                        </div> */}

                        <div className="rating-container">
                            <p>Twoja ocena:</p>
                            <div 
                                className="star-rating" 
                                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: '5px', cursor: 'pointer' }}
                                onMouseLeave={() => setHover(0)}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <label 
                                        key={star} 
                                        style={{ cursor: 'pointer' }}
                                        onMouseEnter={() => setHover(star)}>
                                        <input 
                                            type="radio" 
                                            name="rating" 
                                            value={star}
                                            style={{ display: 'none' }} 
                                            onClick={() => setNewReviewRating(star)}/>
                                        <span 
                                            style={{ fontSize: '32px', transition: 'color 0.2s', color: star <= (hover || newReviewRating) ? "var(--color-accent)" : "var(--color-border)"}}>
                                            ★
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <textarea 
                            placeholder="Twoja opinia..." 
                            value={newReviewText}
                            onChange={(e) => setNewReviewText(e.target.value)}
                            style={{ padding: '10px', minHeight: '100px' }}
                        />
                        <button 
                            type={user ? "submit" : "button"}
                            onClick={handleButtonClick}
                            style={{ 
                                cursor: 'pointer', 
                                marginTop: '10px',
                                opacity: user ? 1 : 0.8
                            }} 
                        >
                            {user ? "WYŚLIJ OPINIĘ" : "ZALOGUJ SIĘ, ABY DODAĆ OPINIĘ"}
                        </button>
                    </form>
                </div>


                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {reviews.map(review => (
                        <div key={review.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <strong>{review.author} — {review.rating}/5 ☆</strong>
                                
                                {(user?.role === 'admin' || user?.username === review.author) && ( //admin może usunąć wszystkich
                                    <button 
                                        onClick={() => handleDeleteReview(review.id, review.author)}
                                        style={{ backgroundColor: '#ff4d4f', padding: '5px 10px', fontSize: '0.7rem' }}
                                    >
                                        USUŃ
                                    </button>
                                )}
                            </div>
                            <p style={{ margin: '10px 0' }}>{review.text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>  
    );
}

export default ProductDetails;