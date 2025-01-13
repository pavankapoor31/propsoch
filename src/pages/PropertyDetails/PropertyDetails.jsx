import React, { useEffect, useState } from "react";
import { Box, Typography, Chip, IconButton, Button, Divider, Grid } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MapIcon from "@mui/icons-material/Map";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import { propertyImages } from "../../utils/data";

const PropertyDetails = ({ label, title, price, location, mapAddress, lat = 0, lng = 0 }) => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        const randomLength = Math.floor(Math.random() * (9 - 4 + 1)) + 4;
        setImages(JSON.parse(JSON.stringify(propertyImages)).sort(() => Math.random() - 0.5).slice(0, randomLength));
    }, [])
    return (
        <Box
            sx={{
                paddingBottom: "2rem",
            }}
        >
            {/* Image Slider */}
            <Box position="relative" width={"100%"}>
                <Box
                    sx={{
                        height: "20rem", // Fixed height
                        width: "100%",

                    }}
                >
                    <ImageSlider images={images} />
                </Box>
            </Box>

            {/* Property Details */}
            <Box p={2}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight="bold" color="black">
                        {title}
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                        {price}
                    </Typography>
                </Grid>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", mt: 1 }}
                >
                    <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                    {location}
                </Typography>
            </Box>

            {/* Location Map */}
            <Box p={2}>
                <Typography variant="subtitle1" fontWeight="bold" color="black">
                    Location
                </Typography>
                <Box mt={2} sx={{ height: "20rem", width: "100%" }}>
                    {/* React Leaflet Map */}
                    <MapContainer
                        center={[lat, lng]} // Latitude and longitude for map center
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[lat, lng]} icon={new Icon({ iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png", iconSize: [25, 41], iconAnchor: [12, 41] })}>
                            <Popup>
                                <Typography variant="body2">{mapAddress}</Typography>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Box>

            </Box>

            {/* Nearby Amenities */}
            <Box p={2}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Chip label="2 Hospital" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={4}>
                        <Chip label="4 Gas stations" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={4}>
                        <Chip label="2 Schools" sx={{ width: "100%" }} />
                    </Grid>
                </Grid>
            </Box>
            <Divider sx={{ mt: 2 }} />

            {/* Property Amenities */}
            <Box p={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Property Amenities
                </Typography>
                <Box mt={1} display="flex" gap={2}>
                    <Chip
                        label="Apartment"
                        icon={<ApartmentIcon color="white" />}
                        sx={{ borderRadius: "16px", backgroundColor: "#234F68", color: 'white' }}

                    />
                    <Chip
                        label="House"
                        icon={<HomeIcon />}
                        sx={{ borderRadius: "16px" }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PropertyDetails;
