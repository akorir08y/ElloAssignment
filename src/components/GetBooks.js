import React, {useState, useEffect} from "react";
import { useQuery} from '@apollo/client';
import {GET_BOOKS} from "../GraphQL/Queries";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import Tab from '@mui/material/Tab';
import {TabContext,TabList ,TabPanel } from '@mui/lab';
import { v4 as uuid } from 'uuid';
import AddIcon from '@mui/icons-material/Add';

// Stylesheet in Use
import './../style.css';

// Main Component Holding the Books and the Selected Books

function GetBooks(){
    const { error, loading, data } = useQuery(GET_BOOKS);
    const [search, setSearch] = useState("");
    const [books, setBooks] = useState([]);
    const [value, setValue] = useState('1');


    // Specific to adding and removing books
    const ids = uuid();
    let book_id = ids.slice(0, 8);

    // Adding Books to List
    const addBook = (book) => {
        // Checking if the Teacher's List is Empty
        if(books.length !== 0){
          books.map((booked) => {
              if(booked.title.includes(book.title)){
                alert(`Book Already added to the Teacher's List`)
              }else{
                setBooks((b) =>[...b, {"id": book_id,...book}]);
                alert(`Book Added`);
              }
          });     
        }else{
          setBooks((b) =>[...b, {"id": book_id,...book}]);
          alert(`Book Added`);
        }
    };

    // Removing the Book
    const removeBook = (id) => {
      // Confirm the Action needs to be taken
      const statement = "Are you Sure you want to remove the book from the List";
      if(window.confirm(statement) === true){
        setBooks(books.filter((book) => book.id !== id));
        alert(`Book Deleted`);
      }else{
        alert(`Book Deletion Process Stopped`);
      }
    }

    if (loading) return "Loading";
    if (error) return `Error! ${error.message}`;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };    
    
    return(
        <>      
      <div className="templateContainer">
          <div className="heading">
              Ello
          </div>
          <div className="searchInput_Container">
            
              <form>  
                <input label="Title" className="search" onChange={(event) =>setSearch(event.target.value)} />
              </form>  
              <br/>
              <div className="dropdown">
                  {
                    data.books
                    .filter((val) => {
                        const searchTerm = search.toLowerCase();
                        const title = val.title.toLowerCase();

                        return searchTerm && title.startsWith(searchTerm) && title !== searchTerm;
                        
                    }).map((val) => {
                      return(
                        <div className="dropdown-row">                            
                          <div className="imager"><img src={val.coverPhotoURL} className="imaged"></img></div> 
                          <div className="content"><p>{val.title}</p><p>By {val.author}</p><button type="button" class="button" onClick={(event) =>addBook(val)}>Add</button></div>                         
                        </div>
                      )
                    })
                  }  
              </div> 
              <br/>
              <br/>
          </div>
          <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', marginTop: '50px', zIndex: '1' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" className="tabbed">
              <Tab label="All Books" value="1" />
              <Tab label="Teachers's Reading List" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" centered> 
          <Box
                display="flex"
                gap={4}
                p={2}
                alignItems="center"
                noValidate
                autoComplete="off"
                ></Box>
          <div className="template_Container">
          {
                data.books
                .map((val) => {
                    return(
                        <Box key={val.title} className="cards">
                            <Card className="template">                                
                                <CardContent>
                                    <CardMedia component="img"
                                    height="80"
                                    image={"/" + val.coverPhotoURL}
                                    alt="unsplash image"
                                    sx={{ borderRadius: '15px' }}>
                                    </CardMedia>
                                    <Typography variant="body2" color="text.secondary">
                                        {val.title}
                                    </Typography>
                                    <Typography variant="body2" component="div">
                                    Author: {val.author}
                                    </Typography>
                                    <CardActions>
                                        <Button size="small" class="button-add" type="button" onClick={(event) =>addBook(val)}>
                                        Add Book to List</Button>
                                    </CardActions>
                                </CardContent>
                            </Card>

                        </Box>
                    )
                  })
              }
            </div>
          </TabPanel>
          <TabPanel value="2">          
          <div className="template_Container">
          {
                books
                  .map((val) => {
                    return(
                        <Box key={val.title} className="cards">
                            <Card className="template">
                                <CardContent>
                                    <CardMedia component="img"
                                    height="140"
                                    image={"/" + val.coverPhotoURL}
                                    alt="unsplash image">
                                    </CardMedia>
                                    <Typography variant="body2" color="text.secondary">
                                        {val.title}
                                    </Typography>
                                    <Typography variant="body2" component="div">
                                    Author: {val.author}
                                    </Typography>
                                    <CardActions>
                                        <Button size="small" class="button-remove" variant="contained" type="submit" onClick={(event) =>{removeBook(val.id)}}>Remove Book to List</Button>
                                    </CardActions>
                                </CardContent>
                            </Card>

                        </Box>
                    )
                  })
              }
          </div>
          </TabPanel>
        </TabContext>
       
      </div>
      </>
    )
}

export default GetBooks;