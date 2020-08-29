import React from 'react'
import { View, Text } from 'native-base'

import styles from '../../styles/SelectAnsStyles'

export default ({ans}) => (
    <View style={styles.container}>
        <Text style={styles.competencyTitleStyle}>
           {`${ans.id}- ${ans.title}`}
        </Text>

        <Text style={styles.descCompetencyStyle}>
            {`${ans.description}`}
        </Text>


        <Text style={styles.selectedTextStyle}>
            selected
        </Text>

        <Text style={styles.ansStyle}>
            {`${ans.selectedAns}`}
        </Text>
    </View>
)