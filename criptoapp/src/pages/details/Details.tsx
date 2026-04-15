import { useLocation } from "react-router-dom";
import styles from './Details.module.css'

function Details() {
  const location = useLocation();
  const {name, symbol, marketCapUsd, priceUsd, volumeUsd24Hr, changePercent24Hr} = location.state || {};

  return (
    <div className={styles.mainCripto}>
        <h1 style={{margin: '-10px 10px 10px 10px'}}>{name}</h1>
        <h2 style={{marginBottom:'20px'}}>{symbol}</h2>
        <div className={styles.criptoData}>
          <img src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`} alt="" />
          <h3>{name} | {symbol}</h3>
          <p>Preço: {priceUsd}</p>
          <p>Mercado: {marketCapUsd}</p>
          <p>Volume: {volumeUsd24Hr}</p>
          <p>Mudança 24h: <span className={Number(changePercent24Hr) < 0 ? styles.changeBelow : styles.changeHigh}>{changePercent24Hr}</span></p>
        </div>
    </div>
  )
}
1
export default Details;
