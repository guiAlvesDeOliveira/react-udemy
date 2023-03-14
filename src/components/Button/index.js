import {Component} from "react";
import P from 'prop-types';
import './styles.css'

export class Button extends Component{
    render() {
        const {text, onclick, disabled = false} = this.props;

        return(
            <button
                onClick={onclick}
                className='button'
                disabled={disabled}
            >
                {text}
            </button>
        )
    }
}

Button.defaultProps = {
    disabled: false
}

Button.propTypes = {
    text: P.string.isRequired,
    onclick: P.func.isRequired,
    disabled: P.bool
}