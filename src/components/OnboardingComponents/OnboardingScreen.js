import React from 'react'
import { Image, View, Text } from 'react-native'
import { Button, Icon } from 'native-base'

import styles from '../../styles/onboardingStyles'

export default (
    { 
        mainImage, secondImage, 
        mainText, secondText, 
        onSkip, isUpperCase,
        progressImage
    }
) => (
    <View>
        <Image
            source={mainImage}
            style={styles.mainImage}
        />
        <View style={styles.secondImageContainer}>
            <Image
                source={secondImage}
                style={styles.secondImage}
            />
        </View>

        {/* Text Container */}
        <View style={styles.textContainer}>
            <Text style={styles.mainText}>{mainText}</Text>
            <Text
                style={{
                    ...styles.secondText,
                }}
            >
                {secondText}
            </Text>
        </View>

        {/* Skip button and progress container */}
        <View style={styles.progressContainer}>
            {/* <Text style={styles.progressStyle}>Progress...</Text> */}

            <Image 
                source={progressImage}
                style={styles.progressStyle}
            />

            <Button transparent style={styles.buttonStyle} onPress={onSkip}>
                <Text style={styles.buttonTextStyle}>Next</Text>
                <Icon name="ios-arrow-forward" style={{ marginLeft: 10, marginRight: 0, fontSize: 15 }} />
                <Icon name="ios-arrow-forward" style={{ marginLeft: 0, marginRight: 0, fontSize: 15, }} />
            </Button>
        </View>

    </View>
)