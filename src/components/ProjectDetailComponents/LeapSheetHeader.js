import React from 'react'
import { StyleSheet } from 'react-native'
import {
    View, Text, Icon, Button,
} from 'native-base'

export default ({navigation, title, subTitle}) => (
    <View style={styles.headerContainer}>
        <Button 
            transparent 
            style={styles.leftIcon}
            onPress={() => navigation.goBack()}
        >
            <Icon name="ios-arrow-back" style={{ color: 'white' }} />
        </Button>
        <View style={styles.centerText}>
            <Text style={styles.headingText}>
                {title}
            </Text>
           {subTitle.length > 0 && <Text 
                style={styles.subHeadingText}
            >
                {subTitle}
            </Text>}
        </View>
        <Button transparent style={{opacity: 0}}>
            <Icon name="ios-arrow-forward" style={{ color: 'white', }} />
        </Button>
    </View>
)


const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-around'
    },
    leftIcon: {
        alignSelf: 'flex-start', marginRight: 'auto' 
    },
    centerText: {
        alignSelf: 'center', marginRight: 'auto',
    },
    headingText: {
        fontSize: 20, color: 'white', textTransform: 'uppercase', textAlign: 'center', opacity: 0.8
    },
    subHeadingText: {
        textAlign: 'center', color: 'white', fontSize: 13, opacity: 0.8
    }
})
