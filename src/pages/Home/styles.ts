import { Dimensions, StyleSheet } from 'react-native'
import { ScreenContainer } from 'react-native-screens'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },

    buttonContainer: {
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#f8f8f8',
        marginHorizontal: 10,// Para adicionar algum espaço ao redor dos botões
    },

})