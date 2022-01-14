import React from 'react';
import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button} from 'reactstrap'

const NewsList = ({news}) => {

    return (
        <div className='mt-5 container'>
             <div className="row">
            {news.map(article => { 
               
            return <Card
            body
            color="secondary"
            outline
            className='col-4'
        >
            <CardBody>
            <CardTitle tag="h5">
                {article.text}
            </CardTitle>
            <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
            >
                Card subtitle
            </CardSubtitle>
            <CardText>
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </CardText>
            <Button>
                Button
            </Button>
            </CardBody>
        </Card>;})}
        </div>
      </div>
        
    );

}

export default NewsList;