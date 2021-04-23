import * as React from 'react';
import {Pressable, StyleSheet} from 'react-native';

import { Image, TextInput, ScrollView } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { Card } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';



import {useState, useEffect, useRef } from 'react'

export default function TabOneScreen() {
  const [newTodo, setNewTodo] = useState('gatitos')

  const [todos, setTodos] = useState(['agregar endpoint'])

  const isSearchActive = useRef('')

  useEffect(() => {
    isSearchActive.current = newTodo

    const getTodos = async () => {
      try {
        const remoteTodosResponse = await fetch('http://39f1353605f7.ngrok.io/proxy/' + newTodo )
        const remoteTodos = await remoteTodosResponse.json()

        const titles = remoteTodos.map(t => t)

        setTodos(titles)

        console.log(titles)
      } catch (e) {
        setTodos([])
      }
    }

    setTimeout(() => {
      if(isSearchActive.current === newTodo) {
        getTodos()
      } else {
        console.log('busqueda ' + newTodo + ' ya cambio. no se hizo el request')
      }
    }, 1000)
  }, [newTodo, isSearchActive])

  const todoTexts = todos.map((todo: any) => <>
    <Pressable
      onPress={() => {
        console.log(todo.Source)
        WebBrowser.openBrowserAsync('http://' + todo.Source);
      }}
    >
      <Card key={todo.Tilte} wrapperStyle={{height: 200}}>
        <Card.Title>{todo.Tilte}</Card.Title>
        <Card.Divider/>
        <View style={{height: 100}}>
          <Image source={{ uri: todo.Image }} style={{ height: 100, width: 100}}/>
        </View>


      </Card>
    </Pressable>
    </>)

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.backgrounds]}>
        Busca imagenes de:
      </Text>

      <TextInput
        value={newTodo}
        style={{ borderColor: 'white', borderWidth: 1, color: 'blue', fontSize: 18, color: 'blue', paddingTop: 20 }}
        placeholder={'nuevo todo'}
        onChangeText={(text) => {
          setNewTodo(text)
        }}
      />

      {
        /*
        <Pressable
        style={{backgroundColor: 'yellow', padding: 10}}
        onPress={() => {
          setTodos((prevState) => [...prevState, newTodo])
          setNewTodo('')
        }}
      >
        <View>
          <Text style={{ backgroundColor: 'yellow', color: 'black' }}>
            Agregar
          </Text>
        </View>
      </Pressable>
         */
      }


      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <ScrollView style={{ paddingTop: 50 }}>
        <Text>Images</Text>

        {todos.length === 0
          ? <Text> No hay todos </Text>
          : todoTexts
        }
      </ScrollView>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  backgrounds: {
    backgroundColor: '#b3b3b3'
  }
});
