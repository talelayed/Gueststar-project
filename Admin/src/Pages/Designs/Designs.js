import { useEffect, useState } from "react";
import "./Designs.css"
import {UilSearch} from "@iconscout/react-unicons"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Link } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const Designs = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/designs");
        setDesigns(res.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des produits :", err);
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);
      
    const [search, setSearch] = useState("");
    const [prevSearch, setPrevSearch] = useState('');


    useEffect(() => {
          if(search==="" || search.length < prevSearch.length)
            setDesigns(designs);
          else        
          {   
              const filteredDesigns = designs.designs?.filter((design) => {
              const searchLower = search.toLowerCase();
              
              return (
                design._id.toString().toLowerCase().includes(searchLower) ||
                design.fournisseur.toLowerCase().includes(searchLower) ||
                design.purchase.toString().toLowerCase().includes(searchLower)
                // design.tailles.toString().toLowerCase().includes(searchLower) ||
                // design.colorsAndSizes.map((elt)=>elt.toString().toLowerCase()).includes(searchLower)
              );
            });
            setDesigns(filteredDesigns);
          }
          setPrevSearch(search);
        }, [search]);


const [products, setProducts] = useState([])

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/products");
      
      setProducts(res.data);
      
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors du chargement des produits :", err);
      setLoading(false);
    }
  };

  fetchProducts();  
}, []);

const {currentUser} = useSelector((state) => state.auth);

        const handleDeleteProduct = async (id) => {
          try {
            await axios.delete(`http://localhost:4000/api/designs/${id}`,
            {
              headers: {
                Authorization: currentUser.token,
                // Ne pas inclure "Content-Type"
              },
            }
            );
            const res = await axios.get("http://localhost:4000/api/designs");
            setDesigns(res.data);
          } catch (err) {
            console.error("Erreur suppression du design :", err);
            setLoading(false);
          }
        }

  return (
    <div className='Products'>
        <h1>Modèles</h1>
        <div className="search-parent">
            <div className="search">
              <input className="search-text" placeholder="Search" onChange={(e) => { setSearch(e.target.value); }} />
              <UilSearch/>
            </div>
      </div>
      <div className="Table">
      <TableContainer
        component={Paper}
        style={{
          boxShadow: "0px 13px 20px 0px #80808029",
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Modèle</TableCell>
              <TableCell align="left">Produit</TableCell>
              <TableCell align="left">Titre</TableCell>
              <TableCell align="left">Couleurs et tailles</TableCell>
              <TableCell align="left">Prix</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {
            designs.designs?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  <div style={{display: "flex"}}>
                    <div className="image-container">             
                    <div className="product-image-color" style={{ backgroundColor:  products.products?Object.keys((products.products?.find(elt => elt._id === row.linkedProduct))?.colorsAndSizes)[0] : "white"}}></div>
                    <img src={row.imgs[0].front}
                    alt="design"
                    className="product-design"
                    />   
                    <img src={products.products?.find(elt => elt._id === row.linkedProduct).imgs[0].mask}
                    alt="mask"
                    className="product-mask"
                    />
                    <img src={products.products?.find(elt => elt._id === row.linkedProduct).imgs[0].img} className="product-image" alt="produit"/>
                    </div>
                    <div className="image-container">             
                    <div className="product-image-color" style={{ backgroundColor:  products.products?Object.keys((products.products?.find(elt => elt._id === row.linkedProduct))?.colorsAndSizes)[0] : "white"}}></div>  
                    <img src={row.imgs[0].back}
                    alt="design"
                    className="product-design"
                    />   
                    <img src={products.products?.find(elt => elt._id === row.linkedProduct).imgs[1].mask}
                    alt="mask"
                    className="product-mask"
                    />
                    <img src={products.products?.find(elt => elt._id === row.linkedProduct).imgs[1].mask} className="product-image" alt="produit"/>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="left" onClick={console.log(products.products?.find(elt => elt._id === row.linkedProduct))
                }>{row.linkedProduct}</TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">
                  {products.products && Object.entries(
                    products.products?.find(elt => elt._id === row.linkedProduct)?.colorsAndSizes || {}
                  ).map(([color, sizes]) => (
                    <div
                      key={color}
                      style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}
                    >
                      <div
                        style={{
                          borderRadius: "100%",
                          backgroundColor: color,
                          width: "15px",
                          height: "15px",
                          marginRight: "8px"
                        }}
                      ></div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                        {Object.entries(sizes).map(([taille, quantity]) => (
                          <div
                            key={color + taille}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              fontSize: "13px"
                            }}
                          >
                            <div
                              style={{
                                width: "25px",
                                height: "20px",
                                border: "1px solid black",
                                textAlign: "center",
                                lineHeight: "20px"
                              }}
                            >
                              {taille}
                            </div>
                            <span>: {quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </TableCell>



                <TableCell align="left">€{row.price}</TableCell>
                <TableCell  align="left" className="Details">
                  <Link style={{textDecoration: "none", color: "#00B9F5"}} to="/add-design/row._id">Détails</Link>
                </TableCell>
                <TableCell  align="left" className="Details">
                  <img onClick={()=>handleDeleteProduct(row._id)} style={{height:"20px",cursor:"pointer", margin: "auto"}} src="/corbeille.png" alt="supprimer"/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </div>
  )
}

