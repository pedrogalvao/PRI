import React from 'react';
import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button} from 'reactstrap'

const NewsList = ({news}) => {

    return (
        <div className='mt-5 container text-left'>
             <div className="row">
            {news.map(article => { 
               
            return <Card
            color="secondary"
            outline
            className='col-4'
        >
            <CardBody>
            <CardTitle tag="h5" className='mb-2'>
                {article.title}
            </CardTitle>
            <CardSubtitle
                className="my-4 text-muted text-left"
                tag="h6"
            >
                {article.tags.map((item) => `${item}, `)}
            </CardSubtitle>
            <CardText>
                {article.text}
            </CardText>
            </CardBody>
        </Card>;})}
        </div>
      </div>
        
    );

}

export default NewsList;