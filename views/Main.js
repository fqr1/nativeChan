import React, {Component} from 'react';
import {
  View, Text, Button, ActivityIndicator, ScrollView, TouchableOpacity, StyleSheet, Image
} from 'react-native'

import {getBoard, getCatalog, getContent} from '../services/chan'
import {downloadContnetToServer} from '../services/nodeChan'

export default class Main extends Component{

constructor(props){
  super(props)

  this.state = {
    boards: [],
    boardsConsulted: false,
    selectedBoard: null,

    catalog: [],
    catalogConsulted: false,
    selectedCatalog: null,

    content: [],
    contentConsulted: true,
    selectedContent: null,
  }
}

componentWillMount(){
  console.log('Component will mount');
  this.getBoardFrom4chan();
}


getBoardFrom4chan(){
  this.setState({boardsConsulted: false})
  getBoard().then(r2 => {
    console.log('r2', r2)
    const boards = r2.boards
    this.setState({boards, boardsConsulted: true})
  })
}

getCatalogFrom4chan(){
  this.setState({catalogConsulted: false})
  getCatalog(this.state.selectedBoard).then(r2 => {
    console.log('r2', r2);
    this.setState({catalog: r2, catalogConsulted: true})
  })
}

catalogPressed(catalog){

  console.log('Catalog pressed', catalog);
  this.setState({selectedCatalog: catalog}, () => this.getContentFrom4Chan())
}

getContentFrom4Chan(){
  this.setState({contentConsulted: false})
  getContent(this.state.selectedBoard, this.state.selectedCatalog).then(r2 => {
    console.log('r2', r2);
    const content= r2.posts
    this.setState({content, Consulted: false})
  })
}



boardPressed(a){
  console.log('Board pressed', a);
  this.setState({selectedBoard: a}, () => this.getCatalogFrom4chan());

}

catalogDownloadPressed(id){
    //console.warn('will download catalog', this.state.selectedBoard, id)
    downloadContnetToServer(this.state.selectedBoard, id).then(r2 => {
        //TODO show toast message, called to save
    })
}

          render(){
              return <View style={styles.main}>
                <View style={styles.header}/>
<ScrollView>
                <View style={styles.boardSection}>
                  <Text style={styles.title}>Selecciona un board</Text>
                  {!this.state.boardsConsulted? <ActivityIndicator size="large" color="#0000ff" /> : undefined}
                  <View style={styles.boardScroll}>
                    {this.state.boards.map((b, i) => {
                      //console.log(b.board)
                      return <View key={`board-${i}`} style={styles.boardSectionElement}><TouchableOpacity

                      onPress={this.boardPressed.bind(this, b.board)}>
                    <View>
                      <Text style={styles.boardSectionElementText}>{b.board}</Text>
                    </View>
                    </TouchableOpacity></View>
                  })}
                  </View>
                  </View>



                  { this.state.selectedBoard &&
                    <View style={styles.catalog}>
                      <Text style={styles.title}>[{this.state.selectedBoard}]Selecciona un catalogo</Text>
                        {!this.state.catalogConsulted? <ActivityIndicator size="large" color="#0000ff" /> : undefined}
                      <View>
                        {this.state.catalog.map((c, i) => {
                          return <View key={`catalog-page-${i}`}>
                            <Text style={styles.catalogPage}>Page {c.page} </Text>
                            {c.threads.map((t, ti) => {
                              return <View key={`catalog-${ti}-page-${i}`} style={styles.catalogElement}>
                                  <TouchableOpacity

                                    onPress={this.catalogPressed.bind(this, t.no)}
                                    ><View>
                                        <Text style={styles.catalogText}>{t.no} - {t.semantic_url.split('-').join(' ')}</Text>
                                  </View></TouchableOpacity>

                                  <TouchableOpacity

                                      onPress={this.catalogDownloadPressed.bind(this, t.no)}
                                  >
                                      <View>
                                          <Text style={styles.catalogText}>Descargar a servidor</Text>
                                      </View>
                                  </TouchableOpacity>
                              </View>
                            })}
                          </View>
                        })}
                      </View>
                    </View>
                }
                {this.state.selectedCatalog &&
                  <View style={styles.content}>
                    <Text style={styles.title}>Contenido</Text>
                    {this.state.content.filter(c => c.ext).map((c, ic) => {
                      console.log('Content', c);

                      return <View key={`content-${ic}`}>
                      <Text>{c.ext}</Text>

                      <Image style={{height: 200, width: 200}} source={{uri: `https://i.4cdn.org/${this.state.selectedBoard}/${c.tim}s${c.ext}`}}/>
                      </View>
                    })}
                    </View>
                }
                </ScrollView>
              </View>
          }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#772e2e'
  },

  header: {
    height: 20
  },

  title: {
    fontSize: 30,
  },

  boardSection: {
    backgroundColor: '#686868',
    //height: 300,
  },
  boardScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  boardSectionElement: {
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 15,
  },
  boardSectionElementText: {
  backgroundColor: 'lightgreen',
  padding: 5,
  fontSize: 20
  },

  catalog: {
    backgroundColor: '#9b9b9b',
    //height: 400,
  },
  catalogTitle: {
    //fontSize: 35,
  },
  catalogPage:{
    backgroundColor: 'black',
    color: 'white',
  },
  catalogElement: {marginTop: 20, marginLeft: 5, marginRight: 5, backgroundColor: '#e5e5e5'},
  catalogText: {paddingTop: 10, paddingBottom: 10, paddingLeft: 5},

  content: {

  },


})
