import React from "react";
import GradeIcon from '@mui/icons-material/Grade';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';

const SingleItemHeader = ({ data }) => {
    if (!data || !data.show) return <div style={{color:'white', padding:'40px'}}>Loading...</div>;

    const { show } = data;

    const rating = show.rating?.average ?? 0;
    const starsCount = Math.round(rating / 2);
    const stars = Array.from({ length: 5 }, (_, i) =>
        i < starsCount
            ? <GradeIcon key={i} style={{ color: '#D22F27' }} />
            : <StarOutlineIcon key={i} style={{ color: '#D22F27' }} />
    );

    const viewers = show.weight ?? '?';

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', backgroundColor: '#141414', padding: '10px', color: '#dedede', gap: '20px', flexWrap: 'wrap' }}>
                
                {/* Left info */}
                <div style={{ flex: 1, minWidth: '300px' }}>
                    {/* Название и рейтинг */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <h2 style={{ textTransform: 'uppercase', margin: 0, fontSize: '30px' }}>{show.name}</h2>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {stars}
                            <span style={{ marginLeft: '5px', color: 'white' }}>{show.rating?.average ?? '?'}</span>
                        </div>
                    </div>

                    {/* Жанр */}
                    <p style={{ color: '#BE2C25', margin: '5px 0', textAlign: 'left', fontWeight: '500' }}>{show.genres?.join(', ') || 'Unknown genre'}</p>

                    {/* Runtime | Ended | Viewers */}
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '10px', fontWeight: '500'}}>
                        <span>{show.runtime ?? '?' } min</span>
                        <span>|</span>
                        <span>{show.ended ?? '?'}</span>
                        <span>|</span>
                        <span>{viewers} views</span>
                    </div>

                    {/* Кнопки */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <ShareIcon style={{ background: '#fff', color: '#D22F27', border: '3px solid gray', borderRadius: '50%', padding: '5px' }} />
                        <FavoriteIcon style={{ background: '#fff', color: '#D22F27', border: '3px solid gray', borderRadius: '50%', padding: '5px' }} />
                        <AddIcon style={{ background: '#fff', color: '#D22F27', border: '3px solid gray', borderRadius: '50%', padding: '5px' }} />
                    </div>

                    {/* Теги фильма */}
                    <div style={{ marginTop: '10px', fontSize: '16px', color: '#ffffffff', textAlign: 'left', fontWeight: '500'}}>
                        <strong style={{ color: '#BE2C25' }}>TAGS: </strong>
                        {(show.tags || show.genres || []).join(', ')}
                    </div>
                </div>

                {/* Image */}
                <div>
                    {show.image?.medium && <img src={show.image.medium} alt={show.name} style={{ borderRadius: '8px', maxHeight: '300px' }} />}
                </div>
            </div>
        </div>
    );
};

export default SingleItemHeader;
