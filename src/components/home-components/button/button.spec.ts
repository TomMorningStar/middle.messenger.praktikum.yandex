import { Store } from "core";
import { renderBlock } from "tests/renderUtils";
import { getByTestId } from '@testing-library/dom'
import { Button } from "./button";

describe('components/home-components/Buoon', () => { 
    it('should render button', () => {
        renderBlock({
            Block: Button,
            props: { id: "1", store: Store<AppState>, click: () => {}} 
        })

        expect(getByTestId(document.body, 'button')).toBeInTheDocument();
    })
})
