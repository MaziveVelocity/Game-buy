import React, { useState } from 'react'
import { Button, Card, Image, Divider, Message } from 'semantic-ui-react'
import { getYear } from '../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import Auth from '../utils/auth';
import { ADD_TO_CART } from '../utils/actions';

// sellcard function to ddisplay buy
const SellCard = ({ game, index }) => {
    const [state, dispatch] = [useSelector(state => state), useDispatch()];
    const [currentUser] = useState(Auth.loggedIn() ? Auth.getProfile().data.username : '');
    const [errorMessage, setErrorMessage] = useState('');

    //changes color based on rating
    const cardColors = (rating) => {
        switch (true) {
            case rating <= 25: return 'red';
            case rating <= 50: return 'yellow';
            case rating <= 75: return 'blue';
            case rating >= 76: return 'green';
            default: return 'green';
        }
    }

    // add items to cart
    const addToCart = async () => {
        try {
            await dispatch({
                type: ADD_TO_CART,
                product: game
            });
        } catch(err) {
            setErrorMessage('Something went wrong adding to cart.');
        }
    }

    //returns buyCard componet
    return (
        <>
            { errorMessage.length > 0 &&
                <Message negative>
                  <Message.Header>{errorMessage}</Message.Header>
                </Message>
            }
            <Card color={cardColors(Math.round(game.rating))} fluid>
                <Card.Content>
                    <Image src={"https:" + game.cover} alt={game.name} floated="right" size="small" />
                    <Card.Header>{game.name}</Card.Header>
                    <Card.Meta>Release Date: {getYear(game.release_date)}</Card.Meta>
                    <Card.Meta>User Ratings: {Math.round(game.rating)} / 100</Card.Meta>
                    <Divider />
                    <Card.Content>Condition: {game.condition}</Card.Content>
                    <Card.Content>Sold by: {game.seller}</Card.Content>
                    <Card.Content>Price: ${game.price}</Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button 
                                basic color={(currentUser === game.seller || (state.cart.filter(find => find._id === game._id).length === 1)) ? 'red' : 'green'}
                                onClick={addToCart}
                                value={index}
                                disabled={(currentUser === game.seller || (state.cart.filter(find => find._id === game._id).length === 1))}>
                                    {currentUser !== game.seller ? (!(state.cart.filter(find => find._id === game._id).length === 1) ? 'Buy this game!' : 'Added to Cart') : 'You are selling this game!' }
                            </Button>
                        </div>
                    </Card.Content>
                </Card.Content>
            </Card>
        </>
    );
}

export default SellCard
