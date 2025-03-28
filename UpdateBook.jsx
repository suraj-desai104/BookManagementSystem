import React, { useState,useEffect } from "react";


import axios from "axios";

const UpdateBook=({bookId,onClose,onUpdate})=>{
      const[book,setBook]=useState(null);
      const[loading,setLoading]=useState(true);
      const[error,setError]=useState(null);

      useEffect(()=>{
        const featchBook=async()=>{
            setLoading(true);
            try{
               
                const response=await axios.get(`/api/books/${bookId}`);
                setBook(response.data);
            }
            catch(error)
            {
                setError("Error Featching book Data");
            }
            finally{
                setLoading(false);
            }
          };
          if(bookId)
          {
            featchBook();
          }
      },[bookId]);

      const handleChange=(e)=>{
        const {name,value}=e.target;
        setBook((prev)=>({...prev,[name]:value}))
      };

      const handelSubmit=async (e)=>{
        e.preventDefault();
        try{
            await axios.put(`/api/books/update/${bookId}`,book);
            onUpdate();
            onClose();
        }
        catch(error)
        {
            console.error("Error Updating book Details",error);
            alert("failed to update book");
        }
      };
      if(loading)return <div className='text-center mt-5'>Loading......</div>
      if(error) return <div className='alert alert-denger text-center'>{error}</div>

      return(
        <div className="modal fade show" style={{display:'block',background:'rgba(0,0,0,0.5)',width:"100%", justifyItems:"center"}}tabIndex="-1" role="dailog">
            <div className="modal-dailog" style={{width:"40%",marginTop:"5%"}} role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Book</h5>
                        <button type='button' className="close" onClick={onClose} aria-label="Close">
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handelSubmit}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>title</label>
                                <input type="text" className="form-control" name="title" value={book.title}onChange={handleChange}required></input>
                            </div>
                            <div className="form-group">
                                <label>author</label>
                                <input type="text" className="form-control" name="author" value={book.author}onChange={handleChange}required></input>
                            </div>
                            <div className="form-group">
                                <label>published_year</label>
                                <input type="number" className="form-control" name="published_year" value={book.published_year}onChange={handleChange}required></input>
                            </div>
                            <div className="form-group">
                                <label>publisher</label>
                                <input type="text" className="form-control" name="publisher" value={book.publisher}onChange={handleChange}required></input>
                            </div>
                            <div className="form-group">
                                <label>overview</label>
                                <input type="text" className="form-control" name="overview" value={book.overview}onChange={handleChange}required></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        
      )
}
export default UpdateBook;