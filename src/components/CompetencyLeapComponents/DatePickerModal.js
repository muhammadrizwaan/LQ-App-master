import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

import { Modal, View, StyleSheet } from 'react-native'
import { Text, Button, Spinner } from 'native-base'

class DatePickerModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: props.visible,
            date: props.date
        }
    }
    static getDerivedStateFromProps(props) {
        if(props.visible) {
            return { visible: true }
        } else {
            return { visible: false }
        }
    }
    setDate = (event, date) => {
        newDate = date || this.state.date;

        this.setState({
            visible: Platform.OS === 'ios' ? true : false,
            date: newDate,
        });
    }
    render() {
        const { onClose, onChange, maximumDate, minimumDate } = this.props
        const { visible, date } = this.state
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
                onClose={onClose}
            >
                <View style={styles.container}>
                    <View style={styles.ratingContainer}>
                        <DateTimePicker
                            value={date}
                            maximumDate={maximumDate}
                            mode={"date"}
                            is24Hour={true}
                            display="default"
                            onChange={this.setDate}
                            minimumDate={minimumDate}
                        />

                        <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'flex-end' }}>
                            <Button
                                light
                                // full
                                style={{ borderRadius: 10, marginRight: 20 }}
                                onPress={onClose}

                            >
                                <Text>Cancel</Text>
                            </Button>

                            <Button
                                style={{ backgroundColor: '#4B6C94', borderRadius: 10 }}
                                onPress={() => onChange(this.state.date)}
                            >
                                <Text>Change</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    ratingContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
        height: 300,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    textStyle: {
        fontSize: 20,
        textTransform: 'uppercase',
        textAlign: 'center',
        // marginBottom: 70
    },
    buttonStyles: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0
    }
})

export default DatePickerModal
