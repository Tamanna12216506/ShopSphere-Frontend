
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem } from '../../store/cartSlice'
import { selectIsLoggedIn } from '../../store/authSlice'
import toast from 'react-hot-toast'
import { useEffect, useState, useMemo } from 'react'
import { getHome } from '../../api/catalog'
import { getProducts } from '../../api/catalog'
import Spinner from '../../components/ui/Spinner'
import ProductCard from '../../components/ui/ProductCard'

export default function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const [data, setData] = useState(null)
  const [arrivalProducts, setArrivalProducts] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [addingId, setAddingId] = useState(null)

  useEffect(() => {
    Promise.all([
      getHome(),
      getProducts({ page: 0, size: 8, sortBy: 'createdAt', sortDir: 'desc' }),
    ])
      .then(([homeRes, productsRes]) => {
        setData(homeRes.data.data)

        const productsPayload = productsRes.data.data
        const newestProducts = Array.isArray(productsPayload?.content)
          ? productsPayload.content
          : Array.isArray(productsPayload)
            ? productsPayload
            : []
        setArrivalProducts(newestProducts)
      })
      .catch(() => {
        toast.error('Failed to load home data')
      })
      .finally(() => setPageLoading(false))
  }, [])

  const categories = data?.categories || []
  const featuredProducts = data?.featuredProducts || []

  //  New Arrivals based on createdAt
  const newArrivals = useMemo(() => {
    return [...arrivalProducts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4)
  }, [arrivalProducts])

  const handleAddToCart = (productId) => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    setAddingId(productId)

    dispatch(addCartItem({ productId, quantity: 1 }))
      .unwrap()
      .then(() => toast.success('Added to cart'))
      .catch(() => toast.error('Failed to add'))
      .finally(() => setAddingId(null))
  }

  if (pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="space-y-16 px-6 lg:px-12">

      {/* HERO */}

      
<section className="rounded-[2rem] bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 p-10 text-white shadow-[0_24px_80px_rgba(15,10,30,0.4)] overflow-hidden relative">

  {/* background glow */}
  <div className="absolute -top-20 -right-20 w-72 h-72 bg-pastel-violet/30 rounded-full blur-3xl animate-pulse" />
  <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-pastel-pink/20 rounded-full blur-3xl animate-pulse" />

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="relative z-10 grid lg:grid-cols-2 gap-10 items-center"
  >

    {/* LEFT SIDE */}
    <div>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-pastel-mint animate-pulse" />
        <p className="text-xs text-pastel-mint font-semibold tracking-wider uppercase">
          Welcome to ShopSphere
        </p>
      </div>

      <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mt-2">
        Discover Everything
        <br />
        <span className="text-pastel-pink">
          You Need, Right Here
        </span>
      </h1>

      <p className="mt-6 text-lg text-white/70 max-w-lg font-light leading-relaxed">
        From the latest electronics and trendy fashion to essential study materials and home appliances. Enjoy a seamless shopping experience with fast delivery and secure checkout.
      </p>

      {/* CTA */}
      <div className="mt-8 flex gap-4 items-center">
        <button
          onClick={() => navigate(isLoggedIn ? '/products' : '/login')}
          className="bg-gradient-to-r from-pastel-violet to-pastel-pink px-8 py-3.5 rounded-full font-semibold text-dark-900 flex items-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-pastel-violet/20 transition-all duration-300"
        >
          Start Shopping <ArrowRight size={18} />
        </button>

        <a
          href="#categories"
          className="px-8 py-3.5 rounded-full font-medium border border-white/20 hover:bg-white/10 transition-colors duration-300"
        >
          Explore Categories
        </a>
      </div>
      
      
    </div>

    {/* RIGHT SIDE (EMOTIONAL VISUAL) */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 4 }}
      className="flex justify-center"
    >

      <div className="relative w-[360px] h-[360px] lg:w-[460px] lg:h-[460px]">
        
        {/* 2x2 Image Grid */}
        <div className="relative z-10 grid grid-cols-2 gap-3 h-full">
          {/* Fashion */}
          <div className="relative rounded-2xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80" alt="Fashion" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            <div className="absolute inset-0 bg-dark-900/40" />
            <span className="absolute bottom-2 left-2 text-white text-xs font-semibold drop-shadow-md">Fashion</span>
          </div>

          {/* Electronics */}
          <div className="relative rounded-2xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80" alt="Electronics" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            <div className="absolute inset-0 bg-dark-900/40" />
            <span className="absolute bottom-2 left-2 text-white text-xs font-semibold drop-shadow-md">Electronics</span>
          </div>

          {/* Study */}
          <div className="relative rounded-2xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80" alt="Study" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            <div className="absolute inset-0 bg-dark-900/40" />
            <span className="absolute bottom-2 left-2 text-white text-xs font-semibold drop-shadow-md">Study</span>
          </div>

          {/* Home Appliances */}
          <div className="relative rounded-2xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80" alt="Home" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            <div className="absolute inset-0 bg-dark-900/40" />
            <span className="absolute bottom-2 left-2 text-white text-xs font-semibold drop-shadow-md">Home</span>
          </div>
        </div>

        {/* off-center glow */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pastel-violet/30 blur-3xl rounded-full pointer-events-none" />
      </div>

    </motion.div>

  </motion.div>
</section>
      {/* FEATURED PRODUCTS */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Top Picks For You</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.length ? (
            featuredProducts.map((product) => (
              <div key={product.productId} className="relative">
                <ProductCard
                  product={{
                    productId: product.productId,
                    productName: product.productName,
                    productPrice: product.productPrice ?? product.price,
                    price: product.price ?? product.productPrice,
                    imageUrl: product.imageUrl,
                    categoryName: product.categoryName,
                  }}
                  showAddButton={false}
                />
                
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="scroll-mt-24">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Shop by Category</h2>
          <Link to="/products" className="text-dark-500 font-semibold">
            View All
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.categoryId}
              to={`/products?categoryId=${cat.categoryId}`}
              className="rounded-2xl overflow-hidden relative group"
            >
              <img src={cat.imageUrl} className="h-52 w-full object-cover group-hover:scale-105 transition" />
              <div className="absolute inset-0 bg-dark-900/60" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">{cat.categoryName}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section>
        <h2 className="text-3xl font-bold mb-6">New Arrivals</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {newArrivals.length ? (
            newArrivals.map((product) => (
              <div key={product.productId} className="relative">
                
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-10">
                  NEW
                </span>

                <ProductCard
                  product={{
                    productId: product.productId,
                    productName: product.productName,
                    productPrice: product.productPrice ?? product.price,
                    price: product.price ?? product.productPrice,
                    imageUrl: product.imageUrl,
                    categoryName: product.categoryName,
                  }}
                  showAddButton={false}
                />

                
              </div>
            ))
          ) : (
            <p>No new products</p>
          )}
        </div>
      </section>

      {/* TRUST */}
     

      <section className="text-center py-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pastel-violet/10 border border-pastel-violet/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-pastel-violet" />
          <p className="text-xs text-dark-600 font-semibold tracking-wider uppercase">
            Our Promise to You
          </p>
        </div>
        
        <h2 className="text-4xl font-extrabold mb-12 text-dark-900">
          Shopping made <span className="text-pastel-violet">simple and safe.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="group p-8 rounded-[2rem] bg-white border border-pastel-violet/20 hover:border-pastel-violet/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(196,181,253,0.2)] flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pastel-violet/20 to-pastel-pink/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck size={32} className="text-dark-600" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-dark-900">Safe & Secure Checkout</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">
              Your details are encrypted and fully protected while you shop.
            </p>
          </div>

          <div className="group p-8 rounded-[2rem] bg-white border border-pastel-mint/30 hover:border-pastel-mint/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(110,231,183,0.2)] flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pastel-mint/20 to-pastel-sky/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Truck size={32} className="text-teal-700" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-dark-900">Fast & Reliable Delivery</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">
              Quick shipping with real-time tracking till your doorstep.
            </p>
          </div>

          <div className="group p-8 rounded-[2rem] bg-white border border-pastel-peach/30 hover:border-pastel-peach/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(252,217,189,0.3)] flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pastel-peach/30 to-pastel-yellow/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Sparkles size={32} className="text-orange-600" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-dark-900">Only the Best for You</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">
              Every product is checked before it reaches you.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 bg-[#352857] text-white rounded-2xl">
        <h2 className="text-3xl font-bold">Ready to explore?</h2>
        <p className="text-white/70 mt-2">Start shopping your favorite products now</p>

        <button
          onClick={() => navigate(isLoggedIn ? '/products' : '/signup')}
          className="mt-6 px-6 py-3 bg-pastel-violet rounded-full"
        >
          Get Started
        </button>
      </section>

    </div>
  )
}