import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import accounting from "accounting";
import DeleteIcon from '@material-ui/icons/Delete';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
      },
      action: {
        marginTop: "1rem",
      },
      media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
      },
    
      CardActions: {
         display: "flex",
         justifyContent: "space-between",
         textAlign: "center",
      },
    
      cardRating: {
        display: "flex",
      },
}));

export default function CheckoutCard({
    product : {id, name, productType, image, price, rating, description},
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [{basket}, dispatch] = useStateValue();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


   const removeItem =() => dispatch({
      type: actionTypes.REMOVE_ITEM,
      id: id,
   })

  return (
    <Card className={classes.root}>
      <CardHeader
        
        action={
            <Typography
                className={classes.action}
                variant='h5'
                color='textSecondary'
                >
                  {accounting.formatMoney(price, "$")}
            </Typography>
        }
        title={name}
        subheader="in stock"
      />
      <CardMedia
        className={classes.media}image={image}title={name}/>
      
      <CardActions disableSpacing className={classes.CardActions}>
      <div className={classes.cardRating}>
        {Array(rating)
          .fill()
          .map((_, i)=>(
            <p>&#11088;</p>
          ))}
      </div>
      <IconButton>
      <DeleteIcon fontSize='large' onClick={removeItem}/>
      </IconButton>
      </CardActions>
    </Card>
  );
}
