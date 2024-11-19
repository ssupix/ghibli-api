import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    Image, 
    ScrollView, 
    ActivityIndicator, 
    StyleSheet 
} from 'react-native';

export default function DetailScreen({ route }) {
    const { id } = route.params;
    const [film, setFilm] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFilmDetails();
    }, []);

    const fetchFilmDetails = async () => {
        try {
            // Fetch film details
            const filmResponse = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
            const filmData = await filmResponse.json();
            setFilm(filmData);

            // Fetch all characters and filter by movie
            const charactersResponse = await fetch(`https://ghibliapi.vercel.app/people`);
            const charactersData = await charactersResponse.json();
            const filteredCharacters = charactersData.filter((character) =>
                character.films.includes(`https://ghibliapi.vercel.app/films/${id}`)
            );
            setCharacters(filteredCharacters);

            // Fetch all locations and filter by movie
            const locationsResponse = await fetch(`https://ghibliapi.vercel.app/locations`);
            const locationsData = await locationsResponse.json();
            const filteredLocations = locationsData.filter((location) =>
                location.films.includes(`https://ghibliapi.vercel.app/films/${id}`)
            );
            setLocations(filteredLocations);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching film details:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!film) {
        return (
            <View style={styles.centered}>
                <Text>Failed to load film details</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: film.movie_banner }}
                style={styles.banner}
            />
            <View style={styles.content}>
                <Text style={styles.title}>{film.title}</Text>
                <Text style={styles.text}>{film.description}</Text>
                
                <View style={styles.section}>
                    <Text style={styles.text}>Director: {film.director}</Text>
                    <Text style={styles.text}>Release Date: {film.release_date}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subtitle}>Characters:</Text>
                    {characters.length > 0 ? (
                        characters.map((character, index) => (
                            <Text key={index} style={styles.text}>
                                {character.name}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.text}>
                            No character info available for this movie. So sorry!
                        </Text>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.subtitle}>Locations:</Text>
                    {locations.length > 0 ? (
                        locations.map((location, index) => (
                            <Text key={index} style={styles.text}>
                                {location.name}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.text}>
                            No location info available for this movie. So sorry!
                        </Text>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    banner: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        marginBottom: 4,
    },
    section: {
        marginTop: 16,
    }
});
