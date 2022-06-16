import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, Typography, Divider, Grid, Button, IconButton, RadioGroup, FormControlLabel, Radio, TextField, Input } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useGetProductQuery } from '../../redux/productApi';
import axiosInstance from '../../utils/axios';
import { AdvancedImage } from '@cloudinary/react';
import cld from '../../utils/cld';
import styles from '../../styles/Style.module.css';


export default function ProductDetailsPage() {
    const { slug: paramSlug } = useParams();
    const { data: product, isFetching } = useGetProductQuery(paramSlug);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState(' ');
    const [category, setCategory] = useState('earphones');
    const [isNewProduct, setIsNewProduct] = useState(false);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');
    const [includes, setIncludes] = useState([]);
    const [image, setImage] = useState('');
    const [galleryFirst, setGalleryFirst] = useState('');
    const [gallerySecond, setGallerySecond] = useState('');
    const [galleryThird, setGalleryThird] = useState('');
    const navigate = useNavigate();

    
    useEffect(() => {
        if( !localStorage.getItem('audiophile_admin_token') ) navigate('/admin/login');
    }, [])

    useEffect(() => {
        if(!isFetching) {
            setName(product.product.name);
            setSlug(product.product.slug);
            setPrice(product.product.price);
            setDescription(product.product.description);
            setFeatures(product.product.features);
            setIncludes(product.product.includes);
            setCategory(product.product.category);
            setIsNewProduct(product.product.new);
            setImage(product.product.image);
            setGalleryFirst(product.product.gallery.first);
            setGallerySecond(product.product.gallery.second);
            setGalleryThird(product.product.gallery.third);
        }
    }, [product, isFetching])

    
    function handleNameChange(e) {
        e.preventDefault();

        setName(e.target.value);
        setSlug( (e.target.value).replaceAll(' ', '-').toLowerCase() ); //   replaces any empty space with dashes/hyphens and converts to lowercase, to sanitize
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
            new: isNewProduct,
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
            const response = await axiosInstance.patch(`products/${product.product._id}`, toSubmit);

            //console.log(response);

            if(response.data.success) {
                navigate('/admin/products');
            }
            else {
                alert(response.data.msg);
            }
        }
        catch(error) {
            console.log(error);
        }
    }


    if(isFetching) return <Typography>Loading...</Typography>;
    
    return (
        <Box width='100%' bgcolor='#E1E1E1' display='flex' justifyContent='center' padding={{ xs: '1.25rem', md: '2rem', lg: '0' }} sx={{ overflowY: 'scroll' }}>
            <div style={{ maxWidth: '50rem', width: '100%' }}>
                <Link className={styles['back-button-alt']} to='/admin/products'>
                    <ArrowBackIosNewRoundedIcon />
                    <span>Go Back</span>
                </Link>
                
                <Typography className={styles['page-header']} component='h1' variant='h4'>New Product</Typography>
                
                <form className={styles['new-product-details-form']} onSubmit={handleSubmit}>
                    <Grid className={styles['new-product-basic-details-grid']} container spacing={2}>
                        <Grid className='grid-header' item xs={12}>
                            <Typography className={styles['grid-section-head']} component='h2' variant='h5'>Basic Details</Typography>
                        </Grid>
                        <Grid className='name' item xs={12}>
                            <TextField 
                                id='name' 
                                label='Product Name' 
                                fullWidth 
                                error={name.length === 0} 
                                helperText='Please enter a name for the product'
                                value={name} 
                                onChange={handleNameChange}
                            />
                        </Grid>
                        <Grid className='slug' item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                            <TextField id='slug' label='Slug' value={slug} disabled />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography fontWeight={500}>Category</Typography>
                            <Box marginLeft='1.5rem'>
                                <RadioGroup name='category-radio-buttons-group' value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <FormControlLabel value='earphones' control={<Radio />} label='Earphones' />
                                    <FormControlLabel value='headphones' control={<Radio />} label='Headphones' />
                                    <FormControlLabel value='speakers' control={<Radio />} label='Speakers' />
                                </RadioGroup>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography fontWeight={500}>New Product?</Typography>
                            <Box marginLeft='1.5rem'>
                                <RadioGroup name='new-radio-buttons-group' value={isNewProduct} onChange={(e) => setIsNewProduct(e.target.value)}>
                                    <FormControlLabel value={true} control={<Radio />} label='Yes' />
                                    <FormControlLabel value={false} control={<Radio />} label='No' />
                                </RadioGroup>
                            </Box>
                        </Grid>
                        <Grid item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                            <TextField 
                                id='price' 
                                label='Price' 
                                type='number' 
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }} 
                                value={price}
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
                                value={description}
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
                                value={features}
                                onChange={(e) => setFeatures(e.target.value)} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography marginBottom='0.5rem' fontWeight={500}>Items Included:</Typography>
                            
                            {includes.map((item, index) => (
                                <Box display='flex' gap='1.5rem' alignItems='center' marginBottom='1rem' key={index}>
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
                                </Box>
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
                            <Input type='file' name='image' id='image' onChange={handleFileInputChange} disabled />
                            {/* {image && <img src={image} alt='' />} */}
                            {image && <AdvancedImage cldImg={cld.image(image)} />}
                        </Grid>
                        <Grid className={styles['new-product-images-grid-section']} item xs={12} lg={4}>
                            <Typography component='label' htmlFor='gallery-first'>First Gallery Image:</Typography>
                            <Input type='file' name='gallery-first' id='gallery-first' onChange={handleFileInputChange} disabled />
                            {/* {galleryFirst && <img src={galleryFirst} alt='' />} */}
                            {galleryFirst && <AdvancedImage cldImg={cld.image(galleryFirst)} />}
                        </Grid>
                        <Grid className={styles['new-product-images-grid-section']} item xs={12} lg={4}>
                            <Typography component='label' htmlFor='gallery-second'>Second Gallery Image:</Typography>
                            <Input type='file' name='gallery-second' id='gallery-second' onChange={handleFileInputChange} disabled />
                            {/* {gallerySecond && <img src={gallerySecond} alt='' />} */}
                            {gallerySecond && <AdvancedImage cldImg={cld.image(gallerySecond)} />}
                        </Grid>
                        <Grid className={styles['new-product-images-grid-section']} item xs={12} lg={4}>
                            <Typography component='label' htmlFor='gallery-third'>Third Gallery Image:</Typography>
                            <Input type='file' name='gallery-third' id='gallery-third' onChange={handleFileInputChange} disabled />
                            {/* {galleryThird && <img src={galleryThird} alt='' />} */}
                            {galleryThird && <AdvancedImage cldImg={cld.image(galleryThird)} />}
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