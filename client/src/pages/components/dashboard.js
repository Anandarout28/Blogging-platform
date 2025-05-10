import React from 'react'
import styled from 'styled-components'
import Navbar from './navbar'
import Header from './Header'
import Footer from './footer'
export default function Dashboard() {
  return (
    <HomeWrapper>
    <Header/>
    <Navbar/>
<Footer/>
</HomeWrapper>
  )
}
const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;