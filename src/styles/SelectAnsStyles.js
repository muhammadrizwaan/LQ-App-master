import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
        width: '85%',
        alignSelf: 'center',
        marginTop: 20
    },
    competencyTitleStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
        color: '#1E2E50',
        textTransform: 'uppercase',
    },
    descCompetencyStyle: {
        fontSize: 11,
        color: '#1E2E50',
        fontFamily: 'Montserrat',
        marginTop:5
    },
    selectedTextStyle : {
        fontSize: 10,
        color: '#1E2E50',
        marginTop: 10
    },
    ansStyle: {
        color: "#0078C7",
        fontSize: 12,
        marginTop: 5
    }
})