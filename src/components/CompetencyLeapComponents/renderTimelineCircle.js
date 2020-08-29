import React from 'react';
import { Image } from 'react-native'

export default renderTimelineCircle = (isCompleted, isActive, color = 'red') => {
    switch(color) {
        case 'red':
                if(isCompleted) {
                    return <Image source={require('../../images/competencyAssets/progress_bar_red_checked_icon.png')}/>
                } else if(isActive) {
                    return <Image source={require(`../../images/competencyAssets/progress_bar_red.png`)}/>
                } else {
                    return <Image source={require('../../images/competencyAssets/progress_bar_grey.png')}/>
                }
                break;
        case 'white':
                if(isCompleted) {
                    return <Image source={require('../../images/competencyAssets/progress_bar_white_checked_icon.png')}/>
                } else if(isActive) {
                    return <Image source={require(`../../images/competencyAssets/progress_bar_white_icon.png`)}/>
                } else {
                    return <Image source={require('../../images/competencyAssets/progress_bar_grey.png')}/>
                }
                break;
        case 'yellow':
                if(isCompleted) {
                    return <Image source={require('../../images/competencyAssets/progress_bar_yellow_checked_icon.png')}/>
                } else if(isActive) {
                    return <Image source={require(`../../images/competencyAssets/progress_bar_yellow_icon.png`)}/>
                } else {
                    return <Image source={require('../../images/competencyAssets/progress_bar_grey.png')}/>
                }
                break;
        case 'green':
                if(isCompleted) {
                    return <Image source={require('../../images/competencyAssets/progress_bar_green_checked_icon.png')}/>
                } else if(isActive) {
                    return <Image source={require(`../../images/competencyAssets/progress_bar_green_icon.png`)}/>
                } else {
                    return <Image source={require('../../images/competencyAssets/progress_bar_grey.png')}/>
                }
                break;
        case 'blue':
                if(isCompleted) {
                    return <Image source={require('../../images/competencyAssets/progress_bar_blue_checked_icon.png')}/>
                } else if(isActive) {
                    return <Image source={require(`../../images/competencyAssets/progress_bar_blue_icon.png`)}/>
                } else {
                    return <Image source={require('../../images/competencyAssets/progress_bar_grey.png')}/>
                }
                break;
        default:
                if(isCompleted) {
                    return <Image source={require('../../images/competencyAssets/progress_bar_red_checked_icon.png')}/>
                } else if(isActive) {
                    return <Image source={require(`../../images/competencyAssets/progress_bar_red.png`)}/>
                } else {
                    return <Image source={require('../../images/competencyAssets/progress_bar_grey.png')}/>
                }
    }
 }
