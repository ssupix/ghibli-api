import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function MovieCard({ movie, onPress }) {
    return (
        <View style={styles.filmCard}>
        <Image
            source={{ uri: movie.image }} 
            style={styles.poster}
        />
        <Text style={styles.title}>{movie.title}</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>Read More</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    filmCard: {
        flex: 1,
        margin: 8,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        alignItems: 'center',
    },
    poster: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 8,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4a90e2',
        padding: 8,
        borderRadius: 4,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
  },
});
