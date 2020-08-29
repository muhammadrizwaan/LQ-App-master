import React from 'react'
import { StyleSheet, Image } from 'react-native'
import {
    View, Text, Icon, Button,
} from 'native-base'

export default ({navigation, competencyName, myLQScore}) => (
    <View style={styles.headerContainer}>
        <Button 
            transparent 
            style={styles.leftIcon}
            onPress={() => navigation.goBack()}
        >
            <Icon name="ios-arrow-back" style={{ color: 'white' }} />
        </Button>
        <View style={styles.centerText}>
            <Text style={styles.headingText} numberOfLines={1}>
                {competencyName}
            </Text>
            <Text 
                style={styles.subHeadingText}
            >
                {`Total LQ: ${myLQScore.toFixed(1)}`}
            </Text>
        </View>
        {/* <Button 
            transparent style={{opacity: 0.8, }}
            onPress={() => navigation.navigate('LeapSheetsPlanInfo')}

        >
            <Icon name="md-information-circle-outline" style={{ color: 'white', }} />
        </Button> */}

        <Button 
            transparent style={{opacity: 0.8, paddingLeft: 15, paddingRight: 15}}
            onPress={() => navigation.navigate('LeapSheetsPlanInfo')}

        >
            <Icon name="md-information-circle-outline" style={{ color: 'white', }} />
        </Button>
    </View>
)


const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-around'
    },
    leftIcon: {
        alignSelf: 'flex-start', marginRight: 'auto', opacity: 0.8
    },
    centerText: {
        alignSelf: 'center', marginRight: 'auto', marginLeft: 'auto'
    },
    headingText: {
        fontSize: 20, color: 'white', textTransform: 'uppercase', textAlign: 'center', opacity: 0.8
    },
    subHeadingText: {
        textAlign: 'center', color: '#E6C44E', fontSize: 15, fontWeight: 'bold'
    }
})
