import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import MovieCard from '../components/MovieCard';

export default function HomeScreen({ navigation }) {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFilms();
}, []);

const fetchFilms = async () => {
    try {
        const response = await fetch('https://ghibliapi.vercel.app/films');
        const data = await response.json();
        setFilms(data);
        setLoading(false);
    } catch (error) {
        console.error(error);
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

const renderFilmItem = ({ item }) => (
    <MovieCard
        movie={item}
        onPress={() => navigation.navigate('Detail', { 
        id: item.id,
        title: item.title 
        })}
    />
);

return (
        <View style={styles.container}>
            <FlatList
                data={films}
                renderItem={renderFilmItem}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.list}
            />
        </View>
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
    list: {
        padding: 10,
    },
});