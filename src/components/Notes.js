import React, { Component } from 'react';
import Board from './Board';
import Draggable from 'react-draggable'
import { Button } from 'reactstrap';

class Notes extends Component
{
    constructor( props )
    {
        super( props );
        this.state = { editing: false }
        this.edit = this.edit.bind( this );
        this.save = this.save.bind( this );
        this.remove = this.remove.bind( this );
        this.renderForm = this.renderForm.bind( this );
        this.renderDisplay = this.renderDisplay.bind( this );
    }
    componentWillMount()
    {
        this.style = {
            right: this.randomBetween( 0, window.innerWidth - 150, 'px' ),
            top: this.randomBetween( 0, window.innerHeight - 150, 'px' )
        }
    }
    componentDidUpdate()
    {
        if ( this.state.editing )
        {
            this.refs.newText.focus()
            this.refs.newText.select()
        }
    }
    shouldComponentUpdate( nextProps, nextState )
    {
        return this.props.children !== nextProps.children || this.state !== nextState
    }
    randomBetween( x, y, s )
    {
        return ( x + Math.ceil( Math.random() * ( y - x ) ) ) + s
    }
    edit()
    {
        this.setState( { editing: true } )
    }
    save()
    {
        this.props.onChange( this.refs.newText.value, this.props.id )
        this.setState( { editing: false } )
    }
    remove()
    {
        this.props.onRemove( this.props.id )
    }
    renderForm()
    {
        return (
            <div className="note"
                style={ this.style }>
                <textarea ref="newText"
                    defaultValue={ this.props.children }>
                </textarea>
                <Button outline color="success" size="sm" onClick={ this.save }>SAVE</Button>{ ' ' }
            </div>
        )
    }
    renderDisplay()
    {
        return (
            <div className="note"
                style={ this.style }>
                <p>{ this.props.children }</p>
                <span>

                    <Button outline color="primary" size="sm" onClick={ this.edit }>EDIT</Button>{ ' ' }
                    <Button outline color="danger" size="sm" onClick={ this.remove }>X</Button>{ ' ' }
                </span>
            </div>
        )
    }
    render()
    {
        return ( <Draggable>
            { ( this.state.editing ) ? this.renderForm()
                : this.renderDisplay() }
        </Draggable>
        )

    }

}

export default Notes