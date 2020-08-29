import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    mainImage: {
        width: null, 
        height: '73%'
    },
    secondImageContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignSelf: 'center', 
        marginTop: -35,
        backgroundColor: 'white',
        padding: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondImage: {
        width: 50, 
        height: 50, 
        borderRadius: 25, 
        alignSelf: 'center', 
        // marginTop: -25
    },
    textContainer: {
        marginTop: 20,
        paddingRight: 20,
        paddingLeft: 20
    },
    mainText: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    },
    secondText: {
        fontSize: 20,
        alignSelf: 'center',
        // textTransform: 'uppercase',
        textAlign: 'center'
    },
    progressContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 30,
    },
    progressStyle: {
        // alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: -65
    },
    buttonStyle: {
        marginLeft: 'auto',
        marginRight: 20
    },
    buttonTextStyle: {
        color: '#0078C7',
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})