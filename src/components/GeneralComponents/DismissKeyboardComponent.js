import React from 'react'

import { TouchableWithoutFeedback, Keyboard } from 'react-native'

const DismissKeyboardComponent = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

export default DismissKeyboardComponent