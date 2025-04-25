import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Home() {
  // Defining state variables
  const [inputTicker, setInputTicker] = useState("");
  const [openPrice, setOpenPrice] = useState("");
  const [closePrice, setClosePrice] = useState("");
  const [high, setHigh] = useState("");
  const [low, setLow] = useState("");
  const [volume, setVolume] = useState("");

  function getFromApi() {
    console.log(`https://financialdata.net/api/v1/stock-prices?identifier=${inputTicker}&key=59f9a36a77655275b354e33bde88c00f`);
    fetch(`https://financialdata.net/api/v1/stock-prices?identifier=${inputTicker}&key=59f9a36a77655275b354e33bde88c00f`)
      .then((response) => response.json())
      .then((json) => {
        setOpenPrice(json[0].open);
        setHigh(json[0].high);
        setLow(json[0].low);
        setClosePrice(json[0].close);
        setVolume(json[0].volume);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stockify</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Ticker:</Text>
        <TextInput
          style={styles.input}
          placeholder="Input Here"
          onChangeText={(text) => setInputTicker(text.toUpperCase())}
        />
        <Button title="Enter" onPress={getFromApi} />
      </View>

      <Text style={styles.priceTitle}>Open Price: <Text style={styles.priceValue}>{openPrice}</Text></Text>
      <Text style={styles.priceTitle}>Close Price: <Text style={styles.priceValue}>{closePrice}</Text></Text>
      <Text style={styles.priceTitle}>High: <Text style={styles.priceValue}>{high}</Text></Text>
      <Text style={styles.priceTitle}>Low: <Text style={styles.priceValue}>{low}</Text></Text>
      <Text style={styles.priceTitle}>Volume: <Text style={styles.priceValue}>{volume}</Text></Text>

      <Text style={styles.subtitle}>My Saved Stocks</Text>
      <Text>Put Table Here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#00BFFF',
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
    color: 'orange',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 40,
    fontWeight: '600',
    color: 'orange',
    marginRight: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: 'left',
  },
  input: {
    height: 40,
    width: 120,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  priceTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#003366', // Dark blue color
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 8,
    textAlign: 'left', // Aligns the text to the left
    width: '100%', // Ensures the text spans the full width
  },
  priceValue: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff', // White color for the price values
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
