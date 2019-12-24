import React from 'react';
import {Button} from './Button';
import {sortBy} from 'lodash';

    const SORTS = {
        NONE: list=>list,
        AUTHOR: list=> sortBy(list, 'author'),
        TITLE: list=> sortBy(list, 'title'),
        POINTS: list=> sortBy(list, 'points').reverse(),
        COMMENTS: list=> sortBy(list, 'num_comments').reverse()
    };

    const Sort = ({ sortKey, onSort, children }) => 
    {
                    
        return (
           
            <Button
                onClick={() => onSort(sortKey)}
                className='button-inline'             
            >
            {children}
            </Button>
          
        );
    }
    

export class Table extends React.Component {
    constructor(props){
        super(props);
        this.state={
            sortKey: 'NONE',
            isReversed: false
        }
        this.onSort=this.onSort.bind(this);
    }
    onSort(sortKey){
        const isReversed = this.state.sortKey === sortKey && !this.state.isReversed;
        this.setState({isReversed, sortKey});
    }

    render(){
        const{list, onDismiss}=this.props;
        const{sortKey,isReversed}=this.state;

        const sortedList= SORTS[sortKey](list);
        const reversedList= isReversed ? sortedList.reverse() : sortedList;

    return(
    <div >
   
        <div  className="row top-row">
             
            <div  className='col-4'>
                <Sort
                    sortKey={'TITLE'}
                    onSort={this.onSort}
                    
                    
                >
                    <span> Title</span>
                </Sort>
            </div>
            
             <div className="col-2" >
                <Sort
                    sortKey={'AUTHOR'}
                    onSort={this.onSort}
                    
                >
                    <span >Author</span>
                </Sort>
             </div>
            
             
             <div  className="col-2">
                <Sort
                    sortKey={'COMMENTS'}
                    onSort={this.onSort}
                    
                >
                    <span  >Comments</span>
                </Sort>
             </div>
            
             <div  className="col-2">
                <Sort
                    sortKey={'POINTS'}
                    onSort={this.onSort}
                    
                >
                    <span  >Points</span>
                </Sort>
             </div>
            
            
             
            <div className="col-2  archive-span">
                <span  >Archive</span>
            </div>
        </div>  

      {reversedList.filter(x => x.title != null && x.title.length > 0).map((item,index)=>{ 
          return(<div key={index} className='row separate-row'> 
            <span className="  col-4   custom-line"  > <a  target='blank' href={item.url}>{item.title}</a></span>
            <span className="  col-2   custom-line"  >{item.author}</span>
            <span className="  col-2   custom-line"  >{item.num_comments}</span>
            <span className="  col-2   custom-line"  >{item.points}</span>
            <span className="  col-2 "  >
                <Button className='dismiss-button' type='button' onClick={()=>onDismiss(item.objectID)}> Dismiss </Button>
            </span>
        </div>);}
        )}
    </div>
    );}
}
