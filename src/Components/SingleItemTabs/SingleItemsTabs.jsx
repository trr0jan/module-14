import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { FilmContext } from '../../context/FilmsContext';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import GradeIcon from '@mui/icons-material/Grade';

const SingleItemsTabs = () => {
    const { filmId } = useParams();
    const { data } = useContext(FilmContext);
    const selectedFilm = data ? data.find((el) => el.show.id === parseInt(filmId)) : null;
    
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: '#101010'}}>
            <Tabs 
                value={value} 
                onChange={handleChange} 
                centered 
                textColor="white"
                TabIndicatorProps={{ style: { backgroundColor: '#B82B24' } }}
            >
                <Tab 
                    label="Description" 
                    sx={{ color: value === 0 ? '#B82B24' : 'white' }} 
                    style={{padding: '25px 40px', textTransform: 'none'}}
                />
                <Tab 
                    label="Series" 
                    sx={{ color: value === 1 ? '#B82B24' : 'white' }}
                    style={{padding: '25px 40px', textTransform: 'none'}} 
                />
            </Tabs>
            {value === 0 && (
                <Box sx={{ p: 3 , backgroundColor: '#141414'}}>
                    <Typography sx={{ color: '#C5C4C3', textAlign: 'left' }}>
                        <div dangerouslySetInnerHTML={{ __html: selectedFilm.show.summary }} />
                        <hr style={{ backgroundColor: '#272727', height: '1px', border: 'none' }} />
                    </Typography>
                </Box>
            )}
            {value === 1 && (
                <Box sx={{ p: 3 }}>
                    <Typography sx={{ color: 'white', backgroundColor: '#23262B' }}>
                        <table style={{ width: '100%', color: 'white', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '13px', textAlign: "left", width: '30%' }}>Episode</th>
                                    <th style={{ textAlign: "left", width: '15%' }}>Airdate</th>
                                    <th style={{ textAlign: "left", width: '20%' }}>Rating</th>
                                </tr>
                            </thead>
                            <tbody style={{backgroundColor: '#191919', textAlign: 'left'}}>
                                <tr>
                                    <td style={{ padding: '8px' }}>none</td>
                                    <td style={{ padding: '8px' }}>{selectedFilm.show.ended}</td>
                                    <td style={{ padding: '8px', color: '#D22F27' }}>
                                        <GradeIcon />
                                        <GradeIcon />
                                        <GradeIcon />
                                        <GradeIcon />
                                        <GradeIcon />
                                        <span style={{color: 'white'}}>{selectedFilm.show.rating?.average ?? "?"}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px' }}>none</td>
                                    <td style={{ padding: '8px' }}>{selectedFilm.show.ended}</td>
                                    <td style={{ padding: '8px', color: '#D22F27' }}>
                                        <GradeIcon />
                                        <GradeIcon />
                                        <GradeIcon />
                                        <GradeIcon />
                                        <GradeIcon />
                                        <span style={{color: 'white'}}>{selectedFilm.show.rating?.average ?? "?"}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px' }}>none</td>
                                    <td style={{ padding: '8px' }}>{selectedFilm.show.ended}</td>
                                    <td style={{ padding: '8px', color: '#D22F27' }}>
                                        <GradeIcon />
                                        <GradeIcon />
                                        <GradeIcon />
                                        <GradeIcon />
                                        <GradeIcon />
                                        <span style={{color: 'white'}}>{selectedFilm.show.rating?.average ?? "?"}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default SingleItemsTabs;
