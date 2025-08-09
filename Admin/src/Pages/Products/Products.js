import { useEffect, useState } from "react";
import "./Products.css"
import {UilSearch, UilEdit} from "@iconscout/react-unicons"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      
    const [search, setSearch] = useState("");
    const [prevSearch, setPrevSearch] = useState('');


    useEffect(() => {
          if(search==="" || search.length < prevSearch.length)
            setProducts(products);
          else        
          {   
              const filteredProducts = products.products?.filter((product) => {
              const searchLower = search.toLowerCase();
              
              return (
                product._id.toString().toLowerCase().includes(searchLower) ||
                product.fournisseur.toLowerCase().includes(searchLower) ||
                product.purchase.toString().toLowerCase().includes(searchLower)
                // product.tailles.toString().toLowerCase().includes(searchLower) ||
                // product.colorsAndSizes.map((elt)=>elt.toString().toLowerCase()).includes(searchLower)
              );
            });
            setProducts(filteredProducts);
          }
          setPrevSearch(search);
        }, [search]);

        const handleDeleteProduct = async (id) => {
          try {
            await axios.delete(`http://localhost:4000/api/products/${id}`,
            {
              headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzY4NjhlZmFkZjBlYTg5MjMwMzY0NyIsImVtYWlsIjoic2FsaWhAZXhhbXBsZS5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3NTI2NjM1MDUsImV4cCI6MTc1MjkyMjcwNX0.YuyGeQXk7Ghfx-MsWHSDlJccIffSJ3PXwepbhaXpw_w",
                // Ne pas inclure "Content-Type"
              },
            }
            );
            const res = await axios.get("http://localhost:4000/api/products");
            setProducts(res.data);
          } catch (err) {
            console.error("Erreur suppression du produit :", err);
            setLoading(false);
          }
        }

  return (
    <div className='Products'>
        <h1>Produits Vierges</h1>
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
              <TableCell align="left">Produit</TableCell>
              <TableCell align="left">REF</TableCell>
              <TableCell align="left">Fournisseur</TableCell>
              <TableCell align="left">Couleurs et tailles</TableCell>
              <TableCell align="left">Prix d'achat</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {
            products.products?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={{position: "relative"}} align="left">
                  <div style={{display: "flex"}}>
                    <div className="image-container">             
                    <div className="product-image-color" style={{ backgroundColor: Object.keys(row.colorsAndSizes)[0]}}></div>  
                    <img src={row.imgs[0].mask}
                    alt="mask"
                    className="product-mask"
                    />
                    <img src={row.imgs[0].img} className="product-image" alt="produit"/>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="left">{row._id}</TableCell>
                <TableCell align="left">{row.fournisseur}</TableCell>
          <TableCell align="left">
            {Object.entries(row.colorsAndSizes).map(([color, sizes]) => (
              <div key={color} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <div
                  style={{
                    borderRadius: "100%",
                    backgroundColor: color,
                    border: "0.5px solid black",
                    width: "15px",
                    height: "15px",
                    marginRight: "8px",
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



                <TableCell align="left">€{row.purchase}</TableCell>
                <TableCell  align="left" className="Details">
                  <Link style={{textDecoration: "none", color: "#00B9F5"}} to={`/add-design/${row._id}`}>Nv modèle</Link>
                </TableCell>
                <TableCell  align="left" className="Details">
                  <UilEdit onClick={()=>navigate(`${row._id}`)}/>
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

export default Products
