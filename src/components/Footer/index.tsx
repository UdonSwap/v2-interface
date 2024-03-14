import React from 'react'
import '../../components/Footer/footer.css'
import X from '../../assets/images/x.png'
import web from '../../assets/images/web.png'
import discord from '../../assets/images/discord.png'
import logo from '../../assets/images/UdonSwapLogo.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className="FooterMain">
        <div className="f-sec1">
          <div>
            <h2>Resources</h2>
            <Link to={''} className="footerlink" target="_blank">
              <div className="sec-link">Audit</div>
            </Link>
            <Link to={''} className="footerlink" target="_blank">
              <div className="sec-link">Contracts</div>
            </Link>
            <Link to={''} className="footerlink" target="_blank">
              <div className="sec-link">Documentation</div>
            </Link>
            <Link to={''} className="footerlink" target="_blank">
              <div className="sec-link">Leaderboard</div>
            </Link>
          </div>
          <div>
            <h2>Tools</h2>
            <Link to='https://app.mode.network/' className="footerlink" target="_blank">
              <div className="sec-link">Mode Bridge</div>
            </Link>
            <Link to='https://symbiosis.finance/swap-and-bridge-mode' className="footerlink" target="_blank">
              <div className="sec-link">Symbiosis</div>
            </Link>
            <Link to='https://defillama.com/chain/Mode' className="footerlink" target="_blank">
              <div className="sec-link">Defillama</div>
            </Link>
            <Link to='https://faucet.modedomains.xyz/' className="footerlink" target="_blank">
              <div className="sec-link">Faucet</div>
            </Link>
          </div>
          <div>
            <h2>Social</h2>
            <Link to='https://discord.gg/K9wMF5vWfN' className="footerlink" target="_blank">
              <div className="sec-link">Discord</div>
            </Link>
            <Link to='https://mirror.xyz/0xC99C6ec8f5096B1E8D984aF857F9267A4041864F' className="footerlink" target="_blank">
              <div className="sec-link">X</div>
            </Link>
            <Link to='https://t.me/udonswap' className="footerlink" target="_blank">
              <div className="sec-link">Telegram</div>
            </Link>
            <Link to='https://twitter.com/Udonswap1' className="footerlink" target="_blank">
              <div className="sec-link">Twitter</div>
            </Link>
          </div>
        </div>

        <div className="f-sec2">
          <div className="socialMain">
            <img src={X} alt="x" className="fImg1" />
            <img src={web} alt="web" className="fImg1" />
            <img src={discord} alt="discord" className="fImg1" />
          </div>
          <div className="socialMain2">
            <a href="https://beatswap-eta.vercel.app/">
              <img src={logo} alt="x" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
