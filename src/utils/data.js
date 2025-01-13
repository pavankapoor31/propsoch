export const propertyImages = [
    ...Array.from({ length: 16 })
        .map((_, i) => `/src/assets/images/property_${i < 9 ? '0' + (i + 1) : i + 1}.jpg`)
].map((image) => new URL(image, import.meta.url).href); 
