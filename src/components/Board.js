import React, { Component } from 'react';
import './../App.css';
import Notes from './Notes';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

class Board extends Component
{
    constructor( props )
    {
        super( props );
        this.state = { notes: [] }
        this.nextId = this.nextId.bind( this );
        this.add = this.add.bind( this );
        this.remove = this.remove.bind( this );
        this.update = this.update.bind( this );
        this.eachNote = this.eachNote.bind( this );
    }
    componentWillMount()
    {
        if ( this.props.count )
        {
            var url = `http://baconipsum.com/api/?type=all-meat&sentences=${ this.props.count }`
            fetch( url )
                .then( results => results.json() )
                .then( array => array[ 0 ] )
                .then( text => text.split( '. ' ) )
                .then( array => array.forEach(
                    sentence => this.add( sentence ) ) )
                .catch( function ( err )
                {
                    console.log( "Didn't connect to the API", err )
                } )
        }
    }
    nextId()
    {
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++
    }
    add( text )
    {
        var notes = [
            ...this.state.notes,
            {
                id: this.nextId(),
                note: text
            }
        ]
        this.setState( { notes } )
    }
    update( newText, id )
    {
        var notes = this.state.notes.map(
            note => ( note.id !== id ) ?
                note :
                {
                    ...note,
                    note: newText
                }
        )
        this.setState( { notes } )
    }
    remove( id )
    {
        var notes = this.state.notes.filter( note => note.id !== id )
        this.setState( { notes } )
    }
    eachNote( note )
    {
        return ( <Notes key={ note.id }
            id={ note.id }
            onChange={ this.update }
            onRemove={ this.remove }>
            { note.note }
        </Notes> )
    }
    render()
    {
        return ( <div className='board'>
            { this.state.notes.map( this.eachNote ) }
            <Button outline color="primary" size="lg" onClick={ () => this.add( 'New Note' ) }>+</Button>{ ' ' }
        </div> )
    }

}

Board.propTypes = {
    nextId: PropTypes.func,
    add: PropTypes.func,
    update: PropTypes.func,
    remove: PropTypes.func,
    eachNote: PropTypes.func
};

export default Board