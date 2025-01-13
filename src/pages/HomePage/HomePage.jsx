// src/pages/HomePage/HomePage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import moment from "moment";
import PropertyDetails from "../PropertyDetails/PropertyDetails";

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 16px;
  background-color: #f9f9f9;
  width: 100vw;
`;

const PropertyList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
  gap: 1rem;
`;

const Loading = styled.div`
  text-align: center;
  padding: 16px;
`;

const HomePage = () => {
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [openPropertyDetails, setOpenPropertyDetails] = useState(false);
    const [bottomNavigationValue, setBottomNavigationValue] = useState("Explore");
    const [wishListProperties, setWishListProperties] = useState([]);

    const fetchProperties = async (currentPage) => {
        try {
            const newProperties = await Promise.resolve(
                Array.from({ length: 10 }).map((_, index) => {
                    const startDate = moment().subtract(Math.floor(Math.random() * 30), 'days').format('YYYY-MM-DD');
                    const endDate = moment().add(Math.floor(Math.random() * 30), 'days').format('YYYY-MM-DD');
                    const dateRange = `${moment(startDate).format('DD MMM')} - ${moment(endDate).format('DD MMM')}`;

                    return {
                        id: `${currentPage}-${index + 1}`,
                        name: `Property ${(currentPage - 1) * 10 + index + 1}`,
                        label: index === 0 ? "New" : index === 1 ? "Most liked" : null,
                        title: `Property ${(currentPage - 1) * 10 + index + 1}`,
                        location: "Koramangala, Bangalore",
                        lat: 12.927515501701121 + (Math.random() - 0.5) / 100,
                        lng: 77.62170672698511 + (Math.random() - 0.5) / 100,
                        price: `${(Math.random() * 2 + 1).toFixed(1)} Cr`,
                        likes: Math.floor(Math.random() * 10000),
                        rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
                        imageUrl: `https://picsum.photos/200/300?random=${(currentPage - 1) * 10 + index + 1}`,
                        amenities: [
                            `${Math.floor(Math.random() * 5) + 1} Hospitals`,
                            `${Math.floor(Math.random() * 5) + 1} Gas Stations`,
                            `${Math.floor(Math.random() * 5) + 1} Schools`,
                        ],
                        startDate,
                        endDate,
                        dateRange,
                        views: Math.floor(Math.random() * 10000),
                        type: "apartment"
                    };
                })
            );

            if (JSON.stringify(newProperties) !== JSON.stringify(properties)) {
                setProperties((prev) => {
                    if (prev && prev[0] && prev[0].id !== newProperties[0].id) return [...prev, ...newProperties];
                    return [...newProperties];
                });
            }

            if (currentPage >= 10) setHasMore(false);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    useEffect(() => {
        fetchProperties(page);
    }, [page]);

    const fetchMoreData = () => {
        setPage((prev) => prev + 1);
    };

    const onPropertyClick = (index) => {
        setBottomNavigationValue(null)
        setOpenPropertyDetails(properties[index]);
    }

const onWishList = (property) => {
    setWishListProperties((prev) => [...prev, property]);
};


    return (
        <AppContainer>
            <Header />
            {openPropertyDetails && !bottomNavigationValue ? <PropertyList>
                <PropertyDetails {...openPropertyDetails} />
            </PropertyList> :
                <InfiniteScroll
                    dataLength={properties.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<Loading>Loading...</Loading>}
                    endMessage={<p style={{ textAlign: "center" }}>You have seen it all!</p>}
                >
                    <PropertyList>
                        {bottomNavigationValue === "Wishlists" ? wishListProperties.map((property) => (
                            <PropertyCard key={property.id} {...property} onClickHandler={(id) => onPropertyClick(wishListProperties.indexOf(property))} />
                        )) : properties.map((property, index) => (
                            <PropertyCard key={property.id} {...property} onWishList={()=>onWishList(property)} onClickHandler={(id) => onPropertyClick(index)} />
                        ))}
                    </PropertyList>
                </InfiniteScroll>
            }
            <Footer
                value={bottomNavigationValue}
                onChange={(event, newValue) => setBottomNavigationValue(newValue)}
            />
        </AppContainer>
    );
};

export default HomePage;