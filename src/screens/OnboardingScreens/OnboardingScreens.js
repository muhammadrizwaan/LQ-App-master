import React from 'react'
import {
    Image, Text, TouchableOpacity, StyleSheet, Dimensions,
    SafeAreaView, Platform
} from 'react-native'
import { Container, Icon, Button } from 'native-base'
import styles from '../../styles/onboardingStyles'
import AsyncStorage from '@react-native-community/async-storage'

// import OnboardingScreen from '../../components/OnboardingComponents/OnboardingScreen'
import Onboarding from 'react-native-onboarding-swiper';

class OnboardingScreens extends React.Component {
    static navigationOptions = {
        header: null
    }
    state = {
        activeIndex: 0
    }
    onSkip = () => {
        // if (this.state.activeIndex < 2) {
        //     this.setState({
        //         activeIndex: this.state.activeIndex + 1
        //     })
        // } else {
        // alert('Onboarding Completed')
        AsyncStorage
            .setItem('onboarding', 'done')
            .then(() => {
                this.props.navigation.navigate('Auth')
            })

        // }
    }
    render() {
        const { activeIndex } = this.state
        const Width = Dimensions.get('window').width
        const Height = Dimensions.get('window').height 
        const main_height = Height - (Height*5/100)
        return (
            <Container>
                <Onboarding
                    bottomBarHighlight={false}
                    showSkip={false}
                    DotComponent={() => <Text></Text>}
                    // NextButtonComponent={() => (
                    //     <TouchableOpacity transparent style={DialogStyles.skipButton} onPress={this.onSkip} >
                    //         <Text
                    //             style={{ color: "#0078C7", fontSize: 15, fontWeight: "bold" }}
                    //         >
                    //             SKIP
                    //         </Text>
                    //         <Icon
                    //             name="ios-arrow-forward"
                    //             style={{ color: "#0078C7", fontSize: 16, fontWeight: "bold", marginLeft: 3 }}
                    //         />
                    //         <Icon
                    //             name="ios-arrow-forward"
                    //             style={{ color: "#0078C7", fontSize: 16, fontWeight: "bold" }}
                    //         />
                    //     </TouchableOpacity>
                    // )}
                    // DoneButtonComponent={() => (
                    //     <TouchableOpacity transparent style={DialogStyles.skipButton} onPress={this.onSkip} >
                    //         <Text
                    //             style={{ color: "#0078C7", fontSize: 15, fontWeight: "bold" }}
                    //         >
                    //             SKIP
                    //         </Text>
                    //         <Icon
                    //             name="ios-arrow-forward"
                    //             style={{ color: "#0078C7", fontSize: 16, fontWeight: "bold", marginLeft: 3 }}
                    //         />
                    //         <Icon
                    //             name="ios-arrow-forward"
                    //             style={{ color: "#0078C7", fontSize: 16, fontWeight: "bold" }}
                    //         />
                    //     </TouchableOpacity>
                    // )}
                    showPagination={false}
                    // bottomBarHeight={30}
                    imageContainerStyles={{
                        paddingBottom: 0,
                        flex: 1,
                        // height: '100%'
                        // marginBottom: 80
                    }}
                    pages={[
                        {
                            backgroundColor: '#FFFFFB',
                            image: <Image source={require('../../images/onboarding/2_intro.jpg')} style={{ height: main_height, width: Width }} />,
                            title: null,
                            subtitle: null,
                        },
                        {
                            backgroundColor: '#FFFFFB',
                            image: <Image source={require('../../images/onboarding/3_intro.jpg')} style={{ height: main_height, width: Width }} />,
                            title: null,
                            subtitle: null,
                        },
                        {
                            backgroundColor: '#FFFFFB',
                            image: <Image source={require('../../images/onboarding/4_intro.jpg')} style={{ height: main_height, width: Width }} />,
                            title: null,
                            subtitle: null,
                        },
                    ]}
                />

                {/* <Button
                    transparent
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 20
                    }}
                >
                    <Text>Content</Text>
                </Button> */}

                <TouchableOpacity
                    transparent
                    style={{
                        ...DialogStyles.skipButton,
                        bottom: Platform.OS === "ios" ? 20 : 5,
                        right: 20
                    }}
                    onPress={this.onSkip}
                >
                    <Text
                        style={{ color: "#0078C7", fontSize: 15, fontWeight: "bold" }}
                    >
                        SKIP
                            </Text>
                    <Icon
                        name="ios-arrow-forward"
                        style={{ color: "#0078C7", fontSize: 16, fontWeight: "bold", marginLeft: 3 }}
                    />
                    <Icon
                        name="ios-arrow-forward"
                        style={{ color: "#0078C7", fontSize: 16, fontWeight: "bold" }}
                    />
                </TouchableOpacity>



                {/* {activeIndex === 0 && <OnboardingScreen
                    mainImage={require('../../images/onboardingassets/image2.png')}
                    secondImage={require('../../images/onboardingassets/star_circle.png')}
                    mainText={"Elevate"}
                    isUpperCase={true}
                    progressImage={require('../../images/onboardingassets/progress_1.png')}
                    secondText={"Your Leadership Quotient (LQ)"}
                    onSkip={this.onSkip}
                />}


                {activeIndex === 1 && <OnboardingScreen
                    mainImage={require('../../images/onboardingassets/image2.png')}
                    secondImage={require('../../images/onboardingassets/star_circle.png')}
                    mainText={"Focus"}
                    secondText={"Aligning Performace to Purpose"}
                    progressImage={require('../../images/onboardingassets/progress_2.png')}
                    isUpperCase={false}
                    onSkip={this.onSkip}
                />}

                {activeIndex === 2 && <OnboardingScreen
                    mainImage={require('../../images/onboardingassets/image3.png')}
                    secondImage={require('../../images/onboardingassets/star_circle.png')}
                    mainText={"Metrics-Driven"}
                    secondText={"Leadership Development"}
                    progressImage={require('../../images/onboardingassets/progress_3.png')}
                    isUpperCase={false}
                    onSkip={this.onSkip}
                />} */}

            </Container>
        )
    }
}

const DialogStyles = StyleSheet.create({
    skipButton: {
        backgroundColor: "transparent",
        justifyContent: "center",
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        
    }
})

export default OnboardingScreens