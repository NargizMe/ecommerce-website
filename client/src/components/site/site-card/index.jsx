import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardHeader, CardMedia, CardContent,
    CardActions, Avatar, IconButton, Typography, Skeleton } from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const SiteCard = () => {
    // const { loading = false } = props;
    const[loading, setLoading] = useState(false);

    return (
        <Card style={{width: '345px', minWidth: '175px'}}>
            <CardHeader
                avatar={loading ?
                    (
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    ) :
                    (
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            S
                        </Avatar>
                    )
                }
                title={loading ?
                    (
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{ marginBottom: 6 }}
                        />
                    ) :
                    (
                        "Shrimp and Chorizo Paella"
                    )
                }
                subheader= {loading ?
                    (
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{ marginBottom: 6 }}
                        />
                    ) :
                    (
                        "September 14, 2016"
                    )

                }
            />
            {loading ? (
                <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
            ) : (
                <CardMedia
                    component="img"
                    height="194"
                    image="data:image/jpeg;base64,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"
                    alt="Paella dish"
                />
            )}
            <CardContent>
                {loading ? (
                    <>
                        <div style={{display: 'flex',justifyContent: 'space-between', marginBottom: '13px'}}>
                            <Skeleton animation="wave" height={10} width="40%" style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={10} width="40%" />
                        </div>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="100%" />
                    </>
                ) : (
                    <>
                        <div style={{display: 'flex',justifyContent: 'space-between', marginBottom: '13px'}}>
                            <h2>13 AZN</h2>
                            <AddShoppingCartIcon style={{color: 'darkorange'}}/>
                        </div>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests.
                        </Typography>
                    </>
                )}
            </CardContent>
            <CardActions disableSpacing>
            </CardActions>
        </Card>
    )
}

export default SiteCard
