import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

/*
type InputProps = {
   value: String,
   onChange: (text: string) => void
}

class MaClasse extends Component 
{
   constructor(props) {
      super(props)
      this.state = {
         title: "",
         subtitle: "",
         description: ""
      }
   }
}
*/

const Input = ({text, placeholder , value, onChange}) => {
   return (
      <View >
       <Text  style={styles.title}>{text} </Text>
       {text=="Description" ?(
          
                   <TextInput
                   multiline
                   placeholder={placeholder}               
                   value={value}
                   style={styles.textDescription}
                   onChangeText={onChange}
                   />
          

                ) : (   
                <TextInput
                  placeholder={placeholder}
                  style={styles.textInput}
                  value={value}
                  onChangeText={onChange}         
               />

                )}
         
      </View>
   )
}
export default Input

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   title: {

      margin:5,
      fontSize: 15,
      color:"#f7287b"
  },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   textInput: {
      margin:5,
      fontSize: 14,
      borderBottomColor: '#f7287b', // Add this to specify bottom border color
      borderBottomWidth: 2 ,    // Add this to specify bottom border thickness
      width:"100%",
      left:"-1%"
  },
  textDescription: {
   margin:5,
   fontSize: 14,
   color: '#05375a',
   borderWidth: 2,
   height:100,
   width:"100%",
   left:"-1%",
   borderColor:"#f7287b"

},
})


/*

 getTradeData(){

    console.log(this.state.title);
    console.log(this.state.location);
    console.log(this.state.description);
    console.log(this.state.dropDownPick);
}
*/