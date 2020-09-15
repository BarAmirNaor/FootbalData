import React from "react";
import Grid from '@material-ui/core/Grid'
const Player =({player})=>{
    return (
        <Grid container justify={"space-between"} alignItems={"space-around"} spacing={1}>
            <Grid item xs={1}>
                {player.player_number}
            </Grid>
            <Grid item xs={3}>
                {player.player_type}
            </Grid>
            <Grid item xs={1}>
                {player.player_age}
            </Grid>
            <Grid item xs={5}>
                {player.player_name}
            </Grid>
        </Grid>
    )

}

export default Player;
