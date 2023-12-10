import React from 'react';
import { View, Image} from 'react-native';
import { generalStyles } from '../../assets/stylesheets/general_styles';

const Tim = () => {
    return (
      <View style={[generalStyles.partnerImageContainer]}>
        <Image
        source={require('./../../assets/avatars/tim_avatar.png')}
        style={generalStyles.partnerImage}
        />
        <View style={generalStyles.flagContainer}>
          <Image
            source={require('./../../assets/images/US-United-States-Flag-icon.png')} // Replace with the actual path to your flag image
            style={generalStyles.flag}
          />
        </View>
      </View>
    );
  };
  
  export default Tim;

