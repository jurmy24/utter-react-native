import { StyleSheet } from 'react-native';



export const introStyles = StyleSheet.create({

    font24_white_bold: {
        color: '#FFFFFF', 
        fontSize: 24, 
        fontWeight: 'bold'
    },

    font18_white:{
        color: '#FFFFFF', fontSize: 18 
    },

    background_style: { 
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        alignItems: 'center', 
        justifyContent: 'center' },
  });