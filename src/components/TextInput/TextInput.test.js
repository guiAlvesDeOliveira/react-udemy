import {render, screen} from "@testing-library/react";

import {TextInput} from "./index";
import userEvent from "@testing-library/user-event";

describe('<TextInput />', () => {
    it('should have a value of searchValue', function () {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue={'testando'}/>);

        const input = screen.getByPlaceholderText(/type your search/i);
        expect(input.value).toBe('testando');
    });
    it('should call handle function on each key pressed', function () {
        const fn = jest.fn();
        render(<TextInput handleChange={fn}/>);

        const input = screen.getByPlaceholderText(/type your search/i);
        const value = 'o valor';

        userEvent.type(input, value);

        expect(input.value).toBe(value);
        expect(fn).toHaveBeenCalledTimes(value.length);
    });
    it('should match snapshot', function () {
        const fn = jest.fn();
        const {container} = render(<TextInput handleChange={fn}/>);

        expect(container).toMatchSnapshot();
    });
})