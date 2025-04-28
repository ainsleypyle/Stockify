import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

export default function Home() {
  // Defining state variables
  const [inputTicker, setInputTicker] = useState("");
  const [openPrice, setOpenPrice] = useState("");
  const [closePrice, setClosePrice] = useState("");
  const [high, setHigh] = useState("");
  const [low, setLow] = useState("");
  const [volume, setVolume] = useState("");
  const [savedStocks, setSavedStocks] = useState([]);


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

  function handleSave() { 
    const newStock = {
      ticker: inputTicker,
      closePrice: closePrice,
      volume: volume,
    };
    setSavedStocks([...savedStocks, newStock]);
  }

  function handleClear() { 
    setSavedStocks([]);
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
        <TouchableOpacity style={styles.button} onPress={getFromApi}>
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>


      <Text style={styles.priceTitle}>Open Price: <Text style={styles.priceValue}>{openPrice}</Text></Text>
      <Text style={styles.priceTitle}>Close Price: <Text style={styles.priceValue}>{closePrice}</Text></Text>
      <Text style={styles.priceTitle}>High: <Text style={styles.priceValue}>{high}</Text></Text>
      <Text style={styles.priceTitle}>Low: <Text style={styles.priceValue}>{low}</Text></Text>
      <Text style={styles.priceTitle}>Volume: <Text style={styles.priceValue}>{volume}</Text></Text>

      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleClear}>
            <Text style={styles.buttonText}>Clear Table</Text>
          </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>My Saved Stocks</Text>
      
      {savedStocks.map((stock, index) => (
        <View key={index}>
          <Text>{stock.ticker}: Close {stock.closePrice}, Volume {stock.volume}</Text>
        </View>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#6495ED',
    width: '100%',
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#FF7F50',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',  
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
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: 130,
    backgroundColor: 'white',
    borderColor: '#FFA500', 
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },  
  priceTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#003366', 
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 8,
    textAlign: 'center', 
    width: '100%', 
  },
  priceValue: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff', 
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#FFA500', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2, 
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },  
});
