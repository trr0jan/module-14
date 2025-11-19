import React from "react";
import { useNavigate } from "react-router-dom";

const ActorItem = ({ actor }) => {
    const navigate = useNavigate();
    if (!actor) return null;

    return (
        <div
            onClick={() => navigate(`/actors/${actor.id}`)}
            style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#41414125',
                marginBottom: '10px',
                borderRadius: '1px',
                gap: '20px',
                color: 'white',
                width: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
            {actor.image?.medium ? (
                <img
                    src={actor.image.medium}
                    alt={actor.name}
                    style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '1px'
                    }}
                />
            ) : (
                <div
                    style={{
                        width: '120px',
                        height: '120px',
                        backgroundColor: '#333',
                        borderRadius: '1px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#888',
                        fontSize: '12px'
                    }}
                >
                    No Image
                </div>
            )}
            <div style={{ fontSize: '16px', fontWeight: '500' }}>
                {actor.name ?? "Unknown"}
            </div>
        </div>
    );
};


export default ActorItem;
