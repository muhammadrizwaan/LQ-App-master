import React from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Button, Text } from 'native-base'

export default class extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeButton: -1,
            surveyId: props.surveyId
        }
    }
    
    handleSelectAns = (index) => {
        this.setState({
            activeButton: index
        })
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.surveyId !== prevState.surveyId) {
            return {
                surveyId: nextProps.surveyId,
                activeButton: -1
            }
        } else {
            return prevState
        }
    }
    render() {
        const { styles, options, handleSelectAns, disable } = this.props
        const { activeButton } = this.props
        return (
            <View style={{...styles.surveyBtnContainer, marginTop: 20}}>
                {
                    options.map((option, index) => (
                        <Button 
                            disabled={disable}
                            key={index}
                            style={activeButton === index ? {...styles.surveyAnsBtnClicked,} : {...styles.surveyAnsBtn}} 
                            onPress={() => handleSelectAns(index, option)}
                        >
                            <Text style={styles.surveyAnsText}>
                                {option}
                            </Text>
                        </Button>
                    ))
                }
                {/* <Button style={this.state.surveyAnsClicked1 ? styles.surveyAnsBtnClicked : styles.surveyAnsBtn} onPress={this.surveyAnsClicked1}><Text style={styles.surveyAnsText}>Somewhat Disagree</Text></Button>
                <Button style={this.state.surveyAnsClicked2 ? styles.surveyAnsBtnClicked : styles.surveyAnsBtn} onPress={this.surveyAnsClicked2}><Text style={styles.surveyAnsText}>Neither Agree nor Disagree</Text></Button>
                <Button style={this.state.surveyAnsClicked3 ? styles.surveyAnsBtnClicked : styles.surveyAnsBtn} onPress={this.surveyAnsClicked3}><Text style={styles.surveyAnsText}>Somewhat Agree</Text></Button>
                <Button style={this.state.surveyAnsClicked4 ? styles.surveyAnsBtnClicked : styles.surveyAnsBtn} onPress={this.surveyAnsClicked4}><Text style={styles.surveyAnsText}>Strongly Agree</Text></Button> */}
            </View>
        )
    }
}