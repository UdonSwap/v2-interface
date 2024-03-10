import React from 'react'
import "../../components/Footer/footer.css"
import X from "../../assets/images/x.png"
import web from "../../assets/images/web.png";
import discord from "../../assets/images/discord.png";
import logo from "../../assets/images/UdonSwapLogo.png";
import { Link } from 'react-router-dom';


function Footer() {
  return (<>
  <div className="FooterMain" >
 <div  className='f-sec1'>
 <div>
        <h2 >Resources</h2>
        <div className='sec-link'>Audit</div>
        <div className='sec-link'>Contracts</div>
        <div className='sec-link'>Documentation</div>
        <div className='sec-link'>Leaderboard</div>
        
    </div>
    <div>
        <h2>Tools</h2>
        <div className='sec-link'>Mode Bridge</div>
        <div className='sec-link'>Symbiosis</div>
        <div className='sec-link'>Defil lama</div>
        <div className='sec-link'>Leaderboard</div>

        
    </div>
    <div>
        <h2>Social</h2>
        <div className='sec-link'>Discord</div>
        <div className='sec-link'>X</div>
        <div className='sec-link'>Telegram</div>
        <div className='sec-link'>Blog</div>
       
    </div>
 </div>
    


    <div className='f-sec2'>
        <div className='socialMain'>
            <img src={X} alt='x'/>
            <img src={web} alt='web'/>
            <img src={discord} alt='discord'/>
        </div>
        <div className='socialMain2'>
           
           <Link to={"https://beatswap-eta.vercel.app/"}><img src={logo} alt='x' /></Link>
      </div>
    </div>
    </div>
  </>)
}

export default Footer
