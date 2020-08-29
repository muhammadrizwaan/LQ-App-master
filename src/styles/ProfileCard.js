import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        width: '90%', 
        backgroundColor: 'white', 
        alignSelf: 'center', 
        marginTop: 90,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 7
    },
    profileImg: {
        width: 127, 
        height: 127, 
        borderRadius: 63.5, 
        alignSelf: 'center', 
        marginTop: -70,
        backgroundColor: 'white'
    },
    usernameStyle: {
        color: '#7F7F7F',
        fontSize: 15,
        fontWeight: "800",
        textTransform: 'uppercase',
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 15,
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomColor: 'rgba(123, 123, 123, 0.5)',
        borderBottomWidth: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    infoKeyStyle: {
        fontSize: 13,
        textTransform: 'uppercase',
        color: '#7B7B7B',
        // opacity: 0.5
    },
    infoValStyle: {
        fontSize: 13,
        color: '#1E2E50',
        marginLeft: 'auto'
    }
})