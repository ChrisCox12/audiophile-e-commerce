import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, Divider, Grid, Button, IconButton, RadioGroup, FormControlLabel, Radio, TextField, Input } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import axiosInstance from '../../utils/axios';
import styles from '../../styles/Style.module.css';


export default function NewProductPage() {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState(' ');
    const [category, setCategory] = useState('earphones');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');
    const [includes, setIncludes] = useState([]);
    const [image, setImage] = useState('');
    const [galleryFirst, setGalleryFirst] = useState('');
    const [gallerySecond, setGallerySecond] = useState('');
    const [galleryThird, setGalleryThird] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        if( !localStorage.getItem('audiophile_admin_token') ) navigate('/admin/login');
    }, []);

    
    function handleNameChange(e) {
        e.preventDefault();

        setName(e.target.value);
        setSlug( (e.target.value).replaceAll(' ', '-').toLowerCase() ); //   replaces any empty space with dashes/hyphens
    }

    function handleAddItem(e) {
        e.preventDefault();

        setIncludes([
            ...includes,
            { item: '', quantity: 1 }
        ]);
    }

    function handleRemoveItem(e, idx) {
        e.preventDefault();

        const newIncludes = [...includes];
        
        setIncludes([ ...newIncludes.filter((item, index) => index !== idx) ]);
    }

    function handleIncludesChange(index, inputName, inputValue) {
        let newIncludes = [...includes];

        if(inputName === 'name') {
            newIncludes[index].item = inputValue;
        }
        else {
            newIncludes[index].quantity = Number(inputValue);
        }

        setIncludes([...newIncludes]);
    }

    function handleFileInputChange(e) {
        const file = e.target.files[0];

        previewFile(file, e.target.name);
    }

    function previewFile(file, identifier) {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            switch(identifier) {
                case 'image':
                    setImage(reader.result);
                    break;
                case 'gallery-first':
                    setGalleryFirst(reader.result);
                    break;
                case 'gallery-second':
                    setGallerySecond(reader.result);
                    break;
                case 'gallery-third':
                    setGalleryThird(reader.result);
                    break;
                default:
                    break;
            }
        };
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const includesToSubmit = [...includes.filter(item => item.item !== '')];
        const roundedPrice = Math.round(price * 100) / 100; //  rounds down to 2 decimal places
        const toSubmit = {
            name: name,
            slug: slug,
            image: image,
            category: category,
            description: description,
            features: features,
            includes: includesToSubmit,
            price: roundedPrice,
            gallery: {
                first: galleryFirst,
                second: gallerySecond,
                third: galleryThird
            }
        };

        try {
            const response = await axiosInstance.post('products', toSubmit);

            if(response.data.success) {
                navigate('/admin/products');
            }
            else {
                //alert(response.data.msg);
                setErrorMsg(response.data.msg);
            }
        }
        catch(error) {
            console.log(error);
        }
    }


    return (
        <Box width='100%' bgcolor='#E1E1E1' display='flex' justifyContent='center' padding={{ xs: '1.25rem', md: '2rem' }} sx={{ overflowY: 'scroll' }}>
            <div style={{ maxWidth: '50rem', width: '100%' }}>
                <Link className={styles['back-button-alt']} to='/admin/orders'>
                    <ArrowBackIosNewRoundedIcon />
                    <span>Go Back</span>
                </Link>
                
                <Typography className={styles['page-header']} component='h1' variant='h4'>New Product</Typography>
                
                <form className={styles['new-product-details-form']} onSubmit={handleSubmit}>
                    {errorMsg && <Typography textAlign='center' bgcolor='red' color='white' fontWeight={700} borderRadius='7px' padding='0.5rem'>Error: {errorMsg}</Typography>}
                
                    <Grid className={styles['new-product-basic-details-grid']} container spacing={2}>
                        <Grid className='grid-header' item xs={12}>
                            <Typography className={styles['grid-section-head']} component='h2' variant='h5'>Basic Details</Typography>
                        </Grid>
                        <Grid className='name' item xs={12}>
                            <TextField 
                                id='name' 
                                label='Product Name' 
                                fullWidth 
                                required 
                                error={name.length === 0} 
                                helperText='Please enter a name for the product' 
                                onChange={handleNameChange}
                            />
                        </Grid>
                        <Grid className='slug' item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                            <TextField id='slug' label='Slug' value={slug} disabled />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography fontWeight={500}>Category</Typography>
                            <div style={{ marginLeft: '1.5rem' }}>
                                <RadioGroup name='category-radio-buttons-group' defaultValue='earphones' value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <FormControlLabel value='earphones' control={<Radio />} label='Earphones' />
                                    <FormControlLabel value='headphones' control={<Radio />} label='Headphones' />
                                    <FormControlLabel value='speakers' control={<Radio />} label='Speakers' />
                                </RadioGroup>
                            </div>
                        </Grid>
                        <Grid item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                            <TextField 
                                id='price' 
                                label='Price' 
                                type='number' 
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }} 
                                onChange={(e) => setPrice(e.target.value)} 
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                id='description' 
                                label='Description' 
                                fullWidth 
                                multiline 
                                minRows={10} 
                                onChange={(e) => setDescription(e.target.value)} 
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                id='features' 
                                label='Features' 
                                fullWidth 
                                multiline 
                                minRows={10} 
                                onChange={(e) => setFeatures(e.target.value)} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography marginBottom='0.5rem' fontWeight={500}>Items Included:</Typography>
                            
                            {includes.map((item, index) => (
                                <div key={index} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1rem' }}>
                                    <div>
                                        <TextField 
                                            id={`item-name-${index}`} 
                                            label='Item' 
                                            value={item.item} 
                                            onChange={(e) => handleIncludesChange(index, 'name', e.target.value)} 
                                        />
                                    </div>
                                    <div>
                                        <TextField 
                                            id={`item-quantity-${index}`} 
                                            label='Quantity' 
                                            type='number' 
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }} 
                                            value={item.quantity} 
                                            onChange={(e) => handleIncludesChange(index, 'quantity', e.target.value)} 
                                        />
                                    </div>
                                    <IconButton type='button' onClick={(e) => handleRemoveItem(e, index)}>
                                        <CloseRoundedIcon fontSize='medium' sx={{ color: 'red' }} />
                                    </IconButton>
                                </div>
                            ))}

                            <Button className={styles['outlined-button']} type='button' variant='outlined' onClick={handleAddItem}>Add Item</Button>
                        </Grid>
                    </Grid>

                    <Divider />

                    <Grid className={styles['new-product-images-grid']} container spacing={2}>
                        <Grid className='grid-header' item xs={12}>
                            <Typography className={styles['grid-section-head']} component='h2' variant='h5'>Images</Typography>
                        </Grid>
                        <Grid className={styles['new-product-images-grid-section']} item xs={12} lg={10}>
                            <Typography component='label' htmlFor='image'>Product Image:</Typography>
                            <Input type='file' name='image' id='image' onChange={handleFileInputChange} required />
                            {image && <img src={image} alt='' />}
                        </Grid>
                        <Grid className={styles['new-product-images-grid-section']} item xs={12} lg={4}>
                            <Typography component='label' htmlFor='gallery-first'>First Gallery Image:</Typography>
                            <Input type='file' name='gallery-first' id='gallery-first' onChange={handleFileInputChange} />
                            {galleryFirst && <img src={galleryFirst} alt='' />}
                        </Grid>
                        <Grid className={styles['new-product-images-grid-section']} item xs={12} lg={4}>
                            <Typography component='label' htmlFor='gallery-second'>Second Gallery Image:</Typography>
                            <Input type='file' name='gallery-second' id='gallery-second' onChange={handleFileInputChange} />
                            {gallerySecond && <img src={gallerySecond} alt='' />}
                        </Grid>
                        <Grid className={styles['new-product-images-grid-section']} item xs={12} lg={4}>
                            <Typography component='label' htmlFor='gallery-third'>Third Gallery Image:</Typography>
                            <Input type='file' name='gallery-third' id='gallery-third' onChange={handleFileInputChange} />
                            {galleryThird && <img src={galleryThird} alt='' />}
                        </Grid>
                    </Grid>

                    <Divider />

                    <Box className={styles['new-product-actions']}>
                        <Button className={styles['text-button']} type='button' variant='text'>Cancel</Button>
                        <Button className={styles['submit-button']} type='submit' variant='contained'>Submit</Button>
                    </Box>
                </form>
            </div>
        </Box>
    )
}