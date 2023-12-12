import React, {useState} from 'react';
import { 
    View, 
    SafeAreaView, 
    ScrollView, 
    TouchableOpacity, 
    Text, 
    ImageBackground, 
    StyleSheet, 
    Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LanguagePartnerRow from '../Home/LanguagePartnerRow';
import { generalStyles } from '../../assets/stylesheets/general_styles';

const assetsPath = "../../assets/";

const saveSelectedLanguagePartner = async (partnerId, navigation) => {
    // Save selected partner 
    try {
        await AsyncStorage.setItem('selectedPartner', partnerId);
        console.log('Selected partner saved:', partnerId);
      } catch (error) {
        console.error('Error saving selected partner:', error);
      }

    // Navigate to Home View
    navigation.navigate('Home')
  };

const PartnerSelection = () => {

    const navigation = useNavigation();

    // State to store selected partner
  const [selectedPartner, setSelectedPartner] = useState(null);

  const handlePartnerRowPress = (partnerId) => {
    setSelectedPartner(partnerId);
  };

    return (
        <ImageBackground 
            source={require(assetsPath + 'images/slidingBackgroundWide.png')}
            style={generalStyles.background_style}
        >

            <SafeAreaView
            style={{
            ...generalStyles.safeArea,
            paddingTop: Platform.OS === "android" ? 50 : 0,
            flex: 0,
            }}
            >
            </SafeAreaView>

            <ScrollView style={styles.partnerListContainer}>
                <View style={{ flex: 1 }}>
                    {/* Exit Button */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                        style={styles.exitButton}
                    >
                        <Image source={require(assetsPath + "icons/X.png")} />
                    </TouchableOpacity>

                    {/* Go Back Button */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Languages')}
                        style={styles.goBackButton}
                    >
                        <Image source={require(assetsPath + "icons/back-arrow.png")} />
                    </TouchableOpacity>
                </View>

                <View style={[generalStyles.column, {alignItems: 'left'}]}>
                    <Text style={[generalStyles.header, { marginTop: 100 }]}>
                        I want to talk to
                    </Text>
                    <Text style={styles.mediumText}>Select language partner</Text>
                </View>

                {/* Language Partner Rows */}
                <View style={styles.partnerList}>
                    {/* This TouchableOpacity should update its state when pressed*/}
                        <TouchableOpacity
                            onPress={() => handlePartnerRowPress('english-chatbot')}
                        >
                            <LanguagePartnerRow/>
                            
                        </TouchableOpacity>
                        <View style={styles.divider} />

                    {/* This TouchableOpacity should update its state when pressed*/}
                        <TouchableOpacity
                            onPress={() => handlePartnerRowPress('french-chatbot')}
                        >
                            <LanguagePartnerRow/>
                        </TouchableOpacity>

                        <View style={styles.divider} />

                        {/* Add more LanguagePartnerRows here as needed */}   
                </View>
                {/* Add Button at the bottom */}
                <TouchableOpacity
                    style={[
                        styles.addButton,
                        { backgroundColor: selectedPartner !== null ? '#536FFF' : '#CFD7FF' },
                    ]}
                    onPress={() => saveSelectedLanguagePartner(selectedPartner, navigation)}
                    disabled={selectedPartner === null} // Disable the button if language is not selected
                >
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    partnerListContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: "100%",
        paddingHorizontal: 0,
        height: "100%",
        // Add padding or margin as needed
    },
    partnerList: {
        marginTop: 10, // Adjust as needed
        backgroundColor: "#FFFFFF",
        // Add shadow or other styles as needed
    },
    exitButton: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
      },
      goBackButton: {
        position: "absolute",
        top: 10,
        left: 10,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
      },
      mediumText: {
        fontSize: 17,
        marginBottom: 30,
        marginTop: 10,
      },
      divider: {
        height: 1,
        backgroundColor: "lightgray",
        marginHorizontal: 15,
      },
      addButton: {
        borderRadius: 10,
        backgroundColor: '#CFD7FF',
        paddingVertical: 20,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12, // Adjust margin at the bottom
        justifyContent: 'flex-end',
      },
    
      addButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
      },
});

export { saveSelectedLanguagePartner };

export default PartnerSelection;