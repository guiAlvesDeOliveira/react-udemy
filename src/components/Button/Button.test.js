import {fireEvent, render, screen} from "@testing-library/react";
import {Button} from "./index";
import userEvent from "@testing-library/user-event";

describe('<Button />',  () => {
    it('should render the button with the text "load more" ', () => {
        render(<Button text='Load more'/>)
        expect.assertions(1);

        const button = screen.getByRole('button', {name: /load more/i });

        expect(button).toBeInTheDocument();
    });
    it('should call a function on button click', () => {
        const fn = jest.fn();
        render(<Button text='Load more' onclick={fn} />)

        const button = screen.getByRole('button', {name: /load more/i });

        userEvent.click(button);

        expect(fn).toHaveBeenCalled()
    });
    it('should be disabled when disabled is true', () => {
        render(<Button text='Load more' disabled={true} />)

        const button = screen.getByRole('button', {name: /load more/i });

        expect(button).toBeDisabled();
    });
    it('should be enabled when disabled is false', () => {
        render(<Button text='Load more' disabled={false} />)

        const button = screen.getByRole('button', {name: /load more/i });

        expect(button).toBeEnabled();
    });

    it('should match snapshot', function () {
        const fn = jest.fn();
        const {container} = render(<Button text='Load more' disabled={false} onclick={fn} />);
        expect(container.firstChild).toMatchSnapshot();
    });
})