import React from "react";
import table from "./allpool.module.css";
// import iconstar from "../../assets/images/iconstar.png";
import maleuser from "../../assets/images/maleuser.png";
import maleuser2 from "../../assets/images/maleuser2.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className={table.mainbody}>
      <div className={table.mainTvl}>
      <div className={table.allpools}>
        <h3 className={table.headpools}>POOLS</h3>
        <p className={table.parapools}>Create positions into pools to earn swap fees</p>
      </div>
      <div className={table.allTVL}>
        <div className={table.tvlText}>Total TVL</div>
        <div className={table.tvlData}>$7,403,262.61</div>
      </div>
      <div className={table.PoolBtn}>
        <Link to={"/add/ETH"}>
        <button className={table.poolBtn}> Create Pool</button></Link>
      </div>
      </div>
     
      <div className={table.pooldata}>
        <div className={table.head}>
          <table className={table.headtable}>
            <thead>
              <tr className={table.row}>
                <th className={table.column}>Name</th>
                <th className={table.column}>TVL</th>
                <th className={table.column}>Fees</th>
                {/* <th className={table.column}>C4</th>
                <th className={table.column}>C5</th> */}
              </tr>
            </thead>
          </table>
        </div>
        <div className={table.content}>
          <table className={table.contenttable}>
            <tbody>
              <tr className={table.row}>
                <td className={table.column1}>
                    <div className={table.currencyimg}>
                      <div className={table.img1}>
                        <img
                          src={maleuser}
                          alt="maleuser"
                          className={table.maleuser1}
                        />
                      </div>
                      <div className={table.img2}>
                        <img
                          src={maleuser2}
                          alt="maleuser2"
                          className={table.maleuser2}
                        />
                      </div>
                    </div>
                    <div className={table.currency}> 
                    <div>ezETH -</div>
                  <div>ETH</div></div>
                   
                </td>
                <td className={table.column}>$517241.13</td>
                <td className={table.column3}>
                  <div className={table.tableFlex}>
                  <div style={{width:"max-content"}}>17.57% &gt;</div>
                  <div style={{color:"red"}}>8.21%</div>
                  </div>
                  
                </td>
              </tr>
        <tr className={table.row}>
          <td className={table.column}>AUSENCO</td>
          <td className={table.column}>AAD</td>
          <td className={table.column}>$2.38</td>
        </tr>
        <tr className={table.row}>
          <td className={table.column}>ADELAIDE</td>
          <td className={table.column}>AAX</td>
          <td className={table.column}>$3.22</td>
        </tr>
        <tr className={table.row}>
          <td className={table.column}>XXD</td>
          <td className={table.column}>ADITYA BIRLA</td>
          <td className={table.column}>$1.02</td>
        </tr>
        <tr className={table.row}>
          <td className={table.column}>AAC</td>
          <td className={table.column}>AUSTRALIAN COMPANY </td>
          <td className={table.column}>$1.38</td>
        </tr>
        <tr className={table.row}>
          <td className={table.column}>AAD</td>
          <td className={table.column}>AUSENCO</td>
          <td className={table.column}>$2.38</td>
        </tr>
        <tr className={table.row}>
          <td className={table.column}>AAX</td>
          <td className={table.column}>ADELAIDE</td>
          <td className={table.column}>$3.22</td>
        </tr>
        <tr className={table.row}>
          <td className={table.column}>XXD</td>
          <td className={table.column}>ADITYA BIRLA</td>
          <td className={table.column}>$1.02</td>
        </tr>
        <tr className={table.row}>
          <td className={table.column}>AAC</td>
          <td className={table.column}>AUSTRALIAN COMPANY </td>
          <td className={table.column}>$1.38</td>
        </tr>
        <tr className={table.row}>
          <td className={table.column}>AAD</td>
          <td className={table.column}>AUSENCO</td>
          <td className={table.column}>$2.38</td>
        </tr>
        <tr className={table.row}>
          <td className={table.column}>AAX</td>
          <td className={table.column}>ADELAIDE</td>
          <td className={table.column}>$3.22</td>
        </tr>
        <tr className={table.row}>
          <td className={table.column}>XXD</td>
          <td className={table.column}>ADITYA BIRLA</td>
          <td className={table.column}>$1.02</td>
        </tr>
        <tr className={table.row}>
          <td className={table.column}>AAC</td>
          <td className={table.column}>AUSTRALIAN COMPANY </td>
          <td className={table.column}>$1.38</td>
        </tr>
        <tr className={table.row}>
          <td className={table.column}>AAD</td>
          <td className={table.column}>AUSENCO</td>
          <td className={table.column}>$2.38</td>
        </tr>
      </tbody>
          </table>
  </div>
 </div>
 </div>
   
  );
}
