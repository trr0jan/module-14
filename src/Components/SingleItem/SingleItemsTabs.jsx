import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

const SingleItemsTabs = ({ data, episodes }) => {
    const [value, setValue] = useState(0);

    if (!data || !data.show) return null;
    const { show } = data;

    const handleChange = (e, newValue) => setValue(newValue);

    return (
        <Box sx={{ width: '100%', bgcolor: '#101010'}}>
            <Tabs
                value={value}
                onChange={handleChange}
                centered
                textColor="white"
                TabIndicatorProps={{ style: { backgroundColor: '#B82B24' } }}
            >
                <Tab label="Description" sx={{ color: value === 0 ? '#B82B24' : 'white' }} />
                <Tab label="Series" sx={{ color: value === 1 ? '#B82B24' : 'white'}} />
            </Tabs>

            {value === 0 && (
                <Box sx={{ p: 3 , backgroundColor: '#141414'}}>
                    <Typography sx={{ color: '#C5C4C3', textAlign: 'left' }}>
                        <div dangerouslySetInnerHTML={{ __html: show.summary ?? "No description available." }} />
                    </Typography>
                </Box>
            )}

            {value === 1 && (
    <Box sx={{ p: 3, backgroundColor: '#141414' }}>
        <Typography sx={{ color: 'white' }}>
            <table style={{ width: '100%', color: 'white', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '12px', textAlign: "center" }}>Episode</th>
                        <th style={{ padding: '12px', textAlign: "center" }}>Airdate</th>
                        <th style={{ padding: '12px', textAlign: "center" }}>Rating</th>
                    </tr>
                </thead>

                <tbody style={{ backgroundColor: '#191919' }}>
                    {episodes.length > 0 ? (
                        episodes.map(ep => (
                            <tr key={ep.id}>
                                <td style={{ padding: '12px', textAlign: "center" }}>
                                    S{ep.season} • E{ep.number} — {ep.name}
                                </td>

                                <td style={{ padding: '12px', textAlign: "center" }}>
                                    {ep.airdate || "?"}
                                </td>

                                <td style={{ padding: '12px', textAlign: "center", color: '#D22F27' }}>
                                    ⭐ {ep.rating?.average != null ? ep.rating.average : "—"}
                                </td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ padding: '12px', textAlign: 'center' }}>
                                No episodes found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Typography>
    </Box>
)}


        </Box>
    );
};

export default SingleItemsTabs;
