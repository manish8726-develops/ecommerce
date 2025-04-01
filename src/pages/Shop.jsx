import { useState,useEffect } from "react"
import { Link } from "react-router-dom"



export default function Shop() {
  let [dataProducts,setDataProducts] = useState([])
  let [loading,setLoading] = useState(true)
  let [error,setError] = useState(null)
  let [filter,setFilter] = useState('tv')
  const [sort,setSort] = useState('featured')
let [originalData, setOriginalData] = useState([])
  try{
    useEffect(() => {
   setLoading(true)
      fetch(`https://fakestoreapi.in/api/products/category?type=${filter}`)
      .then((response) => response.json())
      .then((data) => {setDataProducts(data.products)
    setOriginalData(data.products)
    setLoading(false)
    })
      .catch((error) => setError(error.message));
      console.log(dataProducts);
      
     
    }, [filter])
   
    useEffect(() => {
   
       
        if (sort==='featured') {
          setDataProducts(originalData)
          
        }
        else if(sort==='best-selling'){
            const sortedData = originalData.filter(product=>product.popular===true)
            setDataProducts(sortedData)
        }
        else if(sort==='price-asc'){
        const sortedData =[ ...originalData].sort((a,b)=>a.price-b.price)
        setDataProducts(sortedData)
        
        }
        else if(sort==='price-desc'){
        const sortedData = [...originalData].sort((a,b)=>b.price-a.price)
        setDataProducts(sortedData)
        
        }
       
    }, [filter,sort])
    if(loading){
      return <p className="text-center text-2xl">Loading...</p>
     }
  }
  catch(error){
    return <p className="text-center text-2xl">{error}</p>}
    console.log(filter);
  return (
   <>

   <div className="flex justify-between items-center p-5 pb-0">

   <label htmlFor="filter" className="flex items-center gap-4">
    Filter by :
   <select onChange={(e) => setFilter(e.target.value)} className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5" name="filter" id="filter">
      <option value="tv">Tv</option>
      <option value="audio">Audio</option>
      <option value="laptop">Laptop</option>
      <option value="mobile">Mobile</option>
      <option value="gaming">Gaming</option>
      <option value="appliances">Appliances</option>
    </select>
   </label>
    <label className="flex items-center gap-4" htmlFor="sort">
    Sort by :
    <select onChange={(e) => setSort(e.target.value) } className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5" name="sort" id="sort">
      <option value="featured">Featured</option>
      <option value="best-selling">Best Selling</option>
      <option value="price-asc">Price, low to high</option>
      <option value="price-desc">Price, high to low</option>
    </select>
    </label>
   </div>
   <hr className="mt-2"/>
    <div className="bg-white ">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 pt-0">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {dataProducts.map((product) => (
            <a className="group">
              <Link key={product.id} to={`/product/${product.id}/${product.category}`} >
              <div className="flex justify-center">
              <img
                alt={product.imageAlt}
                src={product.image}
                className="aspect-square  w-[80%] rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
              />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">₹{product.price}</p>

            </Link>
              <button className="bg-black w-full font-700 p-2 mt-3 text-white cursor-pointer rounded-2xl">Add to cart</button>
              </a>
          ))}
        </div>
      </div>
    </div>
   </>
  )
}
