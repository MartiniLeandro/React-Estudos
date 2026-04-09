import { BsSearch } from 'react-icons/bs';
import styles from './Home.module.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Home() {
  const [criptosData, setCriptosData] = useState<CriptosData[]>([])

  interface CriptosData {
    id:string,
    name:string,
    symbol:string,
    marketCapUsd: string,
    priceUsd: string,
    volumeUsd24Hr: string,
    changePercent24Hr: string
  }

  interface ResponseData{
    timestamp: number,
    data: CriptosData[];
  }

  useEffect(() => {
    getCriptosInfo()
  }, [])

  const price = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  const priceCompacted = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact"
  })

  async function getCriptosInfo(){
    const response = await fetch("https://rest.coincap.io/v3/assets?limit=10")
    const responseJson:ResponseData = await response.json()
    const responseCriptos:CriptosData[] = responseJson.data.map(cripto => {
      return {
        id: cripto.id,
        name: cripto.name,
        symbol: cripto.symbol,
        marketCapUsd: priceCompacted.format(Number(cripto.marketCapUsd)),
        priceUsd: price.format(Number(cripto.priceUsd)),
        volumeUsd24Hr: priceCompacted.format(Number(cripto.volumeUsd24Hr)),
        changePercent24Hr: Number(cripto.changePercent24Hr).toFixed(2)
      }
    })
    setCriptosData(responseCriptos)
    console.log(responseCriptos)
  }

  return (
    <main className={styles.container}>
        <form action="" className={styles.form} onSubmit={e => e.preventDefault()}>
          <input type="text" className={styles.formInput} placeholder='Digite o nome da moeda... Ex: bitcoin'/>
          <button type="submit" className={styles.formButton}>
            <BsSearch size={30} color='#fff'/>
          </button>
        </form>
        <table className={styles.tableCripto}>
              <thead>
                <tr>
                  <th scope='col' style={{textAlign: 'center'}}>Moeda</th>
                  <th scope='col'>Valor mercado</th>
                  <th scope='col'>Preço</th>
                  <th scope='col'>Volume</th>
                  <th scope='col'>Mudança 24h</th>
                </tr>
              </thead>
              <tbody>
                {criptosData.map((cripto) => (
                  <tr className={styles.infoCripto}>
                    <td>
                      <div className={styles.moedaInfo}>
                        <Link to={`details/${cripto.name}`} className={styles.linkCripto}>
                        <img src={`https://assets.coincap.io/assets/icons/${cripto.symbol.toLowerCase()}@2x.png`} alt="" />
                        <p style={{fontWeight: 'bolder'}}>{cripto.name} | {cripto.symbol}</p>
                        </Link>
                      </div>
                      </td>
                    <td>{cripto.marketCapUsd}</td>
                    <td>{cripto.priceUsd}</td>
                    <td>{cripto.volumeUsd24Hr}</td>
                    <td className={Number(cripto.changePercent24Hr) < 0 ? styles.changeBelow : styles.changeHigh} style={{fontWeight: 'bolder'}}>{cripto.changePercent24Hr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
    </main>
  )
}

export default Home;
