import './Header.css'

import TopBar from './TopBar'
import Navbar from './Navbar'
import ShoppingList from './ShoppingList'

import { FaShoppingBag } from 'react-icons/fa'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useGlobalContext } from '../context/productContext'

const Header = () => {
  const { setShowLogin, cartItems, setCartItems, searchProduct, cartForCheckout, setCartForCheckout } = useGlobalContext()

  const [showSearchInput, setShowSearchInput] = useState(false)
  const [showResNavbar, setShowResNavbar] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const cartBtnHandler = () => {
    setShowCart(false)
    setCartForCheckout({ ...cartForCheckout, total: totalAmount, cartItems: cartItems })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setShowSearchInput((prev) => !prev)
  }

  const numberOfItemInCart = cartItems.reduce((a, b) => a + b.qty, 0)
  const totalAmount = cartItems.reduce((a, c) => a + c.price * c.qty, 0)

  return (
    <header className="header shop">
      <TopBar setShowCart={setShowCart} setShowLogin={setShowLogin} numberOfItemInCart={numberOfItemInCart} />
      <div className="middle-inner">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-2 col-md-2">
              <div className="middle-inner-res">
                <Link to={'/'}>
                  <div className="logo">
                    <h2>
                      فرعی <span>شاپ</span>
                    </h2>
                  </div>
                </Link>
                <div className="middle-inner-res-left">
                  <form onSubmit={submitHandler} className={`search-bar-res ${showSearchInput ? 'active' : ''}`}>
                    <input type="text" placeholder="جستجو کنید..." onChange={searchProduct} />
                    <button type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
                  <button className="res-navbar-btn" onClick={() => setShowResNavbar((prev) => !prev)}>
                    <i className={`${showResNavbar ? 'fa fa-times' : 'fa fa-bars'}`} />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8 col-md-7">
              <div className="search-bar">
                <form>
                  <input type="text" placeholder="کالای مورد نظر خود را جستجو کنید..." onChange={searchProduct} />
                  <button disabled={true}>
                    <i className="fa fa-search" />
                  </button>
                </form>
              </div>
            </div>
            <div className="col-12 col-lg-2 col-md-3">
              <div className="bag-shopping" onClick={() => setShowCart(true)}>
                <p>سبد خرید</p>
                <i>
                  <FaShoppingBag />
                </i>
                <span className="total-count">{numberOfItemInCart}</span>
              </div>
              {showCart && (
                <ShoppingList
                  setShowCart={setShowCart}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  numberOfItemInCart={numberOfItemInCart}
                  onCartBtn={cartBtnHandler}
                  totalAmount={totalAmount}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Navbar showResNavbar={showResNavbar} />
    </header>
  )
}

export default Header
