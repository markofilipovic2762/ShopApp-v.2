import React, { useEffect, useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';


const CollapsePrice = ({ initState, title, handleFilters }) => {
    const [open, setOpen] = useState(false)
    const [price, setPrice] = useState({ minPrice: '', maxPrice: '' })

    useEffect(() => {
        if (initState) {
            setOpen(initState)
        }
    }, [initState])

    const handleClick = () => {
        setOpen(!open)
    }

    const handleAngle = () => (
        open ?
            <i className="fas fa-angle-up"></i>
            :
            <i className="fas fa-angle-down"></i>
    )

    const handleChangeMin = (e) => {
        const newPrice = { ...price }
        setPrice(newPrice)
        newPrice['minPrice'] = e.target.value
        handleFilters(newPrice)

        console.log(e.target.value)
    }
    const handleChangeMax = (e) => {
        const newPrice = { ...price }
        newPrice['maxPrice'] = e.target.value
        setPrice(newPrice)
        handleFilters(newPrice)

        console.log(e.target.value)
    }
    return (
        <div>
            <List style={{ borderBottom: '1px solid #dbdbdb' }}>
                <ListItem onClick={handleClick} style={{ padding: '10px 23px 10px 0' }} >
                    <ListItemText
                        primary={title} style={{ color: '#4bbf73', fontWeight: 'bold' }}
                    />
                    {handleAngle()}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="minprice">Min Price</InputLabel>
                        <Input
                            type="number"
                            value={price.minPrice}
                            id="minprice"
                            onChange={handleChangeMin}
                            startAdornment={<InputAdornment position="start">USD</InputAdornment>}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="maxprice">Max Price</InputLabel>
                        <Input
                            type="number"
                            value={price.maxPrice}
                            id="maxprice"
                            onChange={handleChangeMax}
                            startAdornment={<InputAdornment position="start">USD</InputAdornment>}
                        />
                    </FormControl>
                </Collapse>
            </List>
        </div>
    );
}

export default CollapsePrice
