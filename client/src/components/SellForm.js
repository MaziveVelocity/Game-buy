import React from 'react'
import { Form, Input, Label, Message } from 'semantic-ui-react'

// function that hnadles the sale form and returns sell form component
const SellForm = ({game, onSubmit, sellPost, setSellPost, errorMessage}) => {    
    
    // checks if target is price and sets price other wise sets other values of sell post
    const handleChange = (e, { value }) => {
        if(e.target.name === 'price') {
            setSellPost( { ...sellPost, price: Number(e.target.value), game: game });
        } else {
            setSellPost({ ...sellPost, condition: value, game: game });
        }
    }

    // sets value to the condition for the return
    const value = sellPost.condition;

    // sell form component
    return (
        <Form id='sell-form' onSubmit={onSubmit}>
            <Form.Group inline required>
                <label>Condition:</label>
                <Form.Radio
                    label='Poor'
                    value='Poor'
                    checked={value === 'Poor'}
                    onChange={handleChange}
                />
                <Form.Radio
                    label='Fair'
                    value='Fair'
                    checked={value === 'Fair'}
                    onChange={handleChange}
                />
                <Form.Radio
                    label='Good'
                    value='Good'
                    checked={value === 'Good'}
                    onChange={handleChange}
                />
                <Form.Radio
                    label='Excellent'
                    value='Excellent'
                    checked={value === 'Excellent'}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Input labelPosition='right' type='text' placeholder='Amount'>
                    <Label basic>$</Label>
                    <Input name='price' type='number' onChange={handleChange} required/>
                    <Label>.00</Label>
                </Input>
            </Form.Group>
            <Form.Checkbox name='agree' label='I agree to the Terms and Conditions' required/>
            { errorMessage.length > 0 &&
                <Message negative>
                    <Message.Header>{errorMessage}</Message.Header>
                </Message>
            }
        </Form>
    )
}

export default SellForm