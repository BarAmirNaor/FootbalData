import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Player from './Player';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        paddingTop: '56.25%', // 16:9
        height: "fit-content",
        minHeight: 100,
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        backgroundClip: "border-box",
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(360deg)',
    },
    avatar: {
        backgroundColor: "transparent",


    },
}));

export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const {name, coach, badge, players} = props.location.state;
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <img src={badge} alt={name + " logo"} style={{
                            maxWidth: "100%",
                            maxHeight: " 100%",
                        }}/>
                    </Avatar>
                }
                title={name}
            />
            <CardMedia
                className={classes.media}
                image={badge}
            />
            <CardContent>
                <Typography variant="h5" color="textPrimary" component="p">
                    The current coach of {name} is {coach}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>

                <Button
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    {!expanded ? "Show" : "Close"} Players List
                </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Grid container justify={"space-between"} spacing={1}>
                        <Grid item xs={3}>Number</Grid>
                        <Grid item xs={3}>Type </Grid>
                        <Grid item xs={3}>Age</Grid>
                        <Grid item xs={3}>Name</Grid>
                    </Grid>
                    {
                        players.map(player => <Player player={player}/>)
                    }
                </CardContent>
            </Collapse>
        </Card>
    );
}
