import { renderBlock } from "tests/renderUtils";
import { getByTestId } from '@testing-library/dom'
import { DeleteButton } from "./deleteButton";


describe('components/home-components/DeleteButton', () => { 
    it('should render button', () => {
        renderBlock({
            Block: DeleteButton,
            props: { id: "1", deleteChat: () => {}} 
        })
 
        expect(getByTestId(document.body, 'delete-button')).toBeInTheDocument();
    })
})
