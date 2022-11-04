import { Card, CardContent, Grid, List, ListItem } from "@mui/material";

export default function donate() {
    return (
        <div style={{ marginTop: "2rem" }}>
            <div style={{ marginBottom: "3rem" }}>This is only an example. Free while in Alpha.</div>
            <Grid container alignItems="stretch" style={{ minWidth: '300px', minHeight: '150px', maxHeight: '200px' }}>
                <Grid item xs>
                    <Card sx={{ maxWidth: "250px", minHeight: '150px', minWidth: '300px'}}>
                        <CardContent>
                            <div style={{ fontWeight: 'bold' }}>Free Tier</div>
                            <List>
                                <ul>
                                    <li>Now Playing</li>
                                    <li>Spotify's Recently Played</li>
                                </ul>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card sx={{ maxWidth: "250px", minHeight: '150px', minWidth: '300px'}}>
                        <CardContent>
                            <div style={{ fontWeight: 'bold' }}>Donation Tier</div>
                            <List>
                                <ul>
                                    <li>90 Days of Custom History</li>
                                    <li>Monthly Reports</li>
                                </ul>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card sx={{ maxWidth: "250px", minHeight: '150px', minWidth: '300px'}}>
                        <CardContent>
                            <div style={{ fontWeight: 'bold' }}>Lifetime Tier</div>
                            <List>
                                <ul>
                                    <li>Lifetime Custom History and Monthly Reports</li>
                                </ul>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <div style={{ textAlign: 'center', marginTop: "3rem" }}>*Subject to Change</div>

        </div>
    )
}