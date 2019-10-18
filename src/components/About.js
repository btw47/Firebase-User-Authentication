import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
/**
 * @description About component of the application
 * 
 */
export default class AboutComponent extends React.Component {
    render() {
        return (
            <div>
                <center>
                <h2>
                   Welcome To The About Page
                </h2>
                </center>
                <Grid container justify="center" alignItems="center">
                  <Avatar alt="Bradley Wong" src="./image/bradley.jpg"/>
                 <Avatar alt="Eddie Miamen" src="./image/Eddie.jpg" />
                 </Grid>
            </div>
        )
    }
}