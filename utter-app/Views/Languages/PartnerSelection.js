import React from 'react';
import { View, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Text, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LanguagePartnerRow from '../Home/LanguagePartnerRow';
import { generalStyles } from '../../assets/stylesheets/general_styles';

const assetsPath = "../../assets/";

const PartnerSelection = () => {

    return (
        <ImageBackground 
            source={require(assetsPath + 'images/slidingBackgroundWide.png')}
            style={generalStyles.background_style}
        ></ImageBackground>
    );
};

export default PartnerSelection;