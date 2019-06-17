import * as WebBrowser from 'expo-web-browser';
import React, {useState, useEffect} from 'react';
import MapView from 'react-native-maps'
import Dimensions from 'Dimensions'
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MonoText } from '../components/StyledText';
import { genericTypeAnnotation } from '@babel/types';

export default function HomeScreen() {
  const [loading, setLoading] = useState(true)
  const [stations, setStations] = useState([])
  const region = {
    latitude: 52.112197,
    longitude: 18.999502,
    latitudeDelta: 2.015,
    longitudeDelta: 1.015,
  }
  useEffect(
    async () => {
      try {
        const response = await fetch('http://api.gios.gov.pl/pjp-api/rest/station/findAll')
        const data = await response.json()
        setStations(data)
        setLoading(false)
      } catch (err) {
        console.log('err: ', err)
      }
    }, []
  )

  if(loading)
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading data..</Text>
      </View>
    )
  else
    return(
      <View style={styles.container}>
        <View style={styles.container_top}>
          <MapView
            style={styles.map}
            initialRegion={region}
          >
            {stations.map(station =>{ 
              return( 
                <MapView.Marker
                  style
                  key={station.id}
                  title={station.stationName}
                  coordinate = {{
                  latitude: parseFloat(station.gegrLat),
                  longitude: parseFloat(station.gegrLon),
                }}
              >
                <View style={{width: 20, height: 20, backgroundColor: 'red', borderRadius: 20/2}}>
                </View>
              </MapView.Marker>
              )
            })}
          </MapView>
        </View>

        <View style={styles.container_bottom}>
          <Text>
            bottom
          </Text>
        </View>
      </View>  
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',  
    justifyContnent: 'center',
    alignItems: 'center',
    backgroundColor: 'steelblue',
    color: '#fff'
  },
  container_bottom: {
    flex: 1,
    height: Dimensions.get('window').height /2,
    width: Dimensions.get('window').width,    
  },
  container_top: {
    flex: 1,
    height: Dimensions.get('window').height /2,
    width: Dimensions.get('window').width,
 
  },
  loadingText: {
    color: '#fff',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  }
});
