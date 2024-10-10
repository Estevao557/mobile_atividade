
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    color?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, color }) => {
    return (
        <TouchableOpacity
            style={[styles.button, color ? { backgroundColor: color } : {}]}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CustomButton;
