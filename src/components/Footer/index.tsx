import React from 'react'
import '../../components/Footer/footer.css'
import X from '../../assets/images/x.png'
import web from '../../assets/images/web.png'
import discord from '../../assets/images/discord.png'
import logo from '../../assets/images/UdonSwapLogo.png'

function Footer() {
  return (
    <>
      <div className="FooterMain">
        <div className="f-sec1">
          <div>
            <h2>Resources</h2>

            <div className="sec-link ">Audit</div>

            <div className="sec-link ">Contracts</div>
            <a href="https://docs.udonswap.org/" className="footerlink" target="_blank">
              <div className="sec-link ">Documentation</div>
            </a>
            <div className="sec-link ">Leaderboard</div>
          </div>
          <div>
            <h2>Tools</h2>
            <a href="https://app.mode.network/" className="footerlink" target="_blank">
              <div className="sec-link ">Mode Bridge</div>
            </a>
            <a href="https://symbiosis.finance/swap-and-bridge-mode" className="footerlink" target="_blank">
              <div className="sec-link ">Symbiosis</div>
            </a>
            <a href="https://defillama.com/chain/Mode" className="footerlink" target="_blank">
              <div className="sec-link ">Defillama</div>
            </a>
            <a href="https://faucet.modedomains.xyz/" className="footerlink" target="_blank">
              <div className="sec-link ">Faucet</div>
            </a>
          </div>
          <div>
            <h2>Social</h2>
            <a href="https://discord.gg/K9wMF5vWfN" className="footerlink" target="_blank">
              <div className="sec-link ">Discord</div>
            </a>
            <a
              href="https://mirror.xyz/0xC99C6ec8f5096B1E8D984aF857F9267A4041864F"
              className="footerlink"
              target="_blank"
            >
              <div className="sec-link ">X</div>
            </a>
            <a href="https://t.me/udonswap" className="footerlink" target="_blank">
              <div className="sec-link ">Telegram</div>
            </a>
            <a href="https://twitter.com/Udonswap1" className="footerlink" target="_blank">
              <div className="sec-link ">Twitter</div>
            </a>
          </div>
        </div>

        <div className="f-sec2">
          <div className="socialMain">
            <a href="https://mirror.xyz/0xC99C6ec8f5096B1E8D984aF857F9267A4041864F">
              <img src={X} alt="x" className="fImg1" />
            </a>
            <a>
              <img src={web} alt="web" className="fImg1" />
            </a>
            <a href="https://discord.gg/K9wMF5vWfN">
              <img src={discord} alt="discord" className="fImg1" style={{ padding: '3' }} />
            </a>
          </div>
          <div className="socialMain2">
            <a href="https://udonswap.org/">
              <img src={logo} alt="x" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
