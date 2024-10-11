// styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0f7fa',
        paddingHorizontal: 20,
        paddingVertical:80
    },
    input: {
        borderWidth: 1,
        borderColor: '#4db6ac', // Teal border
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#ffffff', // White background for input
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5, // For Android
    },
    button: {
        backgroundColor: '#00796b', // Dark teal button
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: '#ffffff', // White text
        fontSize: 18,
        fontWeight: 'bold',
    },
    locationText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#00695c', // Darker teal
        marginVertical: 10,
        textAlign: 'center',
    },
    averageTempText: {
        fontSize: 22,
        color: '#004d40', // Even darker teal
        marginBottom: 10,
        textAlign: 'center',
    },
    weatherImage: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginVertical: 10,
    },
    forecastText: {
        fontSize: 20,
        marginVertical: 5,
        textAlign: 'center',
        color: '#00796b', // Dark teal
    },
    errorText: {
        color: 'red',
        marginVertical: 10,
        textAlign: 'center',
    },
    suggestion: {
        padding: 15,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    suggestionText: {
        fontSize: 18,
        color: '#004d40',
    },
});

export default styles;
