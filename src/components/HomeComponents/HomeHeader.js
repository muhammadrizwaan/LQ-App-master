import React from 'react'
import { Image, StyleSheet } from 'react-native'
import {
    Button, Icon, Header, Container, Left,
    Right, Body, Title, List, ListItem, Thumbnail,
    Text, Item, View
} from "native-base";

import RNSpeedometer from 'react-native-speedometer'

class CasesHeader extends React.Component {
    render() {
        console.warn(this.props.user_lq_points)
        return (
            <Item
                style={{ backgroundColor: "transparent", borderColor: 'transparent' }}
            >
                <Left style={{ flex: 1 }}>
                    <Button transparent onPress={() => this.props.openDrawer()}>
                        <Icon name="menu" style={{ color: 'white', fontSize: 30 }} />
                    </Button>
                </Left>

                <Body style={{ flex: 1 }}>
                    {/* <Text style={styles.addCaseTextStyle}>My Cases</Text> */}
                    <Image
                        style={{ width: 91.6, height: 50 }}
                        source={require('../../images/logo_bg.png')}
                    />
                    <View style={{position: 'absolute', top: 5}}>
                        <RNSpeedometer
                            value={this.props.user_lq_points}
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
                                // marginTop: -50,
                                backgroundColor: 'transparent'
                            }}
                            halfCircleStyle={{
                                display: 'none',
                                backgroundColor: 'transparent'
                            }}
                        />
                    </View>
                    <Text style={{color: '#E6C44E', fontWeight: 'bold'}}>
                    {`Total LQ: ${this.props.user_lq_points.toFixed(1)}`}
                    </Text>
                </Body>

                <Right style={{ flex: 1 }}>

                    {/* <Image 
                        style={{alignSelf:"flex-end",}}
                        source={require('../../images/notification_bell_icon.png')}
                    /> */}

                    <Button transparent style={{display: 'none'}}>
                        <Icon
                            name="notifications"
                            style={{ color: 'white', fontSize: 30 }}
                        />
                    </Button>

                </Right>
            </Item>
        )
    }
}

const styles = StyleSheet.create({
    addCaseTextStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold'
    },
})

export default CasesHeader