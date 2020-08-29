import React from 'react'
import { Image, ScrollView } from 'react-native'
import { View, Text, Container } from 'native-base'

import styles from '../../styles/ProfileCard'

import RNSpeedometer from 'react-native-speedometer'


export default ({
    Height,
    user
}) => (
        <View
            style={{
                ...styles.container,
                height: (Height * 72 / 100)
            }}
        >
            <Image
                source={{ uri: user.userAvatar }}
                style={styles.profileImg}
            />

            <ScrollView>
                <Text style={styles.usernameStyle}>
                    {user.name}
                </Text>

                <View style={{ alignSelf: 'center' }}>
                    <Image
                        style={{ width: 91.6, height: 50 }}
                        source={require('../../images/logo_bg.png')}
                    />
                    <View style={{ position: 'absolute', top: 5 }}>
                        <RNSpeedometer
                            value={0}
                            minValue={0}
                            maxValue={200}
                            size={80}
                            labelNoteStyle={{
                                display: 'none'
                            }}
                            labelStyle={{
                                display: 'none'
                            }}
                            innerCircleStyle={{
                                display: 'none',
                                backgroundColor: 'transparent'
                            }}
                            outerCircleStyle={{
                                backgroundColor: 'transparent'
                            }}
                            halfCircleStyle={{
                                display: 'none',
                                backgroundColor: 'transparent'
                            }}
                        />
                    </View>
                    <Text style={{ color: '#0078C7', fontWeight: 'bold', textAlign: 'center' }}>
                        {`Total LQ: ${user.LQ_POINTS.toFixed(1)}`}
                    </Text>
                </View>


                <View style={styles.infoContainer}>
                    <Text style={styles.infoKeyStyle}>Email</Text>
                    <Text style={styles.infoValStyle}>{user.email}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoKeyStyle}>Phone</Text>
                    <Text style={styles.infoValStyle}>{user.phone}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoKeyStyle}>job Title</Text>
                    <Text style={styles.infoValStyle}>{user.title}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoKeyStyle}>Organization</Text>
                    <Text style={styles.infoValStyle}>{user.department}</Text>
                </View>
            </ScrollView>
        </View>
    )