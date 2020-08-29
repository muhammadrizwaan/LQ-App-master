import React from 'react'
import { TextInput } from 'react-native'
import { View, Button, Text, Input } from 'native-base'

export default class extends React.Component {
    render() {
        const { styles } = this.props
        return (
            <View style={{ ...styles.surveyBtnContainer, marginTop: 0 }}>
                <TextInput
                    style={{
                        backgroundColor: 'white',
                        width: '80%',
                        shadowColor: '#cccccc',
                        shadowOffset: { width: 2, height: 1 },
                        shadowOpacity: 1,
                        shadowRadius: 3,
                        elevation: 5,
                        marginTop: -20,
                        height: 100,
                        borderRadius: 10,
                        padding: 10,
                        borderColor: this.props.error ? 'red' : 'transparent',
                        borderWidth: 2,
                    }}
                    multiline={true}
                    numberOfLines={5}
                    value={this.props.ansInputText}
                    onChangeText={(val) => this.props.onChangeText('ansInputText', val)}
                />
            </View>
        )
    }
}