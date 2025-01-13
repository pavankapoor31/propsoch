import { Box, Card, CardMedia, Typography, IconButton, Chip, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ImageSlider from '../ImageSlider/ImageSlider';
import { useEffect, useState } from 'react';
import { propertyImages } from '../../utils/data';
import { Star } from '@mui/icons-material';

const PropertyCard = ({
    imageUrl,
    label,
    views,
    rating,
    title,
    dateRange,
    onClickHandler,
    id,
    onWishList
}) => {

    const [images, setImages] = useState([]);
    const [wishListed, setWishListed] = useState(false);
    useEffect(() => {
        const randomLength = Math.floor(Math.random() * (9 - 4 + 1)) + 4;
        setImages(JSON.parse(JSON.stringify(propertyImages)).sort(() => Math.random() - 0.5).slice(0, randomLength));
    }, [])

    return (
        <Box
            sx={{
                width: { xs: "100%", sm: "14rem", md: "16rem" },
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
            }}
            onClick={() => {
                console.log("clicked");
                onClickHandler(id);
            }}
        >
            <Box position="relative" width={"100%"}>
                <Box
                    sx={{
                        height: '20rem', // Fixed height
                        width: "100%",
                        overflow: 'hidden', // Prevents the image from stretching beyond the container
                    }}
                >
                    <ImageSlider images={images} />
                </Box>
                {label && (
                    <Chip
                        label={label}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            backgroundColor: 'white',
                            fontWeight: 'bold',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        }}
                    />
                )}
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        backgroundColor: 'white',
                        '&:hover': {
                            backgroundColor: 'white',
                        },
                    }} 
                    onClick={(e)=>{
                        e.stopPropagation();
                        onWishList();
                        setWishListed(true)
                    }}
                >
                    <FavoriteBorderIcon color={wishListed ? "error" : "action"} backgroundColor={wishListed ? "error" : "action"}/>
                </IconButton>
            </Box>

            {/* Content Section */}
            <Box p={2}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={0}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <VisibilityIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                            {views}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <Star
                            fontSize='8'
                            color={
                                rating > 4.5
                                    ? "success"  // green
                                    : rating >= 3.5
                                        ? "warning"  // orange
                                        : "error"    // red
                            }
                        />
                        <Typography variant="body2" color={
                            rating > 4.5
                                ? "success"  // green
                                : rating >= 3.5
                                    ? "warning"  // orange
                                    : "error"    // red
                        }>
                            {rating}
                        </Typography>
                    </Box>
                </Box>
                <Typography sx={{fontSize:12}} color='black' component="div">
                    {title}
                </Typography>
                <Typography sx={{fontSize:10}} variant="body2" color="text.secondary">
                    {dateRange}
                </Typography>
            </Box>
        </Box>
    );
};

export default PropertyCard;
