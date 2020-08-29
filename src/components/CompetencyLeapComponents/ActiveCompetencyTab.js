import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text } from 'native-base'

setBorderColor = (currentLevel) => {
    switch (currentLevel) {
        case 0:
            return 'red'
        case 1:
            return 'grey'
        case 2:
            return 'yellow'
        case 3:
            return 'green'
        case 4:
            return 'blue'
        default:
            return 'red'
    }
}

export default ({
    activeTabId,
    isThinkCompleted,
    isReadCompleted,
    isWriteCompleted,
    isSayCompleted,
    isDoCompleted,
    isReflectCompleted,
    onTabChange,
    currentLevel
}) => (
        <View
            style={{
                ...styles.container,
                borderColor: setBorderColor(currentLevel),
            }}
        >
            <TouchableOpacity
                onPress={() => onTabChange(0)}
            >
                <Text
                    style={activeTabId === 0 ? styles.activeTabText : styles.inActiveTabText}
                >
                    Think
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => onTabChange(1)}
            >
                <Text
                    style={activeTabId === 1 ? styles.activeTabText : styles.inActiveTabText}
                >
                    Read
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => onTabChange(2)}
            >
                <Text
                    style={activeTabId === 2 ? styles.activeTabText : styles.inActiveTabText}
                >
                    Write
                </Text>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => onTabChange(3)}
            >
                <Text
                    style={activeTabId === 3 ? styles.activeTabText : styles.inActiveTabText}
                >
                    Say
                </Text>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => onTabChange(4)}
            >
                <Text
                    style={activeTabId === 4 ? styles.activeTabText : styles.inActiveTabText}
                >
                    Do
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => onTabChange(5)}
            >
                <Text
                    style={activeTabId === 5 ? styles.activeTabText : styles.inActiveTabText}
                >
                    Reflect
                </Text>
            </TouchableOpacity>
        </View>
    )

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 2,
        zIndex: 10000,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5, 
    },
    activeTabText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        margin: 5
    },
    inActiveTabText: {
        fontSize: 14,
        color: 'black',
        opacity: 0.5,
        margin: 5
    }
})
