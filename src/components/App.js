import React from 'react';
import {Search} from './Search';
import {Table} from './Table';
import {Button} from './Button';
import axios from 'axios'; 
import {Loading} from './Loading';
import '../App.css';

 
const DEFAULT_QUERY = 'react';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_HPP = 'hitsPerPage=';
const PARAM_PAGE = 'page=';
    
 

export class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
             
    }
    this.onDismiss=this.onDismiss.bind(this);
    this.onSearchChange=this.onSearchChange.bind(this);
    this.setSearchTopStories=this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories=this.fetchSearchTopStories.bind(this);
    this.onSearchSubmit=this.onSearchSubmit.bind(this);
    this.needsToSearchTopStories =this.needsToSearchTopStories.bind(this);
    
     
  } 
   

  _isMounted = false;


  componentWillUnmount() {
    this._isMounted = false;
  }  

  setSearchTopStories(result){
    
      const { hits, page } = result;

      this.setState(prevState=> {
        const{results, searchKey} = prevState;
    
        const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
      
        const updatedHits = [
          ...oldHits,
          ...hits
        ];
      
        return({
            results: {
            ...results,
            [searchKey]: { hits: updatedHits, page },          
            },
            isLoading: false
        });
      }
    )
     
     
  }

  onSearchSubmit(event){
    const {searchTerm} = this.state;
    this.setState( { searchKey: searchTerm } );
    
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }
  

  
  fetchSearchTopStories(searchTerm,page = 0){

    this.setState({isLoading:true});

    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(result => this._isMounted && this.setSearchTopStories(result.data))
    .catch(error => this._isMounted && this.setState({error}));

  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this._isMounted = true;
    this.setState( { searchKey: searchTerm } );
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchChange(event){
    this.setState({searchTerm: event.target.value});

  }
  
  onDismiss(id){
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotID = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotID);
    this.setState({
      ...results,
      results: { [searchKey]: { hits: updatedHits, page } }
    });
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }   
 


  render(){
    const {results,searchTerm,searchKey,error,isLoading} =this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0; 
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    
    if(error){
      return <p>Something went wrong :(</p>
    }

    
    return (
      <div className="container-fluid containerCustom">   
        
         
        <div>
          <Search type='text' value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
          Search
          </Search>
        </div>
        { error ? <p>Something went wrong</p> : <Table list={list} onDismiss={this.onDismiss}/> }  
        { isLoading ? <Loading/> : <Button className='more-button' onClick={()=> this.fetchSearchTopStories(searchKey, page + 1)}>More</Button> }    
         
      
      
      </div>
    );
  }
}
export default App;

 
