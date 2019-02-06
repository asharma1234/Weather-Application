import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Button, Card } from "react-native-elements";
import { Constants } from 'expo';



import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: {},
      modifyWeekDays: [],
      temperature: 0,
      minTemp: null,
      maxTemp: null,
      unit: "Fahrenheit",
      fahTemp: 0,
      celTemp: 0,
      fahTemp1: 0,
      celTemp1: 0,
      fahTemp2: 0,
      celTemp2: 0
    }
  }

  componentDidMount() {
    const today = moment().format('llll');
    const modifyWeekDays = weekDays.filter(day => day !== today);
    this.setState({ modifyWeekDays });
    this.getWeatherData();
  }

  getWeatherData = async () => {
    try {
      const weatherData = await fetch("http://api.openweathermap.org/data/2.5/forecast?q=kathmandu&appid=d8237c157ed702b00379ed06e08eecd1");
      const jsonWeatherData = await weatherData.json();
      console.warn(jsonWeatherData);
      this.setState({
        weatherData: jsonWeatherData,
        temperature: jsonWeatherData.list[0].main.temp,
        fahTemp: jsonWeatherData.list[0].main.temp,
        celTemp: (jsonWeatherData.list[0].main.temp - 32) * 0.5,
        fahTemp1: jsonWeatherData.list[0].main.temp_min,
        celTemp1: (jsonWeatherData.list[0].main.temp_min - 32) * 0.5,
        fahTemp2: jsonWeatherData.list[0].main.temp_max,
        celTemp2: (jsonWeatherData.list[0].main.temp_max - 32) * 0.5


      });
    } catch (e) {
      console.warn(e);
    }
  }

  handlePress = () => {
    console.warn('Temperature in Fahrenheit:');
    if (this.state.unit === "Fahrenheit") {
      this.setState({
        unit: "Celcius",

      });
    } else {
      this.setState({
        unit: "Fahrenheit",

      });
    }
  }

  render() {
    const { weatherData, temperature, unit, fahTemp, celTemp, fahTemp1, fahTemp2, celTemp1, celTemp2 } = this.state;

    if (Object.keys(weatherData).length <= 0 && weatherData.constructor === Object) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading....</Text>
          
        </View>
      )
    }

    return (
      <View>
         <ImageBackground source={{ uri: 'https://www.123freevectors.com/wp-content/original/4702-blurred-turquoise-background.jpg' }} style={{ height: '100%', width: '100%', backfaceVisibility: 'visible' }}>

      <View style={[styles.container, { marginTop: Constants.statusBarHeight }]}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: "#f5f5f5" }}>Weather Forecast</Text>

          <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 5, color: '#f5f5f5' }}>
            {moment().format('llll')}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 150, height: 150 }}>
            <Image
              source={require("./assets/weather.png")}
              style={{
                flex: 1,
                width: undefined,
                height: undefined,
              }}
              resizeMode='contain'
            />
          </View>
        </View>

        <View style={{ justifyContent: "space-between", backgroundColor: '#B0E0E6'}}>
          <Card>
           
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
              <Text style={{ fontSize: 15, textAlign: 'left' }}>Temperature:</Text>

              <Text>{unit === "Fahrenheit" ? fahTemp : celTemp}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
              <Text style={{ fontSize: 15, textAlign: 'left' }}>Humidity:</Text>

              <Text>{weatherData.list[0].main.humidity}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
              <Text style={{ fontSize: 15, textAlign: 'left' }}>Pressure:</Text>

              <Text>{weatherData.list[0].main.pressure}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
              <Text style={{ fontSize: 15, textAlign: 'left' }}>Minimum Temperature:</Text>


              <Text>{unit === "Fahrenheit" ? fahTemp1 : celTemp1}</Text>


            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
              <Text style={{ fontSize: 15, textAlign: "left" }}>Maximum Temperature:</Text>

              <Text>{unit === "Fahrenheit" ? fahTemp2 : celTemp2}</Text>
            </View>
           </Card>

          <Button
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10, marginTop: 10 }}
            backgroundColor='#4682b4'
            title={unit === "Fahrenheit" ? "Celcius" : "Fahrenheit"}
            onPress={this.handlePress}
          />
        </View>
      </View>
      </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
});
